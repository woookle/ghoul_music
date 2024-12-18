import actorsModule from "../models/actorsModule.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addActor = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const actorDoc = new actorsModule({
      nickname,
      email,
      password: hashedPassword,
    });

    await actorDoc.save();

    const token = jwt.sign(
      {
        _id: actorDoc._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'Lax',
      maxAge: 2592000000,
    });

    res
      .status(200)
      .json({ message: "Артист успешно создан!", actor: actorDoc });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const loginActor = async (req, res) => {
  try {
    const user = await actorsModule.findOne({ email: req.body.email });

    if (!user) {
      return res.status(500).json({ message: "Неправильный логин или пароль" });
    }
    if (
      bcrypt.compare(user.password, req.body.password) ||
      user.password == req.body.password
    ) {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax',
        maxAge: 2592000000,
      });

      return res.status(200).json({ user });
    } else {
      return res.status(500).json({ message: "Неправильный логин или пароль" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    user.favoritesMusics.push(req.body.musicId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Трек успешно добавлен в избранные!" });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    user.favoritesMusics = user.favoritesMusics.filter(
      (id) => id.toString() != req.body.musicId
    );

    await user.save();

    return res
      .status(200)
      .json({ message: "Трек успешно удален из избранных!" });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const allActors = async (req, res) => {
  try {
    const allactors = await actorsModule.find();

    return res.status(200).json(allactors);
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const changeAvatar = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    const new_avatar = req.files["image"][0].filename;
    const imageUrl = "/uploads/images/" + new_avatar;

    user.avatar = imageUrl;

    await user.save();

    return res
      .status(200)
      .json({ message: "Аватарка успешно изменена!", newpath: imageUrl });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const changeNickname = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    user.nickname = req.body.newnickname;

    await user.save();

    return res.status(200).json({ message: "Ник успешно изменен" });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    user.password = req.body.newpassword;

    await user.save();

    return res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const logoutActor = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Вы успешно вышли с аккаунта!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkAccount = async (req, res) => {
  try {
    
    const user = req.user;
    return res.status(200).json({ user })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

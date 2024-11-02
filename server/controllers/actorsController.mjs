import actorsModule from "../models/actorsModule.mjs";

export const addActor = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    const actorDoc = new actorsModule({
      nickname,
      email,
      password,
    });

    await actorDoc.save();

    res
      .status(200)
      .json({ message: "Артист успешно создан!", actor: actorDoc });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const loginActor = async (req, res) => {
  try {
    const user = await actorsModule.findOne({ email: req.body.email });

    if (!user) {
      return res.status(500).json({ message: "Неправильный логин или пароль" });
    }

    if (user.password == req.body.password) {
      return res.status(200).json(user);
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

    return res.status(200).json({message: "Аватарка успешно изменена!", newpath: imageUrl})

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

    return res.status(200).json({message: "Ник успешно изменен"})
  } catch (error) {
    return res.status(404).json({message: "Ошибка!"})
  }
}

export const changePassword = async (req, res) => {
  try {
    const user = await actorsModule.findById(req.body.userId);

    if (!user) {
      return res.status(500).json({ message: "Музыкант не найден" });
    }

    user.password = req.body.newpassword;

    await user.save();

    return res.status(200).json({message: "Пароль успешно изменен"})
  } catch (error) {
    return res.status(404).json({message: "Ошибка!"})
  }
}

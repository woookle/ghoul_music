import musicsModule from "../models/musicsModule.mjs";
import { parseFile } from "music-metadata";

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadMusic = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const image = req.files["image"][0].filename;
    const audio = req.files["audio"][0].filename;

    const metadata = await parseFile(req.files["audio"][0].path);
    const duration = metadata.format.duration;
    const formatDuration = `${Math.floor(duration / 60)}:${
      Math.floor(duration % 60) < 10 ? "0" : ""
    }${Math.floor(duration % 60)}`;

    if (!image || !audio) {
      return res
        .status(400)
        .json({ message: "Должны быть загружены и картинка, и аудио" });
    }

    const imageUrl = "/uploads/images/" + image;
    const audioUrl = "/uploads/audios/" + audio;

    const mediaDoc = new musicsModule({
      name: name,
      userId: userId,
      imageUrl: imageUrl,
      audioUrl: audioUrl,
      duration: formatDuration,
    });

    await mediaDoc.save();

    res
      .status(200)
      .json({ message: "Трек успешно добавлен!", media: mediaDoc });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ошибка при загрузке файлов", error: error.message });
  }
};

export const getMusics = async (req, res) => {
  try {
    const posts = await musicsModule.find().populate("userId");
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const getMusicsByActor = async (req, res) => {
  try {
    const musics = await musicsModule.find({ userId: req.params.userId });

    return res.status(200).json({ musics });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const deleteMusic = async (req, res) => {
  try {
    const musics = await musicsModule.find();

    musics = musics.filter((el) => {
      el._id !== req.body.musicId;
    });

    await musics.save();

    return res
      .status(200)
      .json({ message: "Трек успешно удален!", musicId: req.body.musicId });
  } catch (error) {
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const downloadMusic = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await musicsModule.findById(fileId);

    if (!file) {
      return res.status(404).send("Файл не найден");
    }

    const filePath = path.join(__dirname, "..", file.audioUrl);
    const filename = path.basename(file.audioUrl);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("Файл не найден:", err);
        return res.status(404).json({message: err});
      }

      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', 'audio/mpeg');

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import musicsModule from "../models/musicsModule.mjs";
import { parseFile } from 'music-metadata';


export const uploadMusic = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const image = req.files["image"][0].filename;
    const audio = req.files["audio"][0].filename;

    const metadata = await parseFile(req.files["audio"][0].path);
    const duration = metadata.format.duration;
    const formatDuration = `${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? "0" : ""}${Math.floor(duration % 60)}`;

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
      duration: formatDuration
    });

    await mediaDoc.save();

    res
      .status(200)
      .json({ message: "Трек успешно добавлен!", media: mediaDoc });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Ошибка при загрузке файлов", error: error.message });
  }
};

export const getMusics = async (req, res) => {
  try {
    const posts = await musicsModule.find().populate('userId')
    return res.json(posts);
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: "Ошибка!" });
  }
};

export const getMusicsByActor = async (req, res) => {
  try {

    const musics = await musicsModule.find({userId: req.params.userId});

    return res.status(200).json({musics})
    
  } catch (error) {
    return res.status(404).json({message: "Ошибка!"})
  }
}

export const deleteMusic = async (req, res) => {
  try {
    const musics = await musicsModule.find();

    musics = musics.filter(el => {el._id !== req.musicId})

    await musics.save();

    return res.status(200).json({message: "Трек успешно удален!", musicId: req.musicId})
  } catch (error) {
    return res.status(404).json({message: "Ошибка!"})
  }
}
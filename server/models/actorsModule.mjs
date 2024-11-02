import mongoose from "mongoose";

const ActorSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritesMusics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Musics" }],
  avatar: {
    type: String,
    default: "/uploads/images/defaultavatar.jpg",
  },
});

const actorsModule = mongoose.model("actors", ActorSchema);

export default actorsModule;

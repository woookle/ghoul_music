import mongoose from "mongoose"

const MusicsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "actors" 
  },
  imageUrl: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String
  }
});

const musicsModule = mongoose.model("Musics", MusicsSchema);

export default musicsModule;
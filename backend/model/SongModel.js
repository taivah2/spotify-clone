import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  img: { type: String },
  duration: { type: String },
  audioURL :{type:String}
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);
export default Song;


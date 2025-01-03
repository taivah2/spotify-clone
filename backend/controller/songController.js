import Song from '../model/SongModel.js';

// Lấy tất cả bài hát
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy bài hát theo ID
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update song
export const putSong = async( req, res) =>{
   try{
    const {name , artist , img } = req.body;
    const updateSong = await Song.findByIdAndUpdate(
      req.params.id,
      {name, artist, img},
      { new: true, runValidators: true }
  ).select("-duration");
  if (!updateSong) return res.status(404).json({message: "Song not found"});
  res.status(200).json({message : "Song updates successfully", song: updateSong})
   }catch(err){
    res.status(500).json({ message: "Failed to update song", error: err.message });
  }
};

// delete 
export const deleteSong = async (req, res, next) => {
  try {
      const deletedSongs = await Song.findByIdAndDelete(req.params.id);
      if (!deletedSongs) return res.status(404).json({ message: "Song not found" });
  
      res.status(200).json({ message: "Song deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete song", error: err.message });
    }
  }

  // post 

  export const postSong= async(req,res) =>{
    try{
      const {name , artist , img, duration , audioURL} = req.body;
      const exitName = await Song.findOne({name})
      if (exitName)  throw new Error ('Name already exists!');
  
      const newSong = await Song.create({name , artist, img , duration, audioURL});
      res.status(201).send({
          message: 'Song created successfully!',
          data: newSong,
          success: true
      });
  } catch (error) {
      res.status(400).send({
          message: error.message,
          data: null,
          success: false
      });
  }
  };
  // getAllSong -duration, audio
  export const getSongs = async (req, res) => {
    try {
      const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
      const pageSize = req.query.pageSize ? req.query.pageSize : 5;

      const totalItems = await Song.countDocuments();
      const totalPages = Math.ceil(totalItems / pageSize);

      const skip = (pageNumber - 1) * pageSize;
        const songs = await Song.find().select("-audioURL").select("-duration")
        .skip(skip)
        .limit(pageSize);
        res.send({
          success: true,
          totalItems,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          items: songs
      })
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch songs", error: err.message });
      }
    };
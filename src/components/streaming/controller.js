const fs = require("fs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { ObjectID, GridFSBucket } = mongoose.mongo;
const {
  MONGODB_DRIVER,
  MONGODB_USER,
  MONGODB_PASS,
  MONGODB_CLUSTER,
  MONGODB_DBNAME,
} = process.env;
const URI = `${MONGODB_DRIVER}://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CLUSTER}/${MONGODB_DBNAME}?retryWrites=true&w=majority`;

const mongooseConnection = mongoose.createConnection(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const streamingController = {};

streamingController.uploadFileStream = async (req, res, next) => {
  try {
    const { collectionName, fileName, filePath } = req.body;
    try {
      if (fs.existsSync(filePath)) {
        let bucket = new mongoose.mongo.GridFSBucket(mongooseConnection.db, {
          bucketName: collectionName,
        });
        let uploadStream = bucket.openUploadStream(fileName);
        fs.createReadStream(filePath).pipe(uploadStream);
        uploadStream.on("error", () => {
          res.status(500).json({ message: "Error uploading file" });
        });

        uploadStream.on("finish", () => {
          res.status(201).json({
            message: "File uploaded successfully, stored under Mongo ObjectID",
            id: uploadStream.id,
          });
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading file", error });
    }
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};

streamingController.downloadFileStream = async (req, res, next) => {
  const id= req.params.id;
  const collectionName= req.params.collectionName;
  let objectID;
  try {
    objectID = new ObjectID(id);
  } catch (error) {
    res.status(400).json({ message: "Invalid img in URL parameter." });
  }
  let bucket = new GridFSBucket(mongooseConnection.db, {
    bucketName: collectionName,
  });
  let downloadStream = bucket.openDownloadStream(objectID);
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.status(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

streamingController.findFileStream = async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
  const collectionName = req.params.collectionName;

  console.log(fileName,collectionName);
  let bucket = new GridFSBucket(mongooseConnection.db, {
    bucketName: collectionName,
  });
  bucket.find({ filename: fileName }).toArray(function (err, files) {
    if (err) res.send(err);
    res.send(files);
  });
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
  
};
//   app.get("/meta", (req, res, next) => {
//     let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: "files_img",
//     });

//     bucket.find({ filename: db_filename }).toArray(function (err, files) {
//       if (err) res.send(err);
//       res.send(files);
//     });
//   });
//   app.listen(3000, () => console.log("Example app listening on port 3000!"));
// });

module.exports = streamingController;

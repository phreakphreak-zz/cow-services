const { Router } = require("@feathersjs/express");
const router = Router();
const {uploadFileStream,downloadFileStream,findFileStream} = require("./controller");

// router.get();


router.get("/find/:collectionName/:fileName",findFileStream);
router.post("/upload",uploadFileStream);

router.get("/download/:collectionName/:id",downloadFileStream);


// router.put();

// router.delete();

// router.patch();

module.exports = router;

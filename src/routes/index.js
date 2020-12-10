const { Router } = require("@feathersjs/express");
const router = Router();
const knnclassifiers = require("../components/knnclassifiers/routes");

const streaming = require("../components/streaming/routes");

router.use("/knnclassifiers", knnclassifiers);

router.use("/streaming", streaming);

router.get('/acelerometro',(req, res)=>{
  res.render('acelerometro',{title:"Acelerometro"});
});

router.get('/dispositivo',(req, res)=>{
  res.render('dispositivo',{title:"Dispositivo"});
});
router.get("/", (req, res) => {
  res.render("index", { title: "Cow Sensor App" });
});

router.get('/contact',(req, res)=>{
    res.render('contact',{title:"Contact Page"});
});

module.exports = router;

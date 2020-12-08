require('@tensorflow/tfjs-node');
const KnnClassifier = require("@tensorflow-models/knn-classifier");
const fs = require("fs");
const tf = require("@tensorflow/tfjs");

tf.setBackend('cpu');
const path = require("path");
/**
 *
 * @param {Object} classifier
 * @param {Tensor} tensor
 * @param {Number} label
 * @return {Object} classifierWithExample
 */
async function setExampleClassifier(classifier, tensor, label) {
  classifier.addExample(tensor, label);
  return classifier;
}

/**
 * @return {Object} classifier model
 */
async function createClassifier() {
  try {
    const classifier = KnnClassifier.create();
    return classifier;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 *
 * @param {Object} classifier
 * @param {Tensor} tensor
 * @return {Object} result
 */
async function predictClassifier(classifier, tensor) {
  try {
    const result = await classifier.predictClass(tensor);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * 
 * @param {Array} params 
 * @returns {Tensor} tensor
 */
async function convertTensor(params) {
  const tensor=tf.tensor2d(params,[params.length,1]);
  return tensor;
}


async function saveClassifier(classifier) {
  let dataset = await classifier.getClassifierDataset()
  const datasetObj = {}
  Object.keys(dataset).forEach((key) => {
    let data = dataset[key].dataSync();
    datasetObj[key] = Array.from(data);
  });
  let jsonStr = JSON.stringify(datasetObj)
  //can be change to other source
  fs.writeFile("./dataset.json", jsonStr, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
}); 
  //localStorage.setItem("myData", jsonStr);
}

 async function load() {
    //can be change to other source
   let dataset = localStorage.getItem("myData")
   let tensorObj = JSON.parse(dataset)
   //covert back to tensor
   Object.keys(tensorObj).forEach((key) => {
     tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1000, 1000])
   })
   this.classifier.setClassifierDataset(tensorObj);
 }

module.exports = {
  setExampleClassifier,
  predictClassifier,
  createClassifier,
  convertTensor,
  saveClassifier
};

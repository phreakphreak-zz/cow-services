const KnnClassifier = require("@tensorflow-models/knn-classifier");

const tf = require("@tensorflow/tfjs");
exports.KnnClassifier = class KnnClassifier {
  constructor() {
    this.classifier =KnnClassifier.create();
  }
  async predictClassifier(tensor) {
    try {
      const result = await classifier.predictClass(tensor);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async setExampleClassfier(tensor, label) {
    await classifier.addExample(tensor, label);
  }



  get Classifier() {
    return this.classifier;
  }
  set Classifier(value) {
    this.classifier = value;
  }
};

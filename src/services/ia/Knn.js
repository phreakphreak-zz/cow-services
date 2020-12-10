const knnClassifier = require("@tensorflow-models/knn-classifier");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");
exports.Knn = class Knn {
  constructor() {
    this.classifier = null;
  }
  get getClassifier() {
    return this.classifier;
  }
  set setClassifier(value) {
    this.classifier = value;
  }
  async createClassifier() {
    try {
      this.classifier = knnClassifier.create();
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setExampleClassifier(tensor, label) {
    this.classifier.addExample(tensor, label);
  }
  async predictClassifier(tensor) {
    try {
      const result = await this.classifier.predictClass(tensor);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async convertTensor(params) {
    try {
      const tensor = tf.tensor2d(params, [params.length, 1]);
      return tensor;
    } catch (error) {
      return null;
    }
  }

  async createFile(filePath, jsonStr) {
    try {
      fs.writeFile(filePath, jsonStr, "utf8", function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return null;
        }
        console.log("JSON file has been saved.");
        return true;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async saveClassifier(resource) {
    try {
      let jsonStr = JSON.stringify(
        Object.entries(
          this.classifier.getClassifierDataset()
        ).map(([label, data]) => [
          label,
          Array.from(data.dataSync()),
          data.shape,
        ])
      );

      // let dataset = await this.classifier.getClassifierDataset();
      // const datasetObj = {};
      // Object.keys(dataset).forEach((key) => {
      //   let data = dataset[key].dataSync();
      //   datasetObj[key] = Array.from(data);
      // });
      // let jsonStr = JSON.stringify(datasetObj);

      const dir = await this.verifyResource(resource);
      console.log(dir);
      if (!dir) {
        fs.writeFile(dir, jsonStr, function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return null;
          }
          console.log("JSON file has been saved.");
        });
      }

      fs.writeFile(dir, jsonStr, function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return null;
        }
        console.log("JSON file has been saved.");
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async verifyResource(resource) {
    try {
      const dir = path.join("./src/components/knnclassifiers", resource);
      console.log("verify Resource");
      console.log(dir);

      return dir;
      // fs.stat(dir, function (err) {
      //   if (!err) {
      //     console.log("file or directory exists");
      //     return dir;
      //   } else if (err.code === "ENOENT") {
      //     return null;
      //   }
      // });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loadClassifier(resource) {
    try {
      const dir = await this.verifyResource(resource);
      console.log("from load", dir);
      let dataset = fs.readFileSync(dir);
      if(dataset.length===0){
        // let datasetJson = JSON.parse(dataset);
        // //console.log(datasetJson);
        // this.classifier.setClassifierDataset(
        //   Object.fromEntries(
        //     datasetJson.map(([label, data, shape]) => [
        //       label,
        //       tf.tensor(data, shape),
        //     ])
        //   )
        // );
  
      }
      let datasetJson = JSON.parse(dataset);
        //console.log(datasetJson);
        this.classifier.setClassifierDataset(
          Object.fromEntries(
            datasetJson.map(([label, data, shape]) => [
              label,
              tf.tensor(data, shape),
            ])
          )
        );
      
        
      
      //console.log(typeof(dataset));
      //console.log(dataset);
      
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

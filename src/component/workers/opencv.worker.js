import { readAsBinaryString, fileContentParse, stringHashing, isNumeric, flattenedNum } from "../FileHandler/FileReader";
import * as cf from "crossfilter2";
import * as numjs from "numjs";
self.importScripts("./opencv/cv-wasm.js")
console.log(cv)
var currentData = null;
var numericArray = null;
var matrixDim = { row: 0, col: 0 };
var currentMat = null;
var currentMatData = null;
var head = null;
var cxt = null;
self.addEventListener('message', (event) => {
    if (event.data.file !== undefined) {
        const fileContents = readAsBinaryString(event.data.file).then(val => {
            return fileContentParse(val);
        }).then(val => {
            console.log(val);
            self.postMessage({ data: val });
            currentData = val.data;
            head = val.head;
            matrixDim.row = currentData.length;
            matrixDim.col = currentData.columns.length;
            cxt = cf.default(currentData);
            numericArray = currentData.map(val => Object.values(val).filter(val2 => typeof (val2) !== "string"));
            // numericArray = [].concat.apply([], numericArray);
            numericArray = numjs.array(numericArray)
            console.log(numericArray)
            const flattenedNum = numericArray.flatten();
            currentMat = new cv.Mat(matrixDim.row, matrixDim.col, cv.CV_32FC1);
            currentMatData = currentMat.data32f();
            currentMatData.set(flattenedNum);
        });
    }
    else if (event.data.type !== undefined) {
        const dimension = this.createDimension(cxt, event.data.type);
        const colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];
        const highlights = ["#1f88c5", "#aed8e9", "#ff8f3f", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

        var data = dimension.group().reduceCount()
        data = data.all()
        const pairs = Object.values(data)
        const value = pairs.map(val=>val.value);
        const keys = pairs.map(val=>val.key);
        // currentData = event.data.data;
        // matrixDim.row = event.data.data.length;
        // matrixDim.col = event.data.data.columns.length;
        // numericArray = currentData.map(val => Object.values(val).filter(val2 => typeof (val2) !== "string"));
        // numericArray = [].concat.apply([], numericArray);
        // currentMat = new cv.Mat(matrixDim.row, matrixDim.col, cv.CV_32FC1);
        // currentMatData = currentMat.data32f();
        // currentMatData.set(numericArray);
        // // self.postMessage({ CVMat: currentMat });
        // head = event.data.head;

        // console.log(currentData);
    }
    else if (event.data.crossFiltering !== undefined) {

    }
    // let lr = new cv.ml_LogisticRegression();
    // lr.setLearningRate(0.001);
    // lr.setIterations(10);
    // lr.setRegularization(cv.ml_LogisticRegression_RegKinds.REG_L2.value);
    // lr.setTrainMethod(cv.ml_LogisticRegression_Methods.BATCH.value);
    // lr.setMiniBatchSize(1);

    // let labelsMat = new cv.Mat(4, 1, cv.CV_32FC1)
    // let labelsData = labelsMat.data32f()
    // labelsData.set([1, -1, -1, -1])
    // let trainingDataMat = new cv.Mat(4, 2, cv.CV_32FC1)
    // let	trainingData = trainingDataMat.data32f()
    // trainingData.set([501, 255, 501, 10, 10, 10, 255, 501])
    // let none = new cv.Mat();
    // 	let trainData = new cv.ml_TrainData(trainingDataMat,
    // 		                                cv.ml_SampleTypes.ROW_SAMPLE.value,
    //                                         labelsMat, none, none, none, none);
    // let trainStatus = lr.train(trainData, 0);
})

function createDimension(cxt, type) {
    return cxt.dimension(function (fact) { return fact[type]; })
}

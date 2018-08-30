import * as cf from "crossfilter2";
self.importScripts("./opencv/cv-wasm.js")
console.log(cv)
var currentData = null;
var numericArray = null;
var matrixDim = {row:0,col:0};
var currentMat = null;
var currentMatData = null;
var head = null;
self.addEventListener('message', (event) => {
    if (event.data.data !== undefined) {
        currentData = event.data.data;
        matrixDim.row = event.data.data.length;
        matrixDim.col = event.data.data.columns.length;
        numericArray = currentData.map(val=>Object.values(val).filter(val2=> typeof (val2) !== "string"));
        numericArray =[].concat.apply([], numericArray);
        currentMat =  new cv.Mat(matrixDim.row, matrixDim.col, cv.CV_32FC1);
        currentMatData = currentMat.data32f();
        currentMatData.set(numericArray);
        // self.postMessage({ CVMat: currentMat });
        head = event.data.head;
        
        console.log(currentData);
    }
    else if(event.data.crossFiltering !== undefined){
        
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

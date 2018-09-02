import { readAsBinaryString, fileContentParse, stringHashing, isNumeric, flattenedNum, labelEncoding } from "../FileHandler/FileReader";
import * as cf from "crossfilter2";

self.importScripts("./opencv/cv-wasm.js")
console.log(cv)
self.postMessage({cvReady:null});
var numericArray = null;
var cxt = null;
var scheme = null;
self.addEventListener('message', (event) => {
    if (event.data.file !== undefined) {
        const fileContents = readAsBinaryString(event.data.file).then(val => {
            return fileContentParse(val);
        }).then(val => {
            self.postMessage({ chart: val });
            scheme = bootStrapParser(val);
        });
    }
    else if (event.data.type !== undefined) {
        const dimension = this.createDimension(cxt, event.data.type);
        const colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];
        const highlights = ["#1f88c5", "#aed8e9", "#ff8f3f", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

        var data = dimension.group().reduceCount()
        data = data.all()
        const pairs = Object.values(data)
        const value = pairs.map(val => val.value);
        const keys = pairs.map(val => val.key);
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
    else if (event.data.svm !== undefined) {
        let model = createSVM(event.data.svm);
        bootStrapModel(event.data.svm, model, false, false)
    }
    else if (event.data.rtree !== undefined) {
        let model = createRtree(event.data.rtree);
        bootStrapModel(event.data.rtree, model, false, false)
    }
    else if (event.data.btree !== undefined) {
        let model = createBtree(event.data.btree);
        bootStrapModel(event.data.btree, model, false, false)
    }
    else if (event.data.KNN !== undefined) {
        let model = createKNN(event.data.KNN);
        bootStrapModel(event.data.KNN, model, false, false)
    }
    else if (event.data.NormalBayesClassifier !== undefined) {
        let model = createNormalBayesClassifier(event.data.NormalBayesClassifier);
        bootStrapModel(event.data.NormalBayesClassifier, model, false, false)
    }

})

function trainTestDataSplit(data, ratio) {

}

function featuresPredictionSplit(parsedCSV, preduction, encoderedHeaders, labelEncoder) {
    const predictions = []
    console.log(labelEncoder)
    parsedCSV = JSON.parse(JSON.stringify(parsedCSV));
    var numericArray = null;
    for (let i = 0; i < parsedCSV.length; i++) {
        for (var head in parsedCSV[i]) {
            var parsed = null;
            if (encoderedHeaders[head]) {
                parsed = labelEncoder[head].encoder[parsedCSV[i][head]]
            }
            else {
                parsed = parsedCSV[i][head]
            }
            if (preduction === head) {
                predictions.push(parsed)
                delete parsedCSV[i][head]
            }
            else {
                parsedCSV[i][head] = parsed
            }
        }
    }
    console.log(parsedCSV)
    numericArray = parsedCSV.map(val => Object.values(val))
    numericArray = [].concat.apply([], numericArray)
    console.log(scheme.encoderedHeaders)
    // const position = scheme.parsedCSV.columns.indexOf(preduction)
    const varType = JSON.parse(JSON.stringify(scheme.encoderedHeaders));
    const temp = varType[preduction]
    delete varType[preduction]
    varType[preduction] = temp
    console.log(varType)
    return { features: numericArray, predictions: predictions, varType: Object.values(varType) }
}

function bootStrapParser(val) {
    var scheme = {
        parsedCSV: null,
        headerTypes: null,
        labelHeads: null,
        encoderedHeaders: null,
        matrixDim: null,
        currentMat: null,
        currentMatData: null,
        varTypeMat: null,
        varTypeData: null,
        numericArray: null
    }
    scheme.parsedCSV = val.data;
    scheme.headTypes = val.head;
    scheme.encoderedHeaders = {};
    scheme.headTypes.map(val => {
        scheme.encoderedHeaders[Object.keys(val)[0]] = !isNumeric(val)
    })
    scheme.matrixDim = {}
    scheme.matrixDim.row = scheme.parsedCSV.length;
    scheme.matrixDim.col = scheme.parsedCSV.columns.length;
    cxt = cf.default(scheme.parsedCSV);
    scheme.labelCoder = {}
    for (var head in scheme.encoderedHeaders) {
        console.log(scheme.encoderedHeaders[head])
        if (scheme.encoderedHeaders[head]) {
            scheme.labelCoder[head] = labelEncoding(head, cxt)
        }
    }
    console.log(scheme.labelCoder)
    return scheme;
}

function creatMat32f(rows, col, data, type) {
    var Mat = new cv.Mat(rows, col, type),
        Data = Mat.data32f();
    Data.set(data);
    return Mat;
}

function creatMat32s(rows, col, data, type) {
    var Mat = new cv.Mat(rows, col, type),
        Data = Mat.data32s();
    Data.set(data);
    return Mat;
}

function bootStrapModel(val, model, varType, keep) {
    console.log(val)
    console.log("bootstaping")

    const rows = scheme.matrixDim.row;
    const cols = scheme.matrixDim.col;

    const split = featuresPredictionSplit(scheme.parsedCSV, val.predicting, scheme.encoderedHeaders, scheme.labelCoder)

    console.log(split)
    console.log(rows, cols)
    let trainingDataMat = new cv.Mat(rows, (cols - 1), cv.CV_32FC1),
        trainingData = trainingDataMat.data32f();
    trainingData.set(split.features);
    console.log(trainingDataMat.data32f())
    var none = new cv.Mat();

    console.log(split.varType)
    let varTypeMat = new cv.Mat(1, cols, cv.CV_32SC1);
    let varTypeData = varTypeMat.data32s();
    varTypeData.set(new Int32Array(split.varType))

    let labelsMat
    let labelsData

    if (!split.varType[split.varType.length1 - 1]) {
        labelsMat = new cv.Mat(rows, 1, cv.CV_32SC1)
        labelsData = labelsMat.data32s();
        labelsData.set(split.predictions);
    } else {
        labelsMat = new cv.Mat(rows, 1, cv.CV_32FC1)
        labelsData = labelsMat.data32f();
        labelsData.set(split.predictions);
    }


    console.log(varTypeMat.data32s())
    let trainData;
    if (varType) {
        trainData = new cv.ml_TrainData(
            trainingDataMat,
            cv.ml_SampleTypes.ROW_SAMPLE.value,
            labelsMat, none, none, none, varTypeMat
        );
    } else {
        trainData = new cv.ml_TrainData(
            trainingDataMat,
            cv.ml_SampleTypes.ROW_SAMPLE.value,
            labelsMat, none, none, none, none
        );
    }

    console.log(trainData.getTrainNormCatResponses().data32s())
    console.log("training")
    console.time("svm")
    var trainStatus = model.train(trainData, 0)
    console.timeEnd("svm")
    if (!keep) {
        model.delete();
    }
    labelsMat.delete();
    trainingDataMat.delete();
    varTypeMat.delete();
    // holder.delete();
}

function createSVM(val) {
    var svm = new cv.ml_SVM();
    var type = val.SVMType
    var kernel = val.Kernel
    var gamma = val.gemma
    svm.setType(type);
    svm.setKernel(kernel);
    svm.setGamma(gamma);
    //temp
    svm.setP(0.1);
    svm.setC(0.1);
    return svm;
}

function createRtree(val) {
    var rtree = new cv.ml_RTrees();
    var variableImportance = val.variableImportance
    var maxCategories = val.maxCategories
    var maxDepth = val.maxDepth
    rtree.setCalculateVarImportance(variableImportance);
    rtree.setMaxCategories(maxCategories);
    rtree.setMaxDepth(maxDepth);

    return rtree;
}

function createBtree(val) {
    var btree = new cv.ml_Boost();
    var maxCategories = val.maxCategories
    var maxDepth = val.maxDepth
    var boostingType = val.boostingType
    var weakCount = val.weakCount;
    btree.setWeakCount(weakCount)
    btree.setBoostType(boostingType);
    btree.setMaxCategories(maxCategories);
    btree.setMaxDepth(maxDepth);

    return btree;
}

function createKNN(val) {
    var KNN = new cv.ml_KNearest();
    var defaultK = val.defaultK
    var KNNType = val.KNNType
    KNN.setDefaultK(defaultK)
    KNN.setAlgorithmType(KNNType);

    return KNN;
}

function createNormalBayesClassifier(val) {
    var NormalBayesClassifier = new cv.ml_NormalBayesClassifier()
    return NormalBayesClassifier;
}


function svmTesting(svmType, kernelType, gamma) {
    var svm = new cv.ml_SVM();
    var type = svmType.value
    var kernel = kernelType.value
    var gamma = gamma;

    svm.setType(type);
    svm.setKernel(kernel);
    svm.setGamma(gamma);

    const feature = [];
    const labels = [];

    for (var i = 0; i < 100000; i++) {
        feature.push(Math.random() * 10)
    }
    for (var i = 0; i < 10000; i++) {
        var num = parseInt((Math.random() * 5))
        while (num === 0) {
            num = parseInt((Math.random() * 5))
        }
        labels.push(num)
    }

    let labelsMat = new cv.Mat(10000, 1, cv.CV_32SC1),
        labelsData = labelsMat.data32s();
    console.log(labels)
    labelsData.set(labels);

    var trainingDataMat = new cv.Mat(10000, 10, cv.CV_32FC1),
        trainingData = trainingDataMat.data32f();
    trainingData.set(feature);
    var none = new cv.Mat();
    console.time("svm")

    const trainData = new cv.ml_TrainData(
        trainingDataMat,
        cv.ml_SampleTypes.ROW_SAMPLE.value,
        labelsMat, none, none, none, none
    );
    var trainStatus = svm.train(trainData, 0)
    console.timeEnd("svm")
    const predictions = [];
    for (var i = 0; i < 100; i++) {
        predictions.push(Math.random() * 10)
    }

    let sampleMat = new cv.Mat(100, 10, cv.CV_32FC1);
    const sampleData = labelsMat.data32f();
    sampleData.set(predictions);
    var holder = new cv.Mat()
    let reponses = svm.predict(sampleMat, holder, 0);
    console.log(holder.data32f());

    svm.delete();
    sampleMat.delete();
    labelsMat.delete();
    trainingDataMat.delete();
    holder.delete();
}

function rTreeTesting() {
    var rtree = new cv.ml_RTrees();
    rtree.setCalculateVarImportance(true);
    rtree.setMaxDepth(10)
    rtree.setMaxCategories(10)
    rtree.setCVFolds(5)
    const feature = [];
    const labels = [];
    rtree.setCalculateVarImportance(true)
    for (var i = 0; i < 100000; i++) {
        feature.push(Math.random() * 10)
    }
    for (var i = 0; i < 10000; i++) {
        var num = parseInt((Math.random() * 5))
        while (num === 0) {
            num = parseInt((Math.random() * 5))
        }
        labels.push(num)
    }

    let labelsMat = new cv.Mat(10000, 1, cv.CV_32SC1),
        labelsData = labelsMat.data32s();
    console.log(labels)
    labelsData.set(labels);

    var trainingDataMat = new cv.Mat(10000, 10, cv.CV_32FC1),
        trainingData = trainingDataMat.data32f();
    trainingData.set(feature);
    var none = new cv.Mat();
    console.time("rtree")

    const trainData = new cv.ml_TrainData(
        trainingDataMat,
        cv.ml_SampleTypes.ROW_SAMPLE.value,
        labelsMat, none, none, none, none
    );
    var trainStatus = rtree.train(trainData, 0)
    console.timeEnd("rtree")
    const predictions = feature.slice(0, 100);

    console.log("1")
    let sampleMat = new cv.Mat(100, 10, cv.CV_32FC1);
    const sampleData = labelsMat.data32f();
    sampleData.set(predictions);
    var holder = new cv.Mat()
    let reponses = rtree.predict(trainingDataMat, holder, 0);
    console.log(holder.data32f());
    var correct = 0;
    for (var i = 0; i < predictions.length; i) {
        if (holder.data32f()[i] == labelsMat.data32f()[i]) {
            correct++;
        }
    }
    console.log(correct);
    rtree.delete();
    sampleMat.delete();
    labelsMat.delete();
    trainingDataMat.delete();
    holder.delete();
}



  /** C-Support Vector Classification. n-class classification (n \f$\geq\f$ 2), allows
        imperfect separation of classes with penalty multiplier C for outliers. */

        /** \f$\nu\f$-Support Vector Classification. n-class classification with possible
        imperfect separation. Parameter \f$\nu\f$ (in the range 0..1, the larger the value, the smoother
        the decision boundary) is used instead of C. */

        /** Distribution Estimation (One-class %SVM). All the training data are from
        the same class, %SVM builds a boundary that separates the class from the rest of the feature
        space. */

        /** \f$\epsilon\f$-Support Vector Regression. The distance between feature vectors
        from the training set and the fitting hyper-plane must be less than p. For outliers the
        penalty multiplier C is used. */

        /** \f$\nu\f$-Support Vector Regression. \f$\nu\f$ is used instead of p.
        See @cite LibSVM for details. */

// const svm_type = {
//     C_SVC: cv.ml_SVM_Types.C_SVC,
//     NU_SVC: cv.ml_SVM_Types.NU_SVC,
//     ONE_CLASS: cv.ml_SVM_Types.ONE_CLASS ,
//     EPS_SVR: cv.ml_SVM_Types.EPS_SVR,
//     NU_SVR: cv.ml_SVM_Types.NU_SVR 
// }


   /** Returned by SVM::getKernelType in case when custom kernel has been set */

   /** Linear kernel. No mapping is done, linear discrimination (or regression) is
   done in the original feature space. It is the fastest option. \f$K(x_i, x_j) = x_i^T x_j\f$. */

   /** Polynomial kernel:
   \f$K(x_i, x_j) = (\gamma x_i^T x_j + coef0)^{degree}, \gamma > 0\f$. */

   /** Radial basis function (RBF), a good choice in most cases.
   \f$K(x_i, x_j) = e^{-\gamma ||x_i - x_j||^2}, \gamma > 0\f$. */

   /** Sigmoid kernel: \f$K(x_i, x_j) = \tanh(\gamma x_i^T x_j + coef0)\f$. */

   /** Exponential Chi2 kernel, similar to the RBF kernel:
   \f$K(x_i, x_j) = e^{-\gamma \chi^2(x_i,x_j)}, \chi^2(x_i,x_j) = (x_i-x_j)^2/(x_i+x_j), \gamma > 0\f$. */

   /** Histogram intersection kernel. A fast kernel. \f$K(x_i, x_j) = min(x_i,x_j)\f$. */

// const svm_kernelTypes={
//     CUSTOM: cv.ml_SVM_KernelTypes.CUSTOM,
//     LINEAR:cv.ml_SVM_KernelTypes.LINEAR,
//     POLY: cv.ml_SVM_KernelTypes.POLY,
//     RBF: cv.ml_SVM_KernelTypes.RBF,
//     SIGMOID: cv.ml_SVM_KernelTypes.SIGMOID,
//     CHI2: cv.ml_SVM_KernelTypes.CHI2,
//     INTER: cv.ml_SVM_KernelTypes.INTER
// }
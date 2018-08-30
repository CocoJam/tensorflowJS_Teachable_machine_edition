import React from 'react';
import * as cf from "crossfilter2";
import Pie from "./Charts/PiePlotly";
import ChartContainer from "./Charts/ChartContainer";
import { Button } from '../../node_modules/@material-ui/core';
import * as numjs from "numjs";
import FileWorker from './workers/file.worker.js';
import ReactDOM from 'react-dom';
import cvworker from "../index";
import ModelContainer from "./Models/ModelContainer"
window.numjs = numjs;
class FileUploadHandling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFileContents: null,
            waitingForFileUpload: false,
            fileContent: null,
            charts: []
        };
    }

    handleNVEvent(event) {
        this.setState({})
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('nv-event', this.handleNVEvent);
    }

    handleLeftIconButtonClick = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    fileUploadHandling = async (event) => {

        event.persist();
        if (!event.target || !event.target.files) {
            return;
        }
        this.setState({ waitingForFileUpload: true });
        const w = new FileWorker();
        const fileList = event.target.files;
        const latestUploadedFile = fileList.item(fileList.length - 1);
        w.onmessage = (event) => {
            const data = event.data.data;
            cvworker.postMessage(data)
            window.data = data;
            var cfdata = cf.default(data.data);
            window.cx = cfdata;
            const Models = <ModelContainer head={data.head}/>
            const chart = <ChartContainer data={data.data} cxt={cfdata} types={data.head} height={600} width={600} />
            this.setState({ ...this.state, charts: chart, headType: data.headType, fileContent: data.data })
        }
        cvworker.onmessage = (event) => {
            console.log(event)
        }

        w.postMessage({ file: latestUploadedFile });
        // w.postMessage({cv :window.cv});
        //     const jsMatrix = numjs.float64(flattened).reshape(data.length, Object.keys(data[0]).length)
        //     // const eigen = this.float32(flattened, data.length, Object.keys(data[0]).length);
        //     this.setState({ ...this.state, jsMatrix: jsMatrix })
    };

    stringHashing = (data) => {
        var linear_hash_table = {};
        var flattened = [];
        data.forEach(function (entry) {
            for (var i in entry) {
                if (typeof (entry[i]) == "string") {
                    const hashed = entry[i].hashCode();
                    if (!linear_hash_table.hasOwnProperty(hashed)) {
                        linear_hash_table[hashed] = entry[i];
                    }
                    flattened.push(hashed);
                }
                else {
                    flattened.push(entry[i]);
                }
            }
        });
        this.setState({ ...this.state, linear_hash_table: linear_hash_table });
        return flattened;
    }


    overallInstanceCount(cxt) {
        return cxt.groupAll().reduceCount().value();
    }

    featureNumInstanceCount(cxt, feature) {
        return cxt.groupAll().reduceSum(function (fact) { return fact[feature]; }).value();
    }

    createDimension(cxt, type) {
        return cxt.dimension(function (fact) { return fact[type]; })
    }

    createFilter(cxt, filter) {
        const filterConstru = this.createDimension(cxt, filter.type);
        filterConstru.filter(function (fact) { return fact[filter.thing] || filter.thing });
        return filterConstru;
    }



    groupByCount(cxt, type, top, filter) {
        if (filter === undefined) {
            filter = this.createDimension(cxt, type);
        }
        const groupByCount = filter.group().reduceCount();
        return groupByCount.top(top)
    }

    float64 = (val, row, col) => {
        const float64_t_arr = new Float64Array(val);
        var matrix = window.wasm.copytovec(float64_t_arr, row, col)
        return matrix;
    }



    handleTitleClick = () => {
        let lr = new cv.ml_LogisticRegression();
        lr.setLearningRate(0.001);
        lr.setIterations(10);
        lr.setRegularization(cv.ml_LogisticRegression_RegKinds.REG_L2.value);
        lr.setTrainMethod(cv.ml_LogisticRegression_Methods.BATCH.value);
        lr.setMiniBatchSize(1);

        let labelsMat = new cv.Mat(4, 1, cv.CV_32FC1)
        let labelsData = labelsMat.data32f()
        labelsData.set([1, -1, -1, -1])
        let trainingDataMat = new cv.Mat(4, 2, cv.CV_32FC1)
        let trainingData = trainingDataMat.data32f()
        trainingData.set([501, 255, 501, 10, 10, 10, 255, 501])
        let none = new cv.Mat();
        let trainData = new cv.ml_TrainData(trainingDataMat,
            cv.ml_SampleTypes.ROW_SAMPLE.value,
            labelsMat, none, none, none, none);
        let trainStatus = lr.train(trainData, 0);
        window.lr = lr;
        let trainingDataMat2 = new cv.Mat(4, 1, cv.CV_32FC1)
        let trainingData2 = trainingDataMat2.data32f()
        trainingData2.set([501, 255, 501, 10])
        let predictLabels = new cv.Mat(1, 1, cv.CV_32FC1)
        let predtictions = lr.predict(trainingData2, predictLabels, 0)
        console.log(predtictions)
    }

    handleTitleClick2 = () => {
        let svm = new cv.ml_SVM()
        let type = cv.ml_SVM_Types.C_SVC.value
        let kernel = cv.ml_SVM_KernelTypes.LINEAR.value
        let gamma = 3;

        svm.setType(type);
        svm.setKernel(kernel);
        svm.setGamma(gamma);

        // assert.equal(svm.getType(), type);
        // assert.equal(svm.getKernelType(), kernel);
        // assert.equal(svm.getGamma(), gamma);


        // Training
        let labelsMat = new cv.Mat(4, 1, cv.CV_32SC1);
        let labelsData = labelsMat.data32s();
        labelsData.set([2, 1, -1, -1]);

        let trainingDataMat = new cv.Mat(4, 2, cv.CV_32FC1);
        let trainingData = trainingDataMat.data32f();

        // { {501, 10}, {255, 10}, {501, 255}, {10, 501} }
        trainingData.set([501, 255, 501, 10, 10, 10, 255, 501]);

        let trainStatus = svm.train1(trainingDataMat,
            cv.ml_SampleTypes.ROW_SAMPLE.value,
            labelsMat);
        {
            let sampleMat = new cv.Mat(1, 2, cv.CV_32FC1);
            let samepleData = sampleMat.data32f();  // { {1000, 1}
            samepleData[0] = 1000; samepleData[1] = 1;
            let outputs = new cv.Mat(),
                flags = 0;
            let response = svm.predict(sampleMat, outputs, flags);
            console.log("single predict")
            console.log(outputs.data32f())

            // assert.deepEqual(outputs.data32f(), new Float32Array([1.0]));

            sampleMat.delete();
            outputs.delete();
        }
        // Test multiple prediction
        {
            let sampleMat = new cv.Mat(2, 2, cv.CV_32FC1);
            let samepleData = sampleMat.data32f();  // { {10000, 1}, {1, 1000},
            samepleData[0] = 10000; samepleData[1] = 1;
            samepleData[2] = 1; samepleData[3] = 1000;
            let outputs = new cv.Mat(),
                flags = 0;
            let response = svm.predict(sampleMat, outputs, flags);
            console.log("muitple predict")
            console.log(outputs.data32f())
            // assert.deepEqual(outputs.data32f(), new Float32Array([1.0, -1.0]));
            sampleMat.delete();
            outputs.delete();
        }

        trainingDataMat.delete();
        labelsMat.delete();
        svm.delete();
    }

    render() {
        return (
            <div>
                <input id="upload" onChange={this.fileUploadHandling} type="file" />
                {this.state.charts}
                {<Button onClick={this.handleTitleClick.bind(this)}>LR</Button>}
                {<Button onClick={this.handleTitleClick2.bind(this)}>svm</Button>}
                
            </div>
        );
    }
}

export default FileUploadHandling;
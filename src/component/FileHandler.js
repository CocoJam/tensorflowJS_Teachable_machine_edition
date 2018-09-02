import React from 'react';
import * as cf from "crossfilter2";
import ChartContainer from "./Charts/ChartContainer";
import * as numjs from "numjs";
import ReactDOM from 'react-dom';
import cvworker from "../index";
import ModelContainer from "./Models/ModelContainer"

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



class FileUploadHandling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvReady: null,
            uploadedFileContents: null,
            waitingForFileUpload: false,
            fileContent: null,
            charts: [],
            Chartrender: false
        };

    }

    handleCVEvent(event) {
        this.setState({
            ...this.state, cvReady: true
        })
        console.log(event);
    }

    handleFileHandler(event) {
        const data = event.target.data;
        var cfdata = cf.default(data.data);
        window.cx = cfdata;
        const Models = <ModelContainer head={data.head} cxt={cfdata} />
        const chart = <ChartContainer data={data.data} cxt={cfdata} types={data.head} height={600} width={600} />
        this.setState({ ...this.state, charts: chart, model: Models, headType: data.headType, fileContent: data.data })
    }

    componentDidMount() {
        // ReactDOM.findDOMNode(this).addEventListener('nv-event', this.handleNVEvent);
        window.addEventListener('FileHandler', this.handleFileHandler.bind(this));
        window.addEventListener('ReadyCV', this.handleCVEvent.bind(this));
    }

    handleLeftIconButtonClick = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    fileUploadHandling = async (event) => {
        event.persist();
        if (!event.target || !event.target.files) {
            return;
        }
        this.setState({ waitingForFileUpload: true });
        const fileList = event.target.files;
        const latestUploadedFile = fileList.item(fileList.length - 1);
        // cvworker.onmessage = (event) => {
        //     if (event.data.results !== undefined) {
        //         console.log(event.data)
        //         window.mat = event.data.results;
        //         return
        //     } else if (event.data.chart !== undefined) {
        //         const data = event.data.chart;
        //         window.data = data;
        //         var cfdata = cf.default(data.data);
        //         window.cx = cfdata;
        //         const Models = <ModelContainer head={data.head} cxt={cfdata} />
        //         if (this.state.Chartrender) {
        //             const chart = <ChartContainer data={data.data} cxt={cfdata} types={data.head} height={600} width={600} />
        //             this.setState({ ...this.state, charts: chart, model: Models, headType: data.headType, fileContent: data.data })
        //         } else {
        //             this.setState({ ...this.state, model: Models, headType: data.headType, fileContent: data.data })
        //         }
        //         return
        //     }
        // }
        cvworker.postMessage({ file: latestUploadedFile });
    };


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

    handleRender = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {
        var cv = null;
        var chart = null;
        console.log(this.state.Chartrender)
        if (this.state.Chartrender && this.state.charts !== null) {
            chart = this.state.charts;
        }
        if (this.state.cvReady) {
            cv = <div><input id="upload" onChange={this.fileUploadHandling} type="file" />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.Chartrender}
                            onChange={this.handleRender('Chartrender')}
                            value="Chartrender"
                        />
                    }
                    label="Chart rendering"
                />
            </div>
        }
        return (
            <div>
                {cv}
                {chart}
                {this.state.model}
            </div>
        );
    }
}

export default FileUploadHandling;
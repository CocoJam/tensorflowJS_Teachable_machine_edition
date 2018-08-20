import React from 'react';
// import * as d3 from "d3";
import * as cf from "crossfilter";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-basic-dist';
const PlotlyComponent = createPlotlyComponent(Plotly);


class FileUploadHandling extends React.Component {


    constructor(props) {
        console.log(cf)
        super(props);
        this.state = {
            uploadedFileContents: null,
            waitingForFileUpload: false,
            fileContent: null
        };
        console.log(Plotly);
    }

    handleTitleClick(event) {
        console.log(event)
    }

    handleLeftIconButtonClick = () =>
        this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    parseUploadFile = (inputFile) => {

        const FR = new FileReader();
        return new Promise((resolve, reject) => {
            FR.onerror = () => {
                FR.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            FR.onload = () => {
                resolve(FR.result);
            };
            FR.readAsBinaryString(inputFile);
        });
    };


    fileUploadHandling = async (event) => {
        console.log("file")
        event.persist();
        if (!event.target || !event.target.files) {
            return;
        }
        this.setState({ waitingForFileUpload: true });

        const fileList = event.target.files;
        const latestUploadedFile = fileList.item(fileList.length - 1);
        try {
            const fileContents = await this.parseUploadFile(latestUploadedFile);
            this.setState({
                uploadedFileContents: fileContents,
                waitingForFileUpload: false
            });
            console.time("CSV-Parse")
            var cfdata;
            console.log(Plotly);
            // var dataFrame =[]
            // const strEncoder =  new TextEncoder();
            var data = Plotly.d3.csv.parse(fileContents, function (d) {
                var dataD3 = {};
                var dataFrameInstance = []
                // console.log(d);
                var x;
                for (x in d) {
                    var val = d[x]
                    if (/^[\d%]+$/gm.test(val)) {
                        if (/%/gm.test(val)) {
                            dataD3[x] = parseInt(val) / 100;
                        }
                        else {
                            dataD3[x] = parseInt(val)
                        }
                    }
                    else if (/\d+(?=.(?=(?<=\.)\d+)).[\d%]+$/gm.test(val)) {
                        if (/%/gm.test(val)) {
                            dataD3[x] = parseFloat(val) / 100;
                        }
                        else {
                            dataD3[x] = parseFloat(val)
                        }
                    }
                    else {
                        dataD3[x] = val
                    }
                }
                return dataD3
            });
            this.setState({ ...this.state, fileContent: data })
            console.timeEnd("CSV-Parse")
            console.time("parsing hash");
            var linear_hash_table = {};
            var flattened = [];
            data.forEach(function (entry) {
                for (var i in entry){
                    if (typeof (entry[i]) == "string") {
                        const hashed = entry[i].hashCode();
                        if (!linear_hash_table.hasOwnProperty(hashed)) {
                            linear_hash_table[hashed] = entry[i];
                        }
                        flattened.push(hashed);
                    }
                    else{
                        flattened.push(entry[i]);
                    }
                }
            });
            window.matrix = this.float32(flattened, data.length, Object.keys(data[0]).length);
            console.timeEnd("parsing hash")
            console.log(flattened);
            window.flattened = flattened

            console.log(linear_hash_table);
            var cfdata = cf.default(data)
            console.log(cfdata)
            const cata = Object.keys(data[0])
            var dimensionCategory = cfdata.dimension(item => item[cata[0]])
            console.log(dimensionCategory)
            // d3.create("div").data(data).enter().text((d)=>console.log(d));

        } catch (e) {
            console.log(e);
            this.setState({
                waitingForFileUpload: false
            });
        }
    };

    float32 = (val, row , col) => {
        console.time("float32 function time");
        console.time("Float32 Array");
        const float64_t_arr = new Float64Array(val);
        console.timeEnd("Float32 Array");
        // console.log(float64_t_arr.length* float64_t_arr.BYTES_PER_ELEMENT);
       
        
        console.log("wasm")
        console.time("vector");
        var matrix = window.wasm.copytovec(float64_t_arr, row,col)
        console.timeEnd("vector");
        console.log("vec")
        console.time("array");
        const float_t_ptr = window.wasm._malloc(float64_t_arr.length);
        window.wasm.HEAPF64.set(float64_t_arr, float_t_ptr);
        var matrix = window.wasm.copytoarray(float_t_ptr, float64_t_arr.length, row,col)
        window.wasm._free(float_t_ptr);
        console.timeEnd("array");
        console.timeEnd("float32 function time")
        return matrix;
    }

    render() {
        // var out;
        // if (this.state.fileContent !== null) {
        //     console.log(this.state.fileContent)
        // }
        // // console.log(this.props);
        // return (
        //     <div>
        //         <input id="upload" onChange={this.fileUploadHandling} type="file" />

        //     </div>
        // );
        let data = [
            {
                type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
                x: [1, 2, 3],     // more about "x": #scatter-x
                y: [6, 2, 3],     // #scatter-y
                marker: {         // marker is an object, valid marker keys: #scatter-marker
                    color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
                }
            },
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: [1, 2, 3],     // more about "x": #bar-x
                y: [6, 2, 3],     // #bar-y
                name: 'bar chart example' // #bar-name
            }
        ];
        let layout = {                     // all "layout" attributes: #layout
            title: 'simple example',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
            },
            annotations: [            // all "annotation" attributes: #layout-annotations
                {
                    text: 'simple annotation',    // #layout-annotations-text
                    x: 0,                         // #layout-annotations-x
                    xref: 'paper',                // #layout-annotations-xref
                    y: 0,                         // #layout-annotations-y
                    yref: 'paper'                 // #layout-annotations-yref
                }
            ]
        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        console.log("re-rendering")
        return (
            <div>
                <input id="upload" onChange={this.fileUploadHandling} type="file" />
                <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
            </div>
        );
    }
}

// const mappingStore = (state) => {
//     return state
// };

// const DispatchStore = (dispatch) => {
//     return {
//         df: (arg) => {
//             dispatch({
//                 type: "df",
//                 payload: arg
//             });
//         }
//     }
// };
export default FileUploadHandling;
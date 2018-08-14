import React from 'react';
import * as d3 from "d3";
import * as cf from "crossfilter";
import * as papa from "papaparse"
class FileUploadHandling extends React.Component {

    constructor(props) {
        console.log(cf)
        super(props);
        this.state = {
            uploadedFileContents: null,
            waitingForFileUpload: false,
            fileContent: null
        };
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
            var data = d3.csvParse(fileContents, function (d) {
                var dataD3 = {};
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
            console.timeEnd("CSV-Parse")
            console.log(data);
            window.data = data;
            var cfdata=cf.default(data)

            var dimensionCategory = cfdata.dimension(item => item[data.columns[0]])
            console.log(dimensionCategory)
            // d3.create("div").data(data).enter().text((d)=>console.log(d));

            this.setState({ ...this.state, fileContent: data })
        } catch (e) {
            console.log(e);
            this.setState({
                waitingForFileUpload: false
            });
        }
    };

    render() {
        var out;
        if (this.state.fileContent !== null) {
            console.log(this.state.fileContent)
        }
        // console.log(this.props);
        return (
            <div>
                <input id="upload" onChange={this.fileUploadHandling} type="file" />
                {out}
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
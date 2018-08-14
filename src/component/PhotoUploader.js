import React from 'react';
import {connect} from "react-redux";
import qq from 'fine-uploader/lib/core'

class AppTitleBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedFileContents: null,
            waitingForFileUpload: false,
            imagePlaceHolder: null
        };
    }

    handleTitleClick(event) {
        console.log(event)
    }

    handleLeftIconButtonClick = () =>
        this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

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
            FR.readAsDataURL(inputFile);
        });
    };


    fileUploadHandling = async (event) => {
        event.persist();
        if (!event.target || !event.target.files) {
            return;
        }
        this.setState({waitingForFileUpload: true});

        const fileList = event.target.files;
        const latestUploadedFile = fileList.item(fileList.length - 1);
        try {
            const fileContents = await this.parseUploadFile(latestUploadedFile);
            this.setState({
                uploadedFileContents: fileContents,
                waitingForFileUpload: false
            });
            console.log(fileContents);
            this.setState({...this.state,
                imagePlaceHolder: fileContents})
        } catch (e) {
            console.log(e);
            this.setState({
                waitingForFileUpload: false
            });
        }
    };

    render() {
        console.log(this.props);
        var x;
        if (this.state.imagePlaceHolder !== null) {
            x = <img src={this.state.imagePlaceHolder}/>
        }
        return (
            <div>
                <input onChange={this.fileUploadHandling} type="file"/>{x}
            </div>
        );
    }
}

const mappingStore = (state) => {
    return state
};

const DispatchStore = (dispatch) => {
    return {
        df: (arg) => {
            dispatch({
                type: "df",
                payload: arg
            });
        }
    }
};
// export default AppTitleBar
export default connect(mappingStore, DispatchStore)(AppTitleBar)
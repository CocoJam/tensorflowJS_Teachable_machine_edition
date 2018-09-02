import React from 'react';
import Panel from "../ExpandPanel/ExpandPanel"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import cvworker from "../../index";

class SVM extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = {
            title: "Support Vector Machine", train: 70, SVMType: 100, Kernel: 0, gemma: 0.5,
            predicting: this.props.label[0], labelName: this.props.label, regressionName: this.props.regression, label: this.props.label.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>),
            regression: this.props.regression.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)
        }
    }
    handleChangePrediction = (event, value) => {
        this.setState({ ...this.state, predicting: event.target.value });
    }

    handleChangeGemma = (event, value) => {
        this.setState({ ...this.state, gemma: value });
    };

    handleChangeKernel = (event, value) => {
        if (event.target.value === 0) {
            this.setState({ ...this.state, Kernel: event.target.value, gemma: 1 });
        }
        this.setState({ ...this.state, Kernel: event.target.value });
    };

    handleChangeType = (event, value) => {
        var prediction = null;
        this.setState({ ...this.state, predicting: prediction, SVMType: event.target.value });
    };

    handleChangeTrain = (event, value) => {
        console.log(event.target.value)
        this.setState({ ...this.state, train: value });
    };

    handleAlignment = alignment => this.setState({ alignment });

    handleTrain = (event, value) => {
        console.log("train")
        console.log(this.state);
        const cloned = JSON.parse(JSON.stringify(this.state));
        cvworker.postMessage({ svm: cloned })
    };

    render() {
        var gemma;
        var prediction;
        if (this.state.Kernel !== 0) {
            gemma = <div>
                <Typography id="label">gemma: {this.state.gemma}</Typography>
                <Slider value={this.state.gemma} min={0.1} max={0.9} step={0.1} onChange={this.handleChangeGemma} />
            </div>
        }
        if (this.state.SVMType < 103) {
            this.state.prediction = this.state.labelName[0]
            prediction = this.state.label
        }
        else {
            this.state.prediction = this.state.regressionName[0]
            prediction = this.state.regression
        }
        console.log("render")
        return (
            <Panel title={this.state.title} >
                <Typography id="label">Training ratio: {(String(this.state.train / 100)).substring(0, 4)}</Typography>
                <Slider value={this.state.train} onChange={this.handleChangeTrain} />
                <Typography id="label">Test ratio: {(String(1 - this.state.train / 100)).substring(0, 4)}</Typography>
                <Slider value={this.state.train} onChange={this.handleChangeTrain} reverse />

                <FormControl required>
                    <InputLabel htmlFor="SVMType-helper">SVM Type</InputLabel>
                    <Select
                        value={this.state.SVMType}
                        onChange={this.handleChangeType}
                        input={<Input name="SVMType" id="SVMType-helper" />}
                    >
                        <MenuItem value={100}>C-Support Vector Classification</MenuItem>
                        <MenuItem value={101}>&nu;-Support Vector Classification</MenuItem>
                        <MenuItem value={103}>&Epsilon;-Support Vector Regression</MenuItem>
                        <MenuItem value={104}>&nu;-Support Vector Regression</MenuItem>
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>

                <FormControl required>
                    <InputLabel htmlFor="Kernel-helper">Kernel Type</InputLabel>
                    <Select
                        value={this.state.Kernel}
                        onChange={this.handleChangeKernel}
                        input={<Input name="Kernel" id="Kernel-helper" />}
                    >
                        <MenuItem value={0}>Linear kernel</MenuItem>
                        <MenuItem value={1}>Polynomial kernel</MenuItem>
                        <MenuItem value={2}>Radial basis function</MenuItem>
                        <MenuItem value={3}>Sigmoid kernel</MenuItem>
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
                {
                    gemma
                }
                <FormControl required>
                    <InputLabel htmlFor="Prediction-helper">Prediction</InputLabel>
                    <Select
                        value={this.state.predicting}
                        onChange={this.handleChangePrediction}
                        input={<Input name="predicting" id="predicting-helper" />}
                    >
                        {prediction}
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>

                <Button variant="contained" color="secondary" onClick={this.handleTrain}>
                    Train
                </Button>
            </Panel>
        );
    }

}

export default SVM;
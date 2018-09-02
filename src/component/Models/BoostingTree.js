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

class BoostTree extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = { title: "Boost Tree", train: 70, weakCount: 100,
        boostingType: 0,
        maxCategories: (this.props.regression.length+this.props.label.length),maxDepth:(this.props.regression.length+this.props.label.length-1),
        predicting: this.props.label[0], label: this.props.label.map(val =><MenuItem value={val}>{val}</MenuItem>),
        regression: this.props.regression.map(val =><MenuItem value={val}>{val}</MenuItem>) }
    }
    handleChangePrediction=(event, value)=>{
        this.setState({ ...this.state, predicting: event.target.value });
    }
    handleChangeTrain = (event, value) => {
        console.log(event.target.value)
        this.setState({ ...this.state, train: value });
    };

    handleChangeType = (event, value) => {
        this.setState({ ...this.state, SVMType: event.target.value });
    };

    handleWeakCount = (event, value) => {
        console.log(value)
        this.setState({ ...this.state, weakCount: value });
    };
    handleMaxDepth = (event, value) => {
        this.setState({ ...this.state, maxDepth: value });
    };

    handleChangeVariableImportance = (event, value) => {
        console.log(event.target.value)
        this.setState({ ...this.state, train: value });
    };

    handleAlignment = alignment => this.setState({ alignment });

    handleTrain = (event, value) => {
        console.log("train")
        console.log(this.state);
        const cloned =JSON.parse(JSON.stringify(this.state));
        cvworker.postMessage({btree:cloned})
    };

    render() {
        var prediction;
        if (this.state.boostingType < 2) {
            this.state.predicting = this.state.label[0]
            prediction = this.state.label
        }
        else {
            this.state.predicting = this.state.regression[0]
            prediction =this.state.regression
        }
        console.log("render")
        return (
            <Panel title={this.state.title} >
                <Typography id="label">Training ratio: {(String(this.state.train / 100)).substring(0, 4)}</Typography>
                <Slider value={this.state.train} onChange={this.handleChangeTrain} />
                <Typography id="label">Test ratio: {(String(1 - this.state.train / 100)).substring(0, 4)}</Typography>
                <Slider value={this.state.train} onChange={this.handleChangeTrain} reverse />
                <Typography id="label">Max Categories: {this.state.maxCategories}</Typography>
                <Slider value={this.state.maxCategories} min={2} max={this.props.regression.length+this.props.label.length} step={1} onChange={this.handleMaxCategories} />
                <Typography id="label">Max Depth: {this.state.maxDepth}</Typography>
                <Slider value={this.state.maxDepth} min={1} max={this.props.regression.length+this.props.label.length-1} step={1} onChange={this.handleMaxDepth} />
                <Typography id="label">Weak Classifier Count: {this.state.weakCount}</Typography>
                <Slider value={this.state.weakCount} min={10} max={200} step={1} onChange={this.handleWeakCount} />
             
                <FormControl required>
                    <InputLabel htmlFor="SVMType-helper">SVM Type</InputLabel>
                    <Select
                        value={this.state.boostingType}
                        onChange={this.handleChangeType}
                        input={<Input name="Boosting type" id="boostingType-helper" />}
                    >
                        <MenuItem value={0}>Discrete AdaBoost</MenuItem>
                        <MenuItem value={1}>Real AdaBoost</MenuItem>
                        <MenuItem value={2}>LogitBoost</MenuItem>
                        <MenuItem value={3}>Gentle AdaBoost</MenuItem>
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
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

export default BoostTree;
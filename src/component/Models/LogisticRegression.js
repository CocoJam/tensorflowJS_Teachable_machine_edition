import React from 'react';
import Panel from "../ExpandPanel/ExpandPanel"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
class LogisticRegression extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        const slider =this.state = { title: "Logistic Regression", learningRate: 50, iteration: 1, content: slider }
    }

    handleChangeValue = (event, value) => {
        console.log(value)
        if (value === 0) {
            value = 0.01
        }
        this.setState({ ...this.state, learningRate: value });
    };

    handleChangeIteration = (event, value) => {
        console.log(value)
        this.setState({ ...this.state, iteration: value });
    };

    handleTrain = (event, value) => {
        console.log("train")

    };

    render() {
        return (
            <Panel title={this.state.title} >
                <div>
                    <Typography id="label">Learning Rate: {(this.state.learningRate / 100)}</Typography>
                    <Slider min={1} max={100} step={1} value={this.state.learningRate} aria-labelledby="label" onChange={this.handleChangeValue} />
                </div>
                <div>
                    <Typography id="label">Number of Iteration: {this.state.iteration}</Typography>
                    <Slider min={1} max={100} step={1} value={this.state.iteration} aria-labelledby="label" onChange={this.handleChangeIteration} />
                </div>
                <Button variant="contained" color="secondary" onClick={this.handleTrain}>
                    Train
                </Button>
            </Panel>
        );
    }

}

export default LogisticRegression;
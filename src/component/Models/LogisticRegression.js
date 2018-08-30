import React from 'react';
import Panel from "../ExpandPanel/ExpandPanel"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import ToggleButton, { ToggleButtonGroup } from '@material-ui/lab/ToggleButton'
class LogisticRegression extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = { alignment: 'left', title: "Logistic Regression", learningRate: 50, iteration: 1, labels: this.props.labels }
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

    handleAlignment = alignment => this.setState({ alignment });

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

                <ToggleButtonGroup value={this.state.alignment} exclusive onChange={this.handleAlignment}>
                    {this.state.labels.map(labels => {
                        return <ToggleButton value={Object.keys(labels)[0]} key={Object.keys(labels)[0]}>
                            {Object.keys(labels)[0]}
                        </ToggleButton>
                    })}
                </ToggleButtonGroup>

                <Button variant="contained" color="secondary" onClick={this.handleTrain}>
                    Train
                </Button>
            </Panel>
        );
    }

}

export default LogisticRegression;
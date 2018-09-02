// import React from 'react';
// import Panel from "../ExpandPanel/ExpandPanel"
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/lab/Slider';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import cvworker from "../../index";

// class EM extends React.Component {
//     constructor(props) {
//         super(props)
//         console.log(this.props);
//         this.state = { title: "k nearest neighbor", train: 70, defaultK: 3,
//         KNNType: 1,
//         predicting: this.props.label[0], label: this.props.label.map(val =><MenuItem value={val}>{val}</MenuItem>)}
//     }
//     handleChangePrediction=(event, value)=>{
//         this.setState({ ...this.state, predicting: event.target.value });
//     }
//     handleChangeTrain = (event, value) => {
//         console.log(event.target.value)
//         this.setState({ ...this.state, train: value });
//     };

//     handleChangeType = (event, value) => {
//         this.setState({ ...this.state, SVMType: event.target.value });
//     };

//     handleDefaultK = (event, value) => {
//         console.log(value)
//         this.setState({ ...this.state, defaultK: value });
//     };

//     handleAlignment = alignment => this.setState({ alignment });

//     handleTrain = (event, value) => {
//         console.log("train")
//         console.log(this.state);
//         const cloned =JSON.parse(JSON.stringify(this.state));
//         cvworker.postMessage({KNN:cloned})
//     };

//     render() {
//         console.log("render")
//         return (
//             <Panel title={this.state.title} >
//                 <Typography id="label">Training ratio: {(String(this.state.train / 100)).substring(0, 4)}</Typography>
//                 <Slider value={this.state.train} onChange={this.handleChangeTrain} />
//                 <Typography id="label">Test ratio: {(String(1 - this.state.train / 100)).substring(0, 4)}</Typography>
//                 <Slider value={this.state.train} onChange={this.handleChangeTrain} reverse />
//                 <Typography id="label">K: {this.state.defaultK}</Typography>
//                 <Slider value={this.state.defaultK} min={2} max={this.props.regression.length+this.props.label.length} step={1} onChange={this.handleDefaultK} />
               
//                 <FormControl required>
//                     <InputLabel htmlFor="KNN-helper">KNN Type</InputLabel>
//                     <Select
//                         value={this.state.KNNType}
//                         onChange={this.handleChangeType}
//                         input={<Input name="KNN type" id="KNNType-helper" />}
//                     >
                      
//                         <MenuItem value={1}>Brute force</MenuItem>
//                         <MenuItem value={2}>KD-tree</MenuItem>
                      
//                     </Select>
//                     <FormHelperText>Some important helper text</FormHelperText>
//                 </FormControl>
//                 <FormControl required>
//                     <InputLabel htmlFor="Prediction-helper">Prediction</InputLabel>
//                     <Select
//                         value={this.state.predicting}
//                         onChange={this.handleChangePrediction}
//                         input={<Input name="predicting" id="predicting-helper" />}
//                     >
//                        {this.state.label}
//                     </Select>
//                     <FormHelperText>Some important helper text</FormHelperText>
//                 </FormControl>

//                 <Button variant="contained" color="secondary" onClick={this.handleTrain}>
//                     Train
//                 </Button>
//             </Panel>
//         );
//     }

// }

// export default EM;
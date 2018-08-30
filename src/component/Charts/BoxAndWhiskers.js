import React from 'react';
// import * as d3 from "d3";
import * as cf from "crossfilter";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-basic-dist';
// import * as dc from 'react-chartjs-2';
import * as chartjs from "chart.js";
const PlotlyComponent = createPlotlyComponent(Plotly);
class ChartTemplate extends React.Component {

    componentDidMount(){
        const chart = this.configuration();
        this.setState({...this.state, chart: chart});
    }

    constructor(props) {
        super(props);
        this.state = {data: this.props.data, crossfilter: this.props.cxt}
        
    }

    configuration(){
        var chartRender = new Chart(this.refs.canvas.getContext("2d"), {
            type: this.props.type,
            data: this.props.data,
            options: this.props.options
        });
        return chartRender;
    }

    update(){
        this.props.eventEmitted();
        this.state.chart.update();
    }

    clickHandler(event){
        const chart = this.state.chart
        var activePoints = chart.getElementsAtEvent(event);
        if(activePoints > 1){
        var clickedElementindex = activePoints[0]["_index"];
        console.log(clickedElementindex)
        var label = chart.data.labels[clickedElementindex];
        console.log(label)
        var value = chart.data.datasets[0].data[clickedElementindex];
        console.log(value);}
    }

    render() {
        console.log("re-rendering")
        return (
            <div>
                <canvas ref="canvas" onClick={this.clickHandler.bind(this)}/>
            </div>
        );
    }
}

export default ChartTemplate;
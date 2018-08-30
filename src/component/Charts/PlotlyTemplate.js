import React from 'react';
// import * as d3 from "d3";
import * as cf from "crossfilter";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-basic-dist';
// import * as dc from 'react-chartjs-2';
import * as chartjs from "chart.js";
const PlotlyComponent = createPlotlyComponent(Plotly);
class ChartTemplate extends React.Component {


    constructor(props) {
        super(props);
        this.state = { data: this.props.data, layout: this.props.layout , crossfilter: this.props.cxt }
    }


    update() {
        this.props.eventEmitted();
        this.state.chart.update();
    }

    clickHandler(event) {
        const chart = this.state.chart
        var activePoints = chart.getElementsAtEvent(event);
        if (activePoints > 1) {
            var clickedElementindex = activePoints[0]["_index"];
            console.log(clickedElementindex)
            var label = chart.data.labels[clickedElementindex];
            console.log(label)
            var value = chart.data.datasets[0].data[clickedElementindex];
            console.log(value);
        }
    }

    render() {
        console.log("re-rendering")
        return (
                <PlotlyComponent data={this.state.data} layout={this.state.layout} />
        );
    }
}

export default ChartTemplate;
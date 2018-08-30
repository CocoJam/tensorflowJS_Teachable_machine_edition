import React from 'react';
import * as cf from "crossfilter";
import Plotly from 'plotly.js-basic-dist';
import * as chartjs from "chart.js";
import ChartTemplate from "./ChartTemplate";


const colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

const highlights = ["#1f88c5", "#aed8e9", "#ff8f3f", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

class Scatter extends React.Component {
    constructor(props) {
        super(props);
        var data = this.parser(this.props.cxt, this.props.type);
        console.log(data);
        data = {
            datasets: [{
                label: "Data",
                data
            }]
        }
        const options = {
            title:{
               display:true,
               text: this.props.type[0] +" verus " +this.props.type[1]
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {labelString: this.props.type[0], display: true},
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {labelString: this.props.type[1], display: true},
                    
                }]

            }
        }
        this.state = { data:data, cxt: this.props.cxt, type: this.props.type, options: options }
    }

    parser(cxt, type) {
        console.log(type)
        const parsedData = cxt.allFiltered().map(val => { return { x: val[type[0]], y: val[type[1]] } })
        return parsedData;
    }



    createDimension(cxt, type) {
        return cxt.dimension(function (fact) { return fact[type]; })
    }

    createFilter(cxt, filter) {
        const filterConstru = this.createDimension(cxt, filter.type);
        filterConstru.filter(function (fact) { return fact[filter.thing] || filter.thing });
        return filterConstru;
    }

    clickHandler(event) {
        console.log(event);
    }


    render() {
        console.log("pie-rendering")
        return (
            <ChartTemplate cxt={this.state.cxt} type='scatter' data={this.state.data} options={this.state.options} />
        );
    }
}

export default Scatter;
import React from 'react';
// import * as d3 from "d3";
import * as cf from "crossfilter";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-basic-dist';
// import * as dc from 'react-chartjs-2';
import * as chartjs from "chart.js";
import ChartTemplate from "./ChartTemplate";
import PlotlyTemplate from "./PlotlyTemplate";
const PlotlyComponent = createPlotlyComponent(Plotly);

const colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

const highlights = ["#1f88c5", "#aed8e9", "#ff8f3f", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

class Pie extends React.Component {
    constructor(props) {
        super(props);
        const data = this.dataConstruc(this.props.cxt, this.props.type)
        console.log(data)
        this.state = { cxt: this.props.cxt, data: data }
    }


    dataConstruc(cxt, type) {
        console.log(type)
        const num = 1 / Math.ceil(Math.sqrt(type.length))
        var x = [];
        var y = [];
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                x.push([j * num, (j + 1) * num])
                y.push([i * num, (i + 1) * num])
            }
        }
        return type.map(val => {
            var data = this.parser(cxt, Object.values(val));
            data = data.all()
            // console.log(dat)
            const pairs = Object.values(data)
            const value = pairs.map(val => val.value);
            const keys = pairs.map(val => val.key);
            data =
                {
                    values: value,
                    labels: keys,
                    type: "pie",
                    domain: {
                        x: x.pop(),
                        y: y.pop()
                    }
                };
            return data
        })
    }

    parser(cxt, type) {
        const dimension = this.createDimension(cxt, type);
        const filtered = dimension.group().reduceCount()
        window.filter = filtered
        return filtered;
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
            <PlotlyTemplate data={this.state.data} />
        );
    }
}

export default Pie;
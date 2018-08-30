import React from 'react';
import * as cf from "crossfilter";
import ChartTemplate from "./ChartTemplate";
// import cvworker from "../../index";

const colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

const highlights = ["#1f88c5", "#aed8e9", "#ff8f3f", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94"];

class Pie extends React.Component {
    constructor(props) {
        super(props);
        const dimension =this.createDimension(this.props.cxt , this.props.type);
        var data = dimension.group().reduceCount()
        data = data.all()
        const pairs = Object.values(data)
        const value = pairs.map(val=>val.value);
        const keys = pairs.map(val=>val.key);
        data = 
        {
            datasets: [{
                data: value
            }],
            labels: keys,
            backgroundColor: colors,
            highlights: highlights
        };
        const options= {
            onClick: this.clickHandler.bind(this)
        }
        this.state={cxt: this.props.cxt, type: this.props.type , options: options , data: data , dimension: dimension}
    }

    parser(cxt,type){
        const dimension =this.createDimension(cxt , type);
        const filtered = dimension.group().reduceCount()
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

    clickHandler(event){
        return event;
    }


    render() {
        
        return(
               <ChartTemplate type='pie' cxt={this.state.cxt} action={this.clickHandler.bind(this)} data={this.state.data} dimension={this.state.dimension} options={this.state.options} /> 
        );
    }
}

export default Pie;
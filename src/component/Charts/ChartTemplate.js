import React from 'react';


class ChartTemplate extends React.Component {

    componentDidMount() {
        const chart = this.configuration();
        this.setState({ ...this.state, chart: chart });
    }

    constructor(props) {
        super(props);
        // console.log(props)
        this.props.cxt.onChange(eventType => this.update());
        this.state = { data: this.props.data, cxt: this.props.cxt , dimension:this.props.dimension }
    }

    configuration() {
        var chartRender = new Chart(this.refs.canvas.getContext("2d"), {
            type: this.props.type,
            data: this.props.data,
            options: this.props.options
        });
        return chartRender;
    }

    update() {
        // console.log("Chart update")
        this.state.chart.update();
    }

    clickHandler(event) {
        const chart = this.state.chart
        var activePoints = chart.getElementAtEvent(event);
        // console.log(activePoints)
        if (activePoints.length > 0) {
            var clickedElementindex = activePoints[0]["_index"];
            console.log(clickedElementindex)
            var label = chart.data.labels[clickedElementindex];
            console.log(label)
            var value = chart.data.datasets[0].data[clickedElementindex];
            console.log(value);
            if(this.state.dimension !== undefined){
                
            }
        }
    }

    render() {
        console.log("re-rendering")
        return (
            <canvas ref="canvas" onClick={this.clickHandler.bind(this)} />
        );
    }
}

export default ChartTemplate;
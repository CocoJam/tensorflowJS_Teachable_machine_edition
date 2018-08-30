import React from 'react';
import {isNumeric} from "../FileHandler/FileReader";
import LogisticRegression from "./LogisticRegression";

class ModelContainer extends React.Component {
    constructor(props) {
        super(props)
        const labels = this.props.head.filter(val => !isNumeric(val))
        const regression = this.props.head.filter(val => isNumeric(val))
        this.state = {labels: labels, regression: regression , cxt: this.props.cxt} 
        
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <LogisticRegression labels={this.state.labels} />
            </div>
        );
    }

}

export default ModelContainer;
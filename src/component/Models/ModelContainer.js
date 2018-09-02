import React from 'react';
import { isNumeric } from "../FileHandler/FileReader";
import SVM from "./SVM"
import Rtree from "./RandomForest"
import Btree from "./BoostingTree"
import KNN from "./KNN"
import NormalBayes from "./NormalBayesClassifier";

class ModelContainer extends React.Component {
    constructor(props) {
        super(props)
        // const encoderedHeaders ={};
        const label = []
        const Regression = []
        this.props.head.map(val => {
            if (!isNumeric(val)) {
                label.push(Object.keys(val)[0])
            } else {
                Regression.push(Object.keys(val)[0])
            }
        })

        // const labels = this.props.head.filter(val => !isNumeric(val))
        // const regression = this.props.head.filter(val => isNumeric(val))
        this.state = { label: label, regression: Regression, cxt: this.props.cxt }
        console.log(this.state)
    }
    render() {
        return (
            <div>
                {/* <LogisticRegression labels={this.state.labels} /> */}
                <SVM label={this.state.label} regression={this.state.regression} />
                <Rtree label={this.state.label} regression={this.state.regression} />
                <Btree label={this.state.label} regression={this.state.regression} />
                <KNN label={this.state.label} regression={this.state.regression} />
                <NormalBayes label={this.state.label} regression={this.state.regression} />
            </div>
        );
    }

}

export default ModelContainer;
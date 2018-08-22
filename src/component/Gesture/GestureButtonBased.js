import React from "react";
import Button from '@material-ui/core/Button';
class GestureButtonBase extends React.Component{
    constructor(props){
        super(props)
    }

    clickHandle=(event)=>{
        event()
        console.log(event)
    }

    render(){
        return(
            <Button variant="contained" color="secondary" onClick={this.clickHandle.bind(this,this.props.action)}>
            {this.props.buttonName}
            {this.props.buttonTag}
          </Button>
        )
    }
}
export default GestureButtonBase;
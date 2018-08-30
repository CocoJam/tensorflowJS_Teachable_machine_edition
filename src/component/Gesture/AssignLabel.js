import React from "react";
import GestureButtonBase from "./GestureButtonBased"
import Button from '@material-ui/core/Button';
import NoteAdd from "@material-ui/icons/NoteAdd";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class AssignLabel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { sampling: false }
        // this.addEventListener("onMouseDown", this.mouseDown)
    }

    clickHandle = (event) => {
        // if (!this.state.sampling) {
        //     this.setState({ sampling: true })
            event();
        // } else {
            // this.setState({ sampling: false })
        // }
    }

    mouseDown = (event) => {
        console.log("down");
    }

    render() {
        return (
            // <div onMouseDown={this.mouseDown}>
            <GestureButtonBase onMouseDown={this.mouseDown} ref="button" action={this.clickHandle.bind(this, this.props.action)} buttonName="Adding Labels" buttonTag={<NoteAdd />} />
            // </div>
        )
    }
}
export default AssignLabel;
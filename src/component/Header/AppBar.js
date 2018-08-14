import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { GlobalConsumer, TabNum } from '../../context/GlobalContext';
import { AppContext } from '../container';
// import { Tab } from 'material-ui';
// import { ThemeContext } from "../../context/theme_context";
class AppTitleBar extends React.Component {

    constructor(props) {
        console.log("Appbar")
        console.log(GlobalConsumer)
        super(props);
        this.state = { open: false };
    }

    handleTitleClick(event) {
        console.log(event)
    }

    handleLeftIconButtonClick = () =>
        this.setState({ open: !this.state.open });

    handleClose = (event) => {
        // TabContext.Consumer._currentValue.CurrentTabSelection(event);
        // console.log(TabContext.Consumer._currentValue.CurrentTabSelection)
        // console.log(AppContext.Consumer);
        // AppContext.Consumer._currentValue.CurrentTabSelection(event)
        // AppContext.Consumer.
        //     console.log("Comsumer mark")
        // <GlobalConsumer>
        //     {({ states, CurrentTabSelection }) => {
        //         console.log("Consuming");
        //         CurrentTabSelection(TabNum.CSV);
        //     }}
        // </GlobalConsumer>
        GlobalConsumer.Consumer._currentValue.CurrentTabSelection(event)
        console.log(event);
        console.log(GlobalConsumer.Consumer._currentValue.CurrentTabSelection);
        this.setState({ open: false });
    }

    render() {
        // console.log(AppContext.Consumer)
        return (

            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onTitleClick={this.handleTitleClick}
                    onLeftIconButtonClick={this.handleLeftIconButtonClick}
                />
                <Drawer open={this.state.open}
                    docked={false}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem onClick={this.handleClose.bind(this, TabNum.CSV)}>Menu Item 1</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, TabNum.Video)}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default AppTitleBar
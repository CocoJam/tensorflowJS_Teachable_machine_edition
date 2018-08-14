import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from "./Header/AppBar";
import { GlobalProvider, GlobalContext} from "../context/GlobalContext";

class Container extends React.Component{
    
    constructor(props){
        super(props);
        // this.CurrentTabSelection= (TabNum)=>{
        //     this.setState({...this.state,TabNum})
        // }
        this.state = GlobalContext;
    }

    
    render(){
        // console.log(TabContext)
        console.log(this.state)
        return(<MuiThemeProvider>
            <GlobalProvider>
           <div>
               <AppBar />
           </div>
           </GlobalProvider>
       </MuiThemeProvider>)
    }
}

export default Container
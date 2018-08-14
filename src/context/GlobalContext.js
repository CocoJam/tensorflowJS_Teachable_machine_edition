import React from 'react';

export const TabNum = {
  CSV: 1,
  Video: 2,
  Photo: 3
}

export const GlobalContext = React.createContext(
  {
    TabNum: TabNum.CSV,
    CurrentTabSelection: (num) => {console.log(num) }
  }
);
export const GlobalConsumer = GlobalContext.Consumer;

export class GlobalProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TabNum: TabNum.CSV
    }
  }
  CurrentTabSelection = (num) => {
    console.log("Global")
    this.setState({ TabNum: num });
  }
  render() {
    return (<GlobalContext.Provider 
    value={{ states: this.state,
     CurrentTabSelection: this.CurrentTabSelection }}>
     {this.props.children}
     </GlobalContext.Provider>)
  }
}
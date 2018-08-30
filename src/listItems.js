import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class MainListItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  handleClick = (event) => {
    console.log(event)
    console.log(event)
  }
  render() {
    return (
      <List>
        <div>
          {this.props.listItem.map((item, i)=>{
           return (<ListItem button onClick={this.handleClick} key={i}>
                 <ListItemIcon>
                   <item.icon/>
                 </ListItemIcon>
                 <ListItemText primary={item.text} />
               </ListItem>)
          })}
        </div>
      </List>
    )
  }
}
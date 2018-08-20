import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideoCam from "@material-ui/icons/VideoCam";
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import NoteAdd from "@material-ui/icons/NoteAdd"

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



// export const mainListItems = (
//   <div>
//     <ListItem button onClick={handleClick}>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//       {/* <input id="upload" type="file" multiple/> */}
//         <NoteAdd />
//       </ListItemIcon>
//       <ListItemText primary="Upload" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <VideoCam />
//       </ListItemIcon>
//       <ListItemText primary="Video" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Integrations" />
//     </ListItem>
//   </div>
// );

// export const secondaryListItems = (
//   <div>
//     <ListSubheader>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
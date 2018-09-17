import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItem from './listItems';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import VideoCam from "@material-ui/icons/VideoCam";
import NoteAdd from "@material-ui/icons/NoteAdd"
import LinearProgress from '@material-ui/core/LinearProgress';
import VideoCamHandler from "./component/VideoCamHandler"

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});
function listItemsParser(iconElement, text) {
  return { icon: iconElement, text: text }
}

const listItems = [listItemsParser(DashboardIcon, "DashBoard"),
listItemsParser(NoteAdd, "Upload"),
listItemsParser(VideoCam, "Video Input"),
listItemsParser(BarChartIcon, "Bar charts")]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, wasm: null, cvReady: false };
    console.log(listItems)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleCVEvent = (event) => {
    console.log(event)
    this.setState({ ...this.state, cvReady: true })
  }

  componentDidMount() {
    window.addEventListener('cv', this.handleCVEvent.bind(this));
  }

  render() {
    const { classes } = this.props;
    var linearChart = null;
    if (this.state.cvReady) {
      linearChart = <LinearProgress color="secondary" variant="buffer" value={100} valueBuffer={10} />
    }
    else {
      linearChart = <LinearProgress color="secondary" />
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Dashboard
              </Typography>
            </Toolbar>
            {linearChart}
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <MainListItem listItem={listItems} />
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />

            <Typography component="div" className={classes.chartContainer}>
            </Typography>
            <div className={classes.tableContainer}>
              <VideoCamHandler height={500} width={500} />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Dashboard);

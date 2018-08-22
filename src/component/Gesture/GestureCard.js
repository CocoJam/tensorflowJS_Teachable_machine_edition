import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from "react";

class GestureCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: this.props.title, label: this.props.label, actionSet: this.props.actionSet }
    }

    textChange=(event)=>{
        this.setState({...this.state, label: event.target.value})
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        <div>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField onChange={this.textChange} id="input-with-icon-grid" label={this.state.title}>
                                    {this.state.label}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                    <Typography component="p">
                        {this.state.actionSet.map(val => val)}
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.props.record}>Learn More</Button>
                </CardActions>
            </Card>
        )
    }

}

export default GestureCard
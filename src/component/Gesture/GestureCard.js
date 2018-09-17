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
        this.state = { title: this.props.title, audioChucks: [], audio: null, audioMediaStreamDestination: this.props.audioMediaStreamDestination, label: this.props.label, actionSet: this.props.actionSet }
    }

    componentDidMount = () => {
        if (this.state.audioMediaStreamDestination) {
            var mediaRecorder = new MediaRecorder(this.state.audioMediaStreamDestination.stream);
            mediaRecorder.ondataavailable = (evt) => {
                this.state.audioChucks.push(evt.data);
            };
            mediaRecorder.onstop = (evt) => {
                var blob = new Blob(this.state.audioChucks, { 'type': 'audio/ogg; codecs=opus' });
                this.refs.audio.src = URL.createObjectURL(blob);
                this.setState({ ...this.state, audio: this.refs.audio })
            };
            this.setState({ ...this.state, audioMediaRecorder: mediaRecorder })
        }
    }

    textChange = (event) => {
        this.setState({ ...this.state, label: event.target.value })
    }

    audioRecording = (event) => {
        console.log(this.state.audioMediaRecorder)
        if (this.state.audioMediaRecorder.state === "inactive") {
            this.state.audioMediaRecorder.start()
        } else if (this.state.audioMediaRecorder.state === "recording") {
            this.state.audioMediaRecorder.stop()
        }
        console.log(this.state.audioMediaRecorder)
    }

    render() {
        var audioRecordingState = "";
        if (this.state.audioMediaRecorder !== undefined && this.state.audioMediaRecorder.state === "recording") {
            // this.state.audioMediaRecorder.start()
            audioRecordingState = "Stop"
        } else if (this.state.audioMediaRecorder !== undefined && this.state.audioMediaRecorder.state === "inactive") {
            // this.state.audioMediaRecorder.stop()
            audioRecordingState = "Start"
        }
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
                        <audio controls ref="audio" />
                        <Button onClick={this.audioRecording}>{audioRecordingState}</Button>
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
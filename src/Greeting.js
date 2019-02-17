import React from 'react';
import { Button, Grid, Paper, Typography, TextField } from '@material-ui/core';
import SendMessage from "./SendMessage";
class Greeting extends React.Component {

  constructor() {
    super();
    this.state = { value: '',isButtonDisabled: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFormSubmit(event) {
    console.log('pressed')
    event.preventDefault();
    this.setState({
      isButtonDisabled: true
    });
    const messageService = new SendMessage();
    messageService.sendMesg(this.state.value);

  }

  renderForm() {
    return (
      <Paper>
        <form
          onSubmit={this.handleFormSubmit}>
                  <Typography align="center" variant="h6" component="h4">
            This is the Spaceforce Messaging Service
          </Typography>
                  
                  <Typography component="ul">

            <li><a href="https://metamask.io/">Metamask</a> Required</li>
            <li><a href="https://blockstream.com/satellite-api/">Blockstream Satellite</a> will broadcast your message</li>
            <li>Price: 1 MESG token</li>
          </Typography>
          <TextField type="text" value={this.state.value}
            required
            variant="filled"
            margin="normal"
            label="Message"
            style={{ margin: 8 }}
            fullWidth
            onChange={this.handleMessageChange}
            placeholder="Enter your message here.." />

          <Button style={{ margin: 8 }} 
          onClick={this.handleFormSubmit}
          center='true' 
          variant="contained" 
          disabled={this.state.isButtonDisabled}
          color="primary">
            Send Message!</Button>
        </form>
      </Paper>
    );
  }

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column" justify="center" alignItems="center">
        <h3 color="white">Send a Message from space with MESG!</h3>  
        <img alt="Live view of the blockstream satellite" src={require('./sat1.gif')} />
        {this.renderForm()}
      </Grid>
    )
  }
};

export default Greeting;
import React from 'react';
import { Button, Grid, Paper, Typography, TextField } from '@material-ui/core';
import SendMessage from "./SendMessage";
import Typing, {Speed } from 'react-typing-animation';
class Greeting extends React.Component {

  constructor() {
    super();
    this.state = { value: 'We\'re going to the Moon!' , isButtonDisabled: false, hasSubmitted: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFormSubmit(event) {
    console.log('Form Submit Pressed')
    event.preventDefault();
    this.setState({
      isButtonDisabled: true
    });
    const messageService = new SendMessage();
    const callBack = () => {
      console.log('CallBack successfull')
      this.setState({
      hasSubmitted: true
    });}
    messageService.sendMesg(this.state.value,callBack);//TODO: REMOVE
    
  }
//  TODO: Leverage Pusher to fetch REAL data instead
//  https://github.com/Roms1383/mesg-pusher
  renderPostSubmitOutput() {
    return (
      <Paper>
        <Typing speed={25}>
          <Typography align="center" variant="h6" component="h4">
          <span role="img">📡</span> Receiving Data <span role="img">📡</span>
          </Typography>
          <Speed ms={25} />
          <pre>Webhook Message received: [object Object]</pre><Speed ms={50} /> <pre>...</pre><Speed ms={50} />
          <pre>Waiting for Block to confirm</pre><Speed ms={50} /> <pre>...</pre><Speed ms={50} />
          <pre>ERC20 payment received, will send message to blockstream.</pre><Speed ms={50} /> <pre>...</pre><Speed ms={50} />
          <pre>Lightning Invoice generated detected</pre><Speed ms={50} /> <pre>...</pre><Speed ms={50} />
          <pre>Invoice Paid Successfully, Message sent from space!</pre><Speed ms={50} /> <pre>...</pre><Speed ms={50} />
          <a href="https://blockstream.com/satellite-queue/">View blockstream transmission logs</a><Speed ms={500} /> <pre>...</pre>
        </Typing>
      </Paper>)
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

  decideWhatToRender(submitted) {
    return (!submitted) ? this.renderForm() : this.renderPostSubmitOutput()
  }
  render() {
    const SuccessOutput = () => {
      return (
        <Paper>
          <Typing speed={500}>
            <Typography align="center" variant="h6" component="h4">
            <span role="img">📡</span> Receiving Data <span role="img">📡</span>
            </Typography>
            <Speed ms={800} />
            <pre>Webhook Message received: [object Object]</pre><Speed ms={600} /> <pre>...</pre><Speed ms={800} />
            <pre>Waiting for Block to confirm</pre><Speed ms={250} /> <pre>...</pre><Speed ms={800} />
            <pre>Recieved Payment</pre><Speed ms={250} /> <pre>...</pre><Speed ms={20} />
            <pre>New ERC20 transfer payment received, will send message to blockstream.</pre><Speed ms={250} /> <pre>...</pre><Speed ms={20} />
            <pre>Invoice generated detected</pre><Speed ms={250} /> <pre>...</pre><Speed ms={20} />
            <pre>Invoice Paid Successfully, Message sent from space!</pre><Speed ms={250} /> <pre>...</pre><Speed ms={20} />
            <link href="https://blockstream.com/satellite-queue/" value="Check here to view blockstream transmission logs"></link><Speed ms={250} /> <pre>...</pre><Speed ms={20} />
          </Typing>
        </Paper>)
    }
    return (
      <Grid
        container
        spacing={0}
        direction="column" justify="center" alignItems="center">
        <h3 color="white">Send a Message from space with MESG!</h3>
        <img alt="Live view of the blockstream satellite" src={require('./sat1.gif')} />
        {this.decideWhatToRender(this.state.hasSubmitted)}
        {/* {this.renderForm()} */}
        {/* <SuccessOutput hasSubmitted={this.state.hasSubmitted}/> */}
      </Grid>
    )
  }
};

export default Greeting;
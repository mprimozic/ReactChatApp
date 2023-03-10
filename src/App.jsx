import { Component } from 'react';
import Messages from './components/Messages';
import Input from './fragments/Input';
import './App.css';

const randomName = () => {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
      id: undefined
    }
  }

  constructor() {
    super();
    // create new instance of Scaledrone and pass the data for the current member
    this.drone = new window.Scaledrone('gNdGi4qjNoU16qWT', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const {member} = this.state;
      member.id = this.drone.clientId;
      this.setState({member: member});
    });
    // subscribe to the room named "observable-room"
    const room = this.drone.subscribe('observable-room');
    // subscribe to the "data" event on the room
    // data event's second argument defines which user sent the message
    room.on('data', (message, member) => {
      const {messages} = this.state;
      messages.push({
        text: message, 
        member: member});
      this.setState({messages});
    })
  }

  render() {
    const {messages, member} = this.state;
    return(
      <div className='App'>
        <Messages messages={messages} currentUser={member}/>
        <Input handleSubmit={this.onSendMessage}/>
      </div>
    );
  }

  onSendMessage = (message) => {
    // publish a new message to all the other users in the room
    this.drone.publish({
      room: 'observable-room',
      message: message
    });
  }
}
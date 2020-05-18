import React ,{Component}from 'react';
import './App.css';
import Particles from 'react-particles-js';
import ImageLinkForm from'./components/imageLinkForm';
import copy from "copy-to-clipboard";

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }}
}

class App extends Component {
     constructor() {
    super();
    this.state = {
        route:"url",
        url:"",
        short:"",
        btnText:"copy short url"
    }}

    copyCodeToClipboard = () => {
    copy(this.state.short);
    this.setState({ btnText: "Copied! url" });
  }
    
    onUrlChange = (event) => {
    this.setState({url: event.target.value});
     }
    onRouteChange=(route)=>{
        this.setState({route:route});
    }

    onSubmit=()=>{
         fetch('https://5000-a3e043ef-477c-4318-a5ff-d2d6256be7b3.ws-us02.gitpod.io/api/url/shorten', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        longUrl: this.state.url
      })
    })
      .then(response => response.json())
      .then(url => {
        if (url.shortUrl) {
          this.setState({short:url.shortUrl})
          this.onRouteChange('shortUrl')
          console.log(this.state.short)
        }
      })
      .catch(err=>{
          console.log(err)
      });
    }

render(){
  return (
    <div className="App">
     <Particles className='particles'
          params={particlesOptions}
        />
        {this.state.route==='url'?<ImageLinkForm shorturl={this.state.short}onChange={this.onUrlChange} onSubmit={this.onSubmit} />:<button onClick={() => this.copyCodeToClipboard()}>
            {this.state.btnText}
          </button>
        }
        <p>{this.state.short}</p>
        
   
</div>
  );
   } }

export default App;

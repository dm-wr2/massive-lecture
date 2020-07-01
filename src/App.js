import React from 'react';
import axios from 'axios';
import AvengerDisplay from './Components/AvengerDisplay';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      avengers: [],
      nameInput: '',
      superInput: '',
      addView: false
    }
  }

  componentDidMount(){
    this.getAvengers();
  }
  
  getAvengers = () => {    
    axios.get('/api/avengers')
    .then(res => this.setState({avengers: res.data}))
    .catch(err => console.log(err))
  }

  addAvenger = () => {
    axios.post('/api/avenger', {name: this.state.nameInput, superPower: this.state.superInput})
    .then(() => this.getAvengers())
    .catch(err => console.log(err))
  }

  toggleView = () => {
    this.setState({addView: !this.state.addView})
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return (
      <div className="App">
        <h1>Avengers Assemble</h1>
        <button onClick={this.toggleView}>Add Avenger</button>
        <div className='avenger-flex'>
          {this.state.avengers.map(avenger => (
            <AvengerDisplay key={avenger.avenger_id} avenger={avenger} avengerFn={this.getAvengers}/>
          ))}
        </div>
        {this.state.addView
        ? (
          <div className='modal-backdrop'>
            <section className='add-modal'>
              <h1>Add Avenger</h1>
              <input 
                name='nameInput' 
                value={this.state.nameInput} 
                placeholder='Name'
                onChange={e => this.handleInput(e)}/>
              <input 
                name='superInput' 
                value={this.state.superInput} 
                placeholder='Super Power'
                onChange={e => this.handleInput(e)}/>
              <button onClick={this.addAvenger}>Add</button>
              <button onClick={this.toggleView}>Cancel</button>
            </section>
          </div>
        )
        : null}
      </div>
    )
  }
}

export default App;

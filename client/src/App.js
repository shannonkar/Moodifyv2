import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Tracks from './Components/Tracks';
import Footer from './Components/Footer';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      isLoggedIn: false
    }
  }
  handleLogin=async() => {
      const response = await fetch('http://localhost:8888/auth/spotify');
      const data = await response.json();
      console.log(data)

  }
  handleLogout=()=> {
    console.log('log out')
  }
  render() {
    return (
      <div className="App">
       <Navbar handleLogin = {this.handleLogin} handleLogout={this.handleLogout}/>
       <Header/>
       <Tracks />
       <Footer />
      </div>
    );
  }

}

export default App;

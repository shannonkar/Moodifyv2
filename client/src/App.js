import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Tracks from './Components/Tracks';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Header/>
     <Tracks />
     <Footer />
    </div>
  );
}

export default App;

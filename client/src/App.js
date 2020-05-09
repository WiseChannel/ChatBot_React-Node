import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom'

//import components
import './App.css';
import Header from './components/pages/Header'
import Landing from './components/pages/Landing'
import About from './components/pages/About'
import Shop from './components/shop/Shop'
import ChatBot from './components/chatbot/ChatBot'

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route path='/about' component={About} />
          <Route path='/shop' component={Shop} />
          <ChatBot />
        </div>
      </Router>
    </div>
  );
}

export default App;

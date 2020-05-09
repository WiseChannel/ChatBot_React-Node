import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom'

//import component
import './App.css';
import Header from './component/pages/Header'
import Landing from './component/pages/Landing'
import About from './component/pages/About'
import Shop from './component/shop/Shop'
import ChatBot from './component/chatbot/ChatBot'

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className='container'>
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

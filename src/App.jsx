import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/home'
import About from './containers/about'
import Glossary from './containers/glossary'

import Header from './components/Header'

import './App.scss'

const App = () => {
  return (
    <div className="App" style={{height: '100%', background: 'url(turtles2.webp) no-repeat center center'}}>
      <Header />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/glossary" component={Glossary} />
      </BrowserRouter>
    </div>
  )
}

export default App

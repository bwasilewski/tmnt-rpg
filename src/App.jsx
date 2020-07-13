import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/home'
import About from './containers/about'
import Glossary from './containers/glossary'
import Admin from './containers/admin'
import Animals from './containers/animals'
import Rules from './containers/rules'

import Header from './components/Header'

import './App.scss'

const appStyles = {
  height: '100%',
  // background: 'url(turtles2.webp) no-repeat center center'
}

const App = () => {
  return (
    <div className="App" style={appStyles}>
      <Header />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/glossary" component={Glossary} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/animals" component={Animals} />
        <Route exact path="/rules" component={Rules} />
      </BrowserRouter>
    </div>
  )
}

export default App

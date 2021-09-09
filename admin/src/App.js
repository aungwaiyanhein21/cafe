import React from 'react';
import './css/App.css';

import {Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';

import ModalRoot from './modals/components/ModalRoot';
import ModalService from './modals/services/ModalService';
import TestModal from './components/TestModal';

function App() {
  // const addModal = () => {
  //   ModalService.open(TestModal);
  // };

  return (
    <div className="container">
      {/* <ModalRoot />
      <button onClick={addModal}>Open Modal</button> */}

      {/* <Header /> */}


      <Switch>
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

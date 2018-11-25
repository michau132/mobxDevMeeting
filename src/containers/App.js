import React, { Component, Fragment } from 'react';
import {Provider} from 'mobx-react';
import { configure } from 'mobx';
import DevTools from 'mobx-react-devtools';
import ProductList from '../components/ProductList';
import stores from '../stores';
import Basket from '../components/Basket';
import './App.css';


// ustawienie strict mode, chodzi o to ze mozemy tlyko i wylacznie uzywac akcji na storze, 
// bo jesli uzyjemy tego na akcji to spowoduje to blad
configure({ enforceActions: 'always' });

class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider {...stores}>
        <div className="app">
          <ProductList />
          <Basket />
        </div>
        </Provider>
        <DevTools />
      </Fragment>
    );
  }
}

export default App;

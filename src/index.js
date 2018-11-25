import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'
import { configure } from 'mobx';

configure({ enforceActions: 'observed' });

ReactDom.render(<App />, document.getElementById('root'))

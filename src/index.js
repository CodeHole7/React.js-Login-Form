import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AuthDialog from './dialog/authDialog';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AuthDialog />, document.getElementById('root'));

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './component/container';
import Dash from "./Dash"
const title = 'My Minimal React Webpack Babel Setupasdasdf';


ReactDOM.render(
  <div><Dash/></div>,
  document.getElementById('app')
);

module.hot.accept();
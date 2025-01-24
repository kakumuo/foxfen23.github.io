import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.documentElement.onscroll = (ev) => {
  ev.preventDefault()
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
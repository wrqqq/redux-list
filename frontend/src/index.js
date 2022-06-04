import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/components/App/App'
import { store } from './app/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

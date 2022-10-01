import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import universitiesState from './universitiesState';

const store = configureStore({
    reducer: {
        universities: universitiesState,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
)

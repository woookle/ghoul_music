import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import "./styles/css/main.css";
import 'animate.css/animate.css'
import { BrowserRouter } from 'react-router-dom';
import { checkAuth } from './api/artistAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <App />;
};


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
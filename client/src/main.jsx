import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/Store.jsx';
import { Provider } from 'react-redux';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(

  <StrictMode>
    <Provider store={store}>

      <App />
      
    </Provider>
  </StrictMode>


  
);
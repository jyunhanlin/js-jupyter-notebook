import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CellList from './components/CellList';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { store } from './state';

ReactDOM.render(
  <ChakraProvider>
    <Global
      styles={{
        body: {
          backgroundColor: '#2D3748',
        },
      }}
    />
    <Provider store={store}>
      <CellList />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

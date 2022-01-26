import React  from 'react';
import ToDo from './containers/todo/todo';
import Title from './components/title/title';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { save } from 'redux-localstorage-simple';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(save({ namespace: 'todo-list' }))))


const App = () => (
  <Provider store={store}>
    <Title title="ToDo App" />
    <ToDo />
  </Provider>
);

export default App;

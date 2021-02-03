import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './ApplicationReducer';
import { Route, Switch } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Gallery from './pages/Gallery/Gallery';
import Landing from './pages/Landing/Landing';
import { Component } from 'react';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/gallery" exact component={Gallery}></Route>
          <Route path="/catalog" exact component={Catalog}></Route>
        </Switch>
      </Provider>
    );
  }
}

export default App;

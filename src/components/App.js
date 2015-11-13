import React from 'react';
import { Router, Route } from 'react-router';
import { falcorStore } from 'stores/index';
import * as views from 'views';

const {
  HomeView
  } = views;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      falcor: falcorStore.get()
    };
  }

  componentDidMount() {
    falcorStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    falcorStore.removeChangeListener(this._onChange);
  }

  _onChange() {
  }

  render() {
    return (
      <Router>
        <Route path='/' component={HomeView} />
      </Router>
    );
  }
}

export default App;

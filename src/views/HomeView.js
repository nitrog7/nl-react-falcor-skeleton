import React from 'react';
import { falcorStore } from 'stores/index';
//import { falcorActions } from 'actions/index';
import DemoButton from 'components/DemoButton';

export class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('HomeView::componentWillMount::state', this.state);
  }

  componentDidMount() {
    console.log('HomeView::componentDidMount');
  }

  componentDidUpdate() {
    console.log('HomeView::componentDidUpdate');
  }

  render() {
    falcorStore.get(['greeting']).then(results => console.log('results', results));
    return (
      <div className='container text-center'>
        <h1>NL React Falcor Skeleton</h1>
        <DemoButton/>
      </div>
    );
  }
}

export default HomeView;

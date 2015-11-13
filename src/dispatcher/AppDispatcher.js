import { Dispatcher } from 'flux';

let AppDispatcher = new Dispatcher();

AppDispatcher.handleFalcorAction = function(action) {
  this.dispatch({
    source: 'FALCOR_ACTION',
    action: action
  });
};

export default AppDispatcher;

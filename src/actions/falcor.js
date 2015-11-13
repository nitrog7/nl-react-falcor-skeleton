import AppDispatcher from '../dispatcher/AppDispatcher';
import falcorConstants from '../constants/falcor';

let falcorActions = {
  getValue: function(path) {
    AppDispatcher.handleFalcorAction({
      actionType: falcorConstants.FALCOR_GET_VALUE,
      data: path
    });
  },
  get: function(...pathSet) {
    AppDispatcher.handleFalcorAction({
      actionType: falcorConstants.FALCOR_GET,
      data: pathSet
    });
  },
  setValue: function(path) {
    AppDispatcher.handleFalcorAction({
      actionType: falcorConstants.FALCOR_SET_VALUE,
      data: path
    });
  },
  set: function(...pathValue) {
    AppDispatcher.handleFalcorAction({
      actionType: falcorConstants.FALCOR_SET,
      data: pathValue
    });
  },
  call: function(path, arg, ref, thisPath) {
    AppDispatcher.handleFalcorAction({
      actionType: falcorConstants.FALCOR_CALL,
      data: [path, arg, ref, thisPath]
    });
  }
};

export default falcorActions;

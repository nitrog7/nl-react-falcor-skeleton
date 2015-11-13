import AppDispatcher from '../dispatcher/AppDispatcher';
import falcorConstants from '../constants/falcor';
import objectAssign from 'react/lib/Object.assign';
import EventEmitter from 'events';
import falcor from 'falcor';
import jsonGraph from 'falcor-json-graph';
import HttpDataSource from 'falcor-http-datasource';

let CHANGE_EVENT = 'change';

let _model = new falcor.Model({
  source: new HttpDataSource('/model.json')
});

let falcorStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getValue: path => {
    return _model.getValue(path);
  },
  get: (...pathSet) => {
    console.log('store::get::pathSet', pathSet);
    return _model.get(pathSet);
  },
  setValue: path => {
    return _model.setValue(path);
  },
  set: (...pathValue) => {
    return _model.set(pathValue);
  },
  call: (path, arg, ref, thisPath) => {
    return _model.call(path, arg, ref, thisPath);
  },
  createAtom: item => {
    return jsonGraph.atom(item);
  },
  createRef: item => {
    return jsonGraph.ref(item);
  },
  createError: item => {
    return jsonGraph.error(item);
  }
});

AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.actionType) {
    case falcorConstants.FALCOR_GET_VALUE:
      falcorStore.getValue(action.data);
      break;

    case falcorConstants.FALCOR_GET:
      falcorStore.get(action.data);
      break;

    case falcorConstants.FALCOR_SET_VALUE:
      falcorStore.setValue(action.data);
      falcorStore.emit(CHANGE_EVENT);
      break;

    case falcorConstants.FALCOR_SET:
      falcorStore.set(action.data);
      falcorStore.emit(CHANGE_EVENT);
      break;

    case falcorConstants.FALCOR_CALL:
      let args = action.data || [];
      falcorStore.call(args[0], args[1], args[2], args[3]);
      falcorStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default falcorStore;

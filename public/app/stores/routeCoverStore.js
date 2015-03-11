var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var routeCoverConst = require('../constants/commonConst.js').routeCover ;
var _ = require('lodash');

var state = {
  isCoverShown: false,
  isAnimating: false,
};

function start(data){
  // start animation
  state.isCoverShown = true;
}

function finish(data){
  state.isCoverShown = false ;
}

// Extend nav Store with EventEmitter to add eventing capabilities
var routeCoverStore = _.extend({}, EventEmitter.prototype, {

   getState: function(){
    return state
   },
   setState: function(key,value){
    state[key] == value;
   },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to routeCover action
    case routeCoverConst.START:
      start(action.data);
      break;
    case routeCoverConst.FINISH:
      finish(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  routeCoverStore.emitChange();

  return true;

});

module.exports = routeCoverStore;

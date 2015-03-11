var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var navConst = require('../constants/navConst.js');
var _ = require('lodash');

var state = {
  isNavOpen: false,
};

function toggleFunc(openOrCloseOrToggle){
  console.log('__openOrCloseOrToggle:',openOrCloseOrToggle)
  if( openOrCloseOrToggle == 'close'){
    state.isNavOpen = false;
  }else if (openOrCloseOrToggle == 'open'){
    state.isNavOpen = true;
  }else {
    // just toggle
    state.isNavOpen = !state.isNavOpen;
  }

  
}

// Extend nav Store with EventEmitter to add eventing capabilities
var navStore = _.extend({}, EventEmitter.prototype, {

  toggle:toggleFunc,

   getState: function(){
    return {
      isNavOpen: state.isNavOpen
    };
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

    // Respond to CART_ADD action
    case navConst.TOGGLE:
      toggleFunc(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  navStore.emitChange();

  return true;

});

module.exports = navStore;

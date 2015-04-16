var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var projectsConst = require('../constants/commonConst.js').projects ;
var _ = require('lodash');

// bad bad code......bare with me, cause back end is not done yet.......
window.gfShowProjectsGuid = true;

var state = {
  showGuide: window.gfShowProjectsGuid,
};

function toggleGuide(){
  state.showGuide = false;
}

// Extend nav Store with EventEmitter to add eventing capabilities
var projectsStore = _.extend({}, EventEmitter.prototype, {

  toggleGuide:toggleGuide,

   getState: function(){
    return state
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

  switch( action.actionType ) {

    // Respond to CART_ADD action
    case projectsConst.TOGGLEGUIDE:
      toggleGuide(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  projectsStore.emitChange();

  return true;

});

module.exports = projectsStore;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var routeCoverConst = require('../constants/commonConst.js').routeCover ;

// Define action methods
var navActions = {

  // Receive inital product data
  start: function( data ) {
    AppDispatcher.handleAction({
      actionType: routeCoverConst.START,
      data: data
    })
  },

  finish: function( data ) {
    AppDispatcher.handleAction({
      actionType: routeCoverConst.FINISH,
      data: data
    })
  },

};

module.exports = navActions;

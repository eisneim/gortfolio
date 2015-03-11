var AppDispatcher = require('../dispatcher/AppDispatcher');
var navConst = require('../constants/commonConst.js').nav ;

// Define action methods
var navActions = {

  // Receive inital product data
  toggle: function( openOrCloseOrToggle ) {
    AppDispatcher.handleAction({
      actionType: navConst.TOGGLE,
      data: openOrCloseOrToggle
    })
  },

};

module.exports = navActions;

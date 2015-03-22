var AppDispatcher = require('../dispatcher/AppDispatcher');
var portfolioConst = require('../constants/portfolioConst.js') ;

// Define action methods
var gridActions = {

  // Receive inital product data
  receiveData: function( data ) {
    AppDispatcher.handleAction({
      actionType: portfolioConst.RECEIVE_DATA,
      data: data
    })
  },

};

module.exports = navActions;

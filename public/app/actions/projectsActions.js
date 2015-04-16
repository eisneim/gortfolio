var AppDispatcher = require('../dispatcher/AppDispatcher');
var projectsConst = require('../constants/commonConst.js').projects ;

// Define action methods
var projectsActions = {

  // Receive inital product data
  toggleGuide: function( data ) {
    AppDispatcher.handleAction({
      actionType: projectsConst.TOGGLEGUIDE,
      data: data
    })
  },

};

module.exports = projectsActions;

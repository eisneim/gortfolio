var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var gridConst = require('../constants/commonConst.js').grid ;
var _ = require('lodash');

function Grid(opt){
  // the virtual grid;
  this.virtual = [];
  // options 
  this.itemLength =   opt.itemLength;
  this.gridWidth =    opt.gridWidth || opt.gridWidth;
  this.minItemWidth = opt.minItemWidth || 200;
  this.gutter = opt.gutter || 10; 

};

Grid.prototype.setUp = function(){
  /**
   * setting up the virtual grid
   */
  this.columns = Math.floor(this.gridWidth / this.minItemWidth );
  this.baseWidth = this.gridWidth / this.columns  - this.gutter,

  var row = Math.ceil( this.itemLength * 4 / this.columns );
  for(var ii = 0; ii<row; ii++ ){
    var rowOfItems = [];
    for(var jj=0; jj<this.columns; jj++ ){
      rowOfItems.push({
        top: ii*(this.baseWidth + this.gutter), // y value
        left: jj*( this.baseWidth + this.gutter), // x value
        isOccupied: false,
      });
    }
    this.virtual.push(rowOfItems);
  };// end of outter for loop
  // pointer of virtual grid 
  this.currentRow = 0;
  this.currentColumn = 0;
  this.currentType = 1;

  console.log('total colums:'+ this.columns );
  console.log('baseWidth:'+ this.baseWidth );
}

Grid.prototype.fill = function(){

}

Grid.prototype.deBouncedRefill = _.debounce( function(){
    this.gridWidth = window.innerWidth-20;
    this.gridData.columns = Math.floor(this.gridWidth / this.minItemWidth );
    var baseWidth = this.gridWidth / this.gridData.columns  - this.gutter;

    this.setState({baseWidth: baseWidth });

}, 200 ), 

var state = {
  minItemWidth: 200,
  gridWidth: window.innerWidth,
  gutter: 10,

};

function setUp(){
  

}

function toggleFunc(openOrCloseOrToggle){
  // console.log('__openOrCloseOrToggle:',openOrCloseOrToggle)
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
    case gridConst.TOGGLE:
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

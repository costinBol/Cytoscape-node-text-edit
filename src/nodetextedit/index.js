 
const assign = require('../assign');
 
 
const cyListeners = require('./cy-listeners');
 
const drawing = require('./drawing'); 
const listeners = require('./listeners'); 
const { LOG_OPTIONS } = require("./logging");

let defaults = {
  selectAllText : false, // If true, selects all text when starting edit. Otherwise, selects last character.
  backgroundColor: 'white', // Colour of background overlay
  backgroundOpacity: 0.9, // Opacity of background overlay
  nodeLabel: 'name', // Which node.data() property holds the label
  showLogs: false, // Show debugging info in console
  zIndex: 1000, // zIndex of editing overlay
  maxTextWidth: 1000 // Maximum text width in pixels - if 'text-max-width'not specified
};

function NodeTextEdit( options ){
  let cy = options.cy;

  this.cy = cy;
  this.listeners = [];

  this.options = assign( {}, defaults, options );
  LOG_OPTIONS.enabled = this.options.showLogs;

  this.addListeners();
  
  this.preventDefault = e => e.preventDefault();

  this.closeEditing = () => cyListeners.closeEditBox(this.options);
}

let proto = NodeTextEdit.prototype = {};
let extend = obj => assign( proto, obj );

proto.destroy = function(){
  this.removeListeners();
};

proto.setOptions = function( options ){
  assign( this.options, options );
};

proto.mp = function(){
  return { x: this.mx, y: this.my };
};

proto.hp = function(){
  return { x: this.hx, y: this.hy };
};
 

[ 
  cyListeners, 
  drawing,  
  listeners 
].forEach( extend );

module.exports = NodeTextEdit;

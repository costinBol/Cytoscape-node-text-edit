const NodeTextEdit = require('./nodetextedit');
const assign = require('./assign');

module.exports = function( options ){
  let cy = this;

  return new NodeTextEdit( assign({ cy }, options) );
};

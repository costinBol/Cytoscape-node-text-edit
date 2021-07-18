const { showEditBox } = require("./drawing");
const { log } = require("./logging");

function addCytoscapeListeners() {
  let { cy, options } = this;

  // Show editor on node tap
  this.addListener(cy, 'tap', 'node', e => {
    let node = e.target;

    log("Node tap event:", e); 
    log("Node tapped: ", node);
    log("Node position: ", node.renderedPosition());
    log("Rendered bounding box:", node.renderedBoundingBox());
    log("Rendered style: ", node.renderedStyle());
     
    log("Zoom: ", cy.zoom());
    window.cyNodeEditing = node;

    showEditBox(node, options, cy);
   
  });

  this.addListener(cy, 'tap', e => {
    if (e.target === cy) {
      log("Core tap", window.cyEditBox, window.cyNodeEditing);
      if (window.cyEditBox) {
        closeEditBox(options);
      }
    }
  });
  this.addListener(cy, 'viewport', e => {
    if (e.target === cy) {
     
      if (window.cyEditBox) {
        log("CY- viewport change - closing overlay");
        closeEditBox(options);
      }
    }
  }
  );
  return this;
}

/**
 * Close editing overlay and save text to node
 */
function closeEditBox(options) {
  let div = document.getElementById(window.cyEditBox);

  log("closeEditBox", div.innerText);
  if (window.cyNodeEditing) {
     
    let itxt = div.innerText;
    log("Text inner:" + itxt);
 
    window.cyNodeEditing.data(options.nodeLabel, itxt);
  }
  document.body.removeChild(div);
  window.cyEditBox = undefined;
  window.cyNodeEditing = undefined;
}
module.exports = { addCytoscapeListeners };

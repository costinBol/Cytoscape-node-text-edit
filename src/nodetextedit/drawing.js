const { log } = require("./logging");

function showEditBox(node, options) {

  let pos = node.renderedBoundingBox();
  let style = node.renderedStyle();

  // Create the content-editable div that will allow text edit
  var cont = document.createElement("div");
  cont.id = "edit_" + (new Date()).getTime();

  // Set position  
  cont.style.position = 'fixed';
  cont.style.top = (pos.y1) + 'px';
  cont.style.minHeight = (pos.h) + 'px';
  cont.style.zIndex = options.zIndex;
  cont.style.left = (pos.x1 - 200) + 'px';
  cont.style.minWidth = (pos.w + 400) + 'px';
  if (style.textMaxWidth) {
    cont.style.minWidth = style.textMaxWidth;
    let iw = parseFloat(style.textMaxWidth.substr(0, style.textMaxWidth.length - 2));
    log("Parsed width:", iw);
    cont.style.left = (pos.x1 + pos.w / 2 - iw / 2) + 'px';
  }

  cont.innerText = node.data(options.nodeLabel);
  cont.contentEditable = true;

  // Set style to match node
  cont.style.resize = 'both';
  cont.style.backgroundColor = options.backgroundColor;
  cont.style.opacity = options.backgroundOpacity;
  cont.style.fontFamily = style.fontFamily;
  cont.style.fontSize = style.fontSize;
  cont.style.fontWeight = style.fontWeight;
  cont.style.textAlign = style['text-justification'];
  if (cont.style.textJustify == 'left') {
    cont.style.left = (pos.x) + 'px';
  }

  document.body.appendChild(cont);

  // After overlay added, focus and set selection
  cont.focus();
  window.cyEditBox = cont.id;
  let r = document.createRange();
  if (options.selectAllText) {
    r.selectNodeContents(cont);
  }
  else {
    r.selectNode(cont);
  }
  log("Selection: ", r)
  let s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);

  return cont;
}



module.exports = {
  showEditBox
};

var LOG_OPTIONS = {
    enabled: true
}

function log(msg, ...parameters) {   
    if (LOG_OPTIONS.enabled) {
      console.log(`[cytoscape-node-text-edit] ${msg}`, parameters);
    }
}
  
module.exports = { log, LOG_OPTIONS };
var LOG_OPTIONS = {
    enabled: true
}

function log(msg, ...parameters) {   
    if (LOG_OPTIONS.enabled) {
      console.log(msg, parameters);
    }
}
  
module.exports = { log, LOG_OPTIONS };
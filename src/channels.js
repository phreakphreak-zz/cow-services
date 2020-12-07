module.exports = function(app) {
    if(typeof app.channel !== 'function') {
      return;
    }
  
    app.on('connection', connection => {
      // On a new real-time connection, add it to the anonymous channel
      app.channel("everbody").join(connection);
    });

    app.publish((data, hook) => {
      return app.channel('everbody');
    });
  };
  
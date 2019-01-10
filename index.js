const cron = require('node-cron');

module.exports = function (sails) {
  return {
    jobs: {},

    defaults: { cron: {} },

    initialize: function (cb) {
      const config = sails.config.cron;
      const jobs = Object.keys(config);

      sails.on('ready', () => {      
        jobs.forEach(job => {
          if (!cron.validate(config[job].schedule)) {
            sails.log.error(`Cron (${job})'s schedule (${config[job].schedule}) is invalid.`);
          } else if (!config[job].onTick) {
            sails.log.error(`Cron (${job}) 'onTick' function is required for cron task.`);
          } else {
            let options = {};
            if (config[job].timezone) { options.timezone = config[job].timezone; }
            if (config[job].start === false) { options.scheduled = false; }

            this.jobs[job] = cron.schedule(
              config[job].schedule, 
              config[job].onTick,
              options);
            
            if (config[job].runOnInit === true) {
              config[job].onTick();
            }

          }
        });
        
      });

      cb();
    }
  };
};

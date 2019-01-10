# sails-hook-node-cron

![Downloads](https://img.shields.io/npm/dm/sails-hook-node-cron.svg)
![Downloads](https://img.shields.io/npm/dt/sails-hook-node-cron.svg)
![npm version](https://img.shields.io/npm/v/sails-hook-node-cron.svg)
![License](https://img.shields.io/npm/l/sails-hook-node-cron.svg)

Sails hook for running cron tasks using [node-cron](https://www.npmjs.com/package/node-cron).

## Getting Started

This is a SailsJS's hook for cron task using node-cron. The difference between this package and other popular SailsJS's cron hook, [sails-hook-cron](https://www.npmjs.com/package/sails-hook-cron), is using [cron](https://www.npmjs.com/package/cron) package whereas `sails-hook-node-cron` uses `node-cron` as main package to run a cron task.  

The reason I chose `node-cron` package as a cron runner is b/c `node-cron` uses pure javascript code (setTimeout) to run a scheduled task whereas `cron` package uses `child_process` (https://www.npmjs.com/package/child_process) package and spwan may causes security issue and more memory to run. For security and efficiency, I created this new SailsJS hook package.

For any user who switching from sails-hook-cron package, you will see that the parameter fields are very similiar with sails-hook-cron. You should be able to simply change the package without rewriting the cron configuration.

### Installation

```shell
npm install sails-hook-node-cron --save
```

Configure `config/cron.js` in your project:

```javascript
module.exports.cron = {
  myFirstJob: {
    schedule: '* * * * * *',      // [REQUIRED]
    onTick: () => {               // [REQUIRED]
      console.log('You will see this every second');
    },
    timezone: 'America/New_York', // [OPTIONAL] set timezone
    runOnInit: true,              // [OPTIONAL] fire onTick function as soon as the cron is initialized
    start: true                   // [OPTIONAL] manually start the cron task (DEFAULT = true) See below for the example
  }
};
```

https://crontab.guru/ or https://cronjob.xyz/ might be useful to validate the cron schedule.

## Examples

You can create a cronjob and start\stop them manually:

```javascript
// config/cron.js
module.exports.cron = {
  myJob: {
    schedule: '* * * * * *',
    onTick: () => {
      console.log('schedule task');
    },
    start: false
  }
};

// api/controllers/SomeController.js
module.exports = {
  someAction: function(req, res) {
    sails.hooks.cron.jobs.myJob.start();
    sails.hooks.cron.jobs.myJob.stop();
    sails.hooks.cron.jobs.myJob.destroy();
  }
};
```

## License

[MIT](./LICENSE)

# sails-hook-node-cron

Sails hook for running cron tasks using [node-cron](https://www.npmjs.com/package/node-cron).

## Getting Started

This is a SailsJS's hook for cron task using node-cron. The difference between this package and other popular SailsJS's cron hook, [sails-hook-cron](https://www.npmjs.com/package/sails-hook-cron), is using [cron](https://www.npmjs.com/package/cron) package whereas this *sails-hook-node-cron* uses [node-cron](https://www.npmjs.com/package/node-cron) as main package to run a cron task.  

The reason I prefer *node-cron* package as a cron runner is b/c *node-cron* uses pure javascript code (setTimeout) to run a scheduled task whereas *cron* package uses [child_process](https://www.npmjs.com/package/child_process) package and *spwan* which is used in *child_process* may cause a security issue and more memory to run. 

If you are switching from sails-hook-cron package, you will see that the parameter fields are similar with sails-hook-cron. You should be able to simply change the package without rewriting the cron configuration.

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

## Cron Syntax

This is a quick reference to cron syntax and also shows the options supported by node-cron.

https://crontab.guru/ or https://cronjob.xyz/ might be useful to validate the cron schedule.
Please note that these sites may not accept the SECOND field so you can you them as reference but you should check your run result after.

### Allowed fields

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Allowed values

|     field    |        value        |
|--------------|---------------------|
|    second    |         0-59        |
|    minute    |         0-59        |
|     hour     |         0-23        |
| day of month |         1-31        |
|     month    |     1-12 (or names) |
|  day of week |     0-7 (or names, 0 or 7 are sunday)  |

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

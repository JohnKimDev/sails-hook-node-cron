# sails-hook-node-cron

Sails hook for running cron tasks using [node-cron](https://www.npmjs.com/package/node-cron).

## Getting Started

This is a SailsJS's hook for cron jobs using [node-cron](https://www.npmjs.com/package/node-cron). The difference between this package and another popular SailsJS's cron hook, `sails-hook-cron` is that `sails-hook-cron` is using [cron](https://www.npmjs.com/package/cron) package whereas this **`sails-hook-node-cron`** uses [node-cron](https://www.npmjs.com/package/node-cron) as main package to run cron jobs.  

---

I prefer **node-cron** package as acron runner, because **node-cron** uses pure javascript codes (setTimeout) to run a scheduled task whereas *cron* package uses **child_process** for **spwan** command. Using **child_process** *may* open injection vulnerabilities. I prefer not to use a command injection if possible, especially by 3rd party packages. Also if you are running multiple cron jobs, using spawned child_process may use more memory for the server. So for the efficiency and security reasons, I have created this new cron hook package for SailsJS.
Happy Coding!

---

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

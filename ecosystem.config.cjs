module.exports = {
    apps: [
      {
        name: 'app-healthby',
        port: '3023',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
      },
    ],
  };
  

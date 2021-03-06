/* eslint global-require: 0 */
const path = require('path');
const chalk = require('chalk');
const express = require('express');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const snapshooter = require('@nebula.js/snapshooter');
const snapshotRouter = require('./snapshot-router');

module.exports = async ({
  host,
  port,
  enigmaConfig,
  webIntegrationId,
  snName,
  snUrl,
  dev = false,
  open = true,
  entryWatcher,
  watcher,
  serveConfig,
}) => {
  let config;
  let contentBase;

  const snapshotRoute = '/njs';

  const snapRouter = snapshotRouter({
    base: `http://${host}:${port}${snapshotRoute}`,
    snapshotUrl: `http://${host}:${port}/eRender.html`,
    snapshooter: snapshooter({ snapshotUrl: `http://${host}:${port}/eRender.html` }),
  });

  const themes = serveConfig.themes || [];

  if (dev) {
    const webpackConfig = require('./webpack.build.js');
    const srcDir = path.resolve(__dirname, '../web');
    const distDir = path.resolve(srcDir, '../dist');
    contentBase = distDir;
    config = webpackConfig({
      srcDir,
      distDir,
      dev: true,
      serveConfig,
    });
  } else {
    const webpackConfig = require('./webpack.prod.js');
    const srcDir = path.resolve(__dirname, '../dist');
    contentBase = srcDir;
    config = webpackConfig({
      srcDir,
      serveConfig,
    });
  }
  const options = {
    clientLogLevel: 'none',
    hot: dev,
    host,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    quiet: false,
    noInfo: true,
    open,
    progress: true,
    contentBase: [contentBase],
    historyApiFallback: {
      index: '/eHub.html',
    },
    before(app) {
      app.use(snapshotRoute, snapRouter);

      if (entryWatcher) {
        entryWatcher.addRoutes(app);
      }

      app.get('/themes', (req, res) => {
        const arr = themes.map(theme => theme.key);
        res.json(arr);
      });

      app.get('/theme/:id', (req, res) => {
        const t = themes.filter(theme => theme.key === req.params.id)[0];
        if (!t) {
          res.sendStatus('404');
        } else {
          res.json(t.theme);
        }
      });

      app.get('/info', (req, res) => {
        res.json({
          enigma: enigmaConfig,
          webIntegrationId,
          supernova: {
            name: snName,
            url: snUrl,
          },
          sock: {
            port: entryWatcher && entryWatcher.port,
          },
          themes: themes.map(theme => theme.key),
        });
      });

      if (serveConfig.assets) {
        app.use('/assets', express.static(serveConfig.assets));
      }
    },
    proxy: [
      {
        context: '/render',
        target: `http://${host}:${port}/eRender.html`,
        ignorePath: true,
        logLevel: 'error',
      },
      {
        context: '/dev',
        target: `http://${host}:${port}/eDev.html`,
        ignorePath: true,
        logLevel: 'error',
      },
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  WebpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, options);

  const close = () => {
    server.close();
  };

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, close);
  });

  if (watcher) {
    watcher.on('event', event => {
      if (event.code === 'ERROR') {
        server.sockWrite(server.sockets, 'errors', [event.error.stack]);
      }
    });
  }

  let initiated = false;

  return new Promise((resolve, reject) => {
    // eslint-disable-line consistent-return
    compiler.hooks.done.tap('nebula serve', stats => {
      if (!initiated) {
        initiated = true;
        const url = `http://${host}:${port}`;
        console.log(`Development server running at ${chalk.green(url)}`);

        resolve({
          context: '',
          url,
          close,
        });

        if (stats.hasErrors()) {
          stats.compilation.errors.forEach(e => {
            console.log(chalk.red(e));
          });
          process.exit(1);
        }
      }
    });

    server.listen(port, host, err => {
      if (err) {
        reject(err);
      }
    });
  });
};

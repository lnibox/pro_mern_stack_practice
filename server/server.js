// const express = require('express');
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const Issue = require('./issue.js');

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb://localhost/issuestracker')
  .then((connection) => {
    db = connection;
    // throw new Error('Test!');
    app.listen(3000, () => {
      console.log('App started on port: 3000');
    });
  })
  .catch((error) => {
    console.log('ERROR', error);
  });

app.get('/api/issues', (req, res) => {
  db.collection('issues')
    .find()
    .toArray()
    .then((issues) => {
      const metadata = { totalCount: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  db.collection('issues')
    .insertOne(newIssue)
    .then((result) => {
      db.collection('issues')
        .find({ _id: result.insertedId })
        .limit(1)
        .next()
        .then((newIssue) => {
          newIssue.id = newIssue._id;
          res.json(newIssue);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
    });
});

// if (process.env.NODE_ENV !== 'production') {
//     const webpack = require('webpack');
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');

//     const config = require('../webpack.config');
//     config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
//     config.plugins.push(new webpack.HotModuleReplacementPlugin());

//     const bundler = webpack(config);
//     app.use(webpackDevMiddleware(bundler, { noInfo: true }));
//     app.use(webpackHotMiddleware(bundler, { log: console.log }));
// }

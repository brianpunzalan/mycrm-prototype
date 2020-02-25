const path = require('path');
const express = require('express');
const initiateRoutes = require('./routes');
const DatabaseConnection = require('./db');

// init app and db connection
const app = express();
const db = DatabaseConnection();

// setup context & initiate routes
const context = { db };
const routes = initiateRoutes(context);

// Serve Build files
app.use(express.static(path.join(__dirname, '../build')));

// Serve Static files (images, documents, etc)
app.use('/static', express.static(path.join(__dirname, '../client/static')));

// Set CORS allow for origin for '*'
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  next();
});

// v1 - RESTful API Endpoints
app.use('/api/v1/', routes.base);

// v1 - GraphQL API Endpoint

module.exports = app;

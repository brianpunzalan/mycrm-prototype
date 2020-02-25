const base = require('./base');
// const accounts = require('./accounts');
// const campaigns = require('./campaigns');
// const contacts = require('./contacts');
// const leads = require('./leads');
// const opportunities = require('./opportunities');
// const quotes = require('./quotes');
// const users = require('./users');
// const cases = require('./cases');
// const documents = require('./documents');

module.exports = function (context) {
  this.db = context.db;
  return {
    base,
    // accounts,
    // contacts,
    // leads,
    // opportunities,
    // quotes,
    // users,
    // cases,
    // documents,
    // campaigns,
  };
};

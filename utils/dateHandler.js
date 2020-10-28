const moment = require("moment");

const dateAndTime = () => {
  return moment().format("YYYY-M-D HH:mm:ss");
};

const dateOnly = () => {
  return moment().format("YYYY-M-D");
};

const dateHandler = {};

dateHandler.moment = moment;
dateHandler.dateOnly = dateOnly;
dateHandler.dateAndTime = dateAndTime;

module.exports = dateHandler;

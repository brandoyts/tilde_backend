const dateHandler = require("../utils/dateHandler");

const Guest = (sequelize, DataTypes) => {
  DataTypes.DATE.prototype._stringify = function (date, options) {
    date = this._applyTimezone(date, options);
    return date.format("YYYY-MM-DD HH:mm:ss.SSS");
  }.bind(DataTypes.DATE.prototype);

  const Guest = sequelize.define("Guest", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,

      get() {
        const original = this.getDataValue("createdAt");
        const formatted = dateHandler
          .moment(original)
          .format("YYYY-M-D HH:mm:ss");
        return formatted;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });

  return Guest;
};

module.exports = Guest;

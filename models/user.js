const dateHandler = require("../utils/dateHandler");

const User = (sequelize, DataTypes) => {
  DataTypes.DATE.prototype._stringify = function (date, options) {
    date = this._applyTimezone(date, options);
    return date.format("YYYY-MM-DD HH:mm:ss.SSS");
  }.bind(DataTypes.DATE.prototype);

  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      allowNull: false,
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
  });
  return User;
};

module.exports = User;

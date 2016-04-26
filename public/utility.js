'use strict';

const Utility = {
  formatTime: function(date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }
};

module.exports = Utility;

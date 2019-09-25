
var bcrypt = require('bcryptjs');
// status = 0 (pending)
// status = 1 (done)
module.exports = {
  attributes: {
    status: {
      type: 'integer',
      enum: [0, 1], //
      defaultsTo: 0,
    },
    subject: {
      type: 'string',
      defaultsTo: '',
    },
    detail: {
      type: 'string',
      defaultsTo: '',
    }
  },
  custom_get: function (data, cb) {
    var response_data = sails.config.custom.get_custom_template();
    var select = data.select || [];
    var query = data.query || {};
    query.select = select;
    var populate = data.populate || [];
    Tasks.find(query).populate(populate).exec(function (error, tasks) {
      if (error) {
        response_data.error = error;
        response_data.description = 'Server error during tasks lookup';
      } else {
        if (tasks && tasks.length > 0) {
          response_data.status = true;
          response_data.code = 0;
          response_data.data = tasks;
          response_data.http_code = sails.config.custom.http_codes.success;
        } else {
          response_data.http_code = sails.config.custom.http_codes.not_found;
          response_data.description = 'tasks not found';
        }
      }
      return cb(response_data);
    });
  },
  custom_get_one: function (data, cb) {
    var response_data = sails.config.custom.get_custom_template();
    var select = data.select || [];
    var query = data.query || {};
    query.select = select;
    var populate = data.populate || [];
    Tasks.findOne(query).populate(populate).exec(function (error, task) {
      if (error) {
        response_data.error = error;
        response_data.description = 'Server error during task lookup';
      } else {
        if (task) {
          response_data.status = true;
          response_data.code = 0;
          response_data.data = task;
          response_data.http_code = sails.config.custom.http_codes.success;
        } else {
          response_data.http_code = sails.config.custom.http_codes.not_found;
          response_data.description = 'task is not found';
        }
      }
      return cb(response_data);
    });
  },
  custom_update: function (query, update_object, cb) {
    var response_data = sails.config.custom.get_custom_template();
    Tasks.update(query, update_object).exec(function afterwards(error, updated) {
      if (error) {
        response_data.error = error;
        response_data.description = 'Server error during task update';
      } else {
        if (updated && updated.length > 0) {
          response_data.status = true;
          response_data.code = 0;
          response_data.data = updated[0];
          response_data.http_code = sails.config.custom.http_codes.success;
        } else {
          response_data.description = 'Task is not updated';
          response_data.http_code = sails.config.custom.http_codes.not_found;
        }
      }
      return cb(response_data);
    });
  },
  custom_remove: function (query, cb) {
    var response_data = sails.config.custom.get_custom_template();
    Tasks.destroy(query).exec(function (error) {
      if (error) {
        response_data.error = error;
        response_data.description = 'Server error during task remove';
      } else {
        response_data.status = true;
        response_data.code = 0;
        response_data.http_code = sails.config.custom.http_codes.success;
      }
      return cb(response_data);
    });
  },
  custom_create: function (inject_data, cb) {
    var response_data = sails.config.custom.get_custom_template();
    Tasks.create(inject_data).exec(function (error, task_object) {
      if (error) {
        response_data.error = error;
        response_data.description = 'Server error during task creating';
      } else {
        if (task_object) {
          response_data.status = true;
          response_data.code = 0;
          response_data.data = task_object;
          response_data.http_code = sails.config.custom.http_codes.created;
        } else {
          response_data.http_code = sails.config.custom.http_codes.not_found;
          response_data.description = 'Task is not created';
        }
      }
      return cb(response_data);
    });
  },

};

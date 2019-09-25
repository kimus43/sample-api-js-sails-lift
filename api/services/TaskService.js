var async_module = require('async');

module.exports = {

  create_task: function (request_data, cb) {
    var inject_data = {
      subject: request_data.subject,
      detail: request_data.detail,
    };
    Tasks.custom_create(inject_data, function (response_data) {
      return cb(response_data);
    });
  },
  get_all_tasks: function (request_data, cb) {
    Tasks.custom_get({}, function (response_data) {
      return cb(response_data);
    });
  },
  get_task_by_id: function (request_data, cb) {
    Tasks.custom_get_one({
      query: {id: request_data.task_id},
    }, function (response_data) {
      return cb(response_data);
    });
  },
  edit_task: function (request_data, cb) {
    var query = {
      id: request_data.task_id
    };
    var update_object = {
      subject: request_data.subject,
      detail: request_data.detail
    };
    Tasks.custom_update(query, update_object, function  (response_data) {
      if (response_data.status) {
        response_data.description = 'Task is updated';
        return cb(response_data);
      } else {
        response_data.http_code = sails.config.custom.http_codes.not_found;
        response_data.description = 'Task is not found';
        return cb(response_data);
      }
    });
  },
  set_status_task: function (request_data, cb) {
    if (request_data.status == 0 || request_data.status == 1) {
      var query = {
        id: request_data.task_id
      };
      var update_object = {
        status: request_data.status,
      };
      Tasks.custom_update(query, update_object, function  (response_data) {
        if (response_data.status) {
          if (response_data.data.status == 1) {
            response_data.description = 'Task is done';
            return cb(response_data);
          } else {
            response_data.description = 'Task is pending';
            return cb(response_data);
          }
        } else {
          response_data.http_code = sails.config.custom.http_codes.not_found;
          response_data.description = 'Task is not found';
          return cb(response_data);
        }
      });
    } else {
      var response_data = sails.config.custom.get_custom_template();
      response_data.http_code = sails.config.custom.http_codes.not_allowed;
      response_data.description = 'Status not allowed, Please input status 0(Pending) or 1(Done)'
      return cb(response_data);
    }
  },

  delete_task: function (request_data, cb) {
    async_module.waterfall ([
      check_task = function (cbAsync) {
        Tasks.custom_get_one({
          query: {id: request_data.task_id},
        }, function (object_task) {
          if (object_task.status) {
            cbAsync(object_task.data);
          } else {
            return cb(object_task);
          }
        });
      }
    ], asyncComplete = function (object_task) {
      var query = {
        id: object_task.id
      };
      Tasks.custom_remove(query, function  (response_data) {
        if (response_data.status) {
          response_data.description = 'Task is deleted';
          response_data.data = object_task;
          return cb(response_data);
        } else {
          return cb(response_data);
        }
      });
    });

  },

}

var logger_service = require('../services/LoggerService.js');
var logger = logger_service.inject_logger();
var info_logger = logger_service.inject_info_logger();

module.exports = {

   create_task: function (req, res) {
     var request_body = req.body;
     var subject = request_body.subject || '';
     var detail = request_body.detail || '';
     var request_data = {
       subject: subject,
       detail: detail,
     };
     TaskService.create_task(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       res.status(response_data.http_code).send(response_data);
     });
   },

   get_all_tasks : function (req, res) {
     var request_body = req.body;
     var request_data = {};
     TaskService.get_all_tasks(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       if (response_data.http_code == sails.config.custom.http_codes.server_error) {
         logger.error(response_data.description);
       } else if (response_data.http_code == sails.config.custom.http_codes.not_found) {
         info_logger.info(response_data.description);
       }
       res.status(response_data.http_code).send(response_data);
     });
   },

   get_task_by_id : function (req, res) {
     var request_body = req.body;
     var task_id = request_body.task_id || '';
     var request_data = {
       task_id: task_id
     };
     TaskService.get_task_by_id(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       if (response_data.http_code == sails.config.custom.http_codes.server_error) {
         logger.error(response_data.description);
       } else if (response_data.http_code == sails.config.custom.http_codes.not_found) {
         info_logger.info(response_data.description);
       }
       res.status(response_data.http_code).send(response_data);
     });
   },

   edit_task : function (req, res) {
     var request_body = req.body;
     var task_id = request_body.task_id || '';
     var subject = request_body.subject || '';
     var detail = request_body.detail || '';
     var request_data = {
       task_id: task_id,
       subject: subject,
       detail: detail,
     };
     TaskService.edit_task(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       if (response_data.http_code == sails.config.custom.http_codes.server_error) {
         logger.error(response_data.description);
       } else if (response_data.http_code == sails.config.custom.http_codes.not_found) {
         info_logger.info(response_data.description);
       }
       res.status(response_data.http_code).send(response_data);
     });
   },

   set_status_task : function (req, res) {
     var request_body = req.body;
     var task_id = request_body.task_id || '';
     var status = request_body.status || 0;
     var request_data = {
       task_id: task_id,
       status: status,
     };
     TaskService.set_status_task(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       if (response_data.http_code == sails.config.custom.http_codes.server_error) {
         logger.error(response_data.description);
       } else if (response_data.http_code == sails.config.custom.http_codes.not_found) {
         info_logger.info(response_data.description);
       }
       res.status(response_data.http_code).send(response_data);
     });
   },

   delete_task : function (req, res) {
     var request_body = req.body;
     var task_id = request_body.task_id || '';
     var request_data = {
       task_id: task_id,
     };
     TaskService.delete_task(request_data, function response_callback(response_data) {
       res.contentType = 'json';
       if (response_data.http_code == sails.config.custom.http_codes.server_error) {
         logger.error(response_data.description);
       } else if (response_data.http_code == sails.config.custom.http_codes.not_found) {
         info_logger.info(response_data.description);
       }
       res.status(response_data.http_code).send(response_data);
     });
   },

};

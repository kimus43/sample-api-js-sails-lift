module.exports.custom = {
  http_codes: {
    success: 200,
    created: 201,
    server_error: 500,
    not_found: 400,
    not_allowed: 405,
  },
  get_custom_template: function() {
    return {
      status: false,
      code: 1,
      description: "",
      error: "",
      http_code: 500,
      data: null
    };
  },
  get_success_template: function() {
    return {
      status: true,
      code: 0,
      description: "",
      error: "",
      http_code: 201,
      data: null
    };
  }, get_basic_response_template: function() {
    return {
      status: false,
      error: "",
      description: "",
      data: null
    };
  }
}

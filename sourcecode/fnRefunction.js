const fs = require('fs');

let rule = {
  retrun_error_to_client: true,
  handle_error_by_template: true,
  handle_redirect_by_template: undefined
};

function sample(rule) {
  console.log('1', rule);
  if (typeof rule.handle_redirect_by_template !== 'boolean') {
    rule.handle_redirect_by_template = false;
  }
  if (typeof rule.handle_error_by_template !== 'boolean') {
    rule.handle_error_by_template = false;
  }
  if (typeof rule.retrun_error_to_client !== 'boolean') {
    rule.retrun_error_to_client = true;
  }
  console.log('\n2', rule);

  if (!rule.retrun_error_to_client) {
    console.log('\n* ========= return to client ========= *');
  } else if (rule.handle_error_by_template) {
    if (!fs.existsSync('./index.js')) {
      console.log('\n* ========= return to client by json ========= *');
      return;
    }
    console.log('\n* ========= return to client by error.html ========= *');
  } else if (rule.handle_redirect_by_template) {
    console.log('\n* ========= return to client by json ========= *');
  } else {
    console.log('\n* ========= return to client by redirect ========= *');
  }
  return;
}

sample(rule);
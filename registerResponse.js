const registerResponse = (form, response, onResponseReady, logger) => {
  form.fillField(response);
  if (!form.isFilled()) {
    logger(form.currentFieldPrompt());
    return;
  }
  onResponseReady(form);
  logger('Thank you');
};

exports.registerResponse = registerResponse;

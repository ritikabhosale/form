const registerResponse = (form, response, onResponseReady, logger) => {
  try {
    form.fillField(response);
  } catch (error) {
    logger(error.message);
  }

  if (!form.isFilled()) {
    logger(form.currentFieldPrompt());
    return;
  }

  onResponseReady(form.getResponses());
  logger('Thank you');
};

exports.registerResponse = registerResponse;

const formatResponseMiddleware = (req, res, next) => {
  const sendResponse = res.send;

  res.send = (body) => {
    res.send = sendResponse;

    try {
      const response = JSON.parse(body);
      const success = res.statusCode < 400;

      if (success) {
        res.json({ data: response, success });
      } else {
        const message = response.message || 'Error processing request';
        const errorResponse = { data: { message }, success: false };
        res.status(res.statusCode).json(errorResponse);
      }
    } catch (error) {
      const errorMessage = 'Error parsing response body';
      res.status(500).json({ message: errorMessage, success: false });
    }
  };

  next();
};

module.exports = formatResponseMiddleware;

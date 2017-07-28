const express = require('express');
const app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
app.use(forceSSL());
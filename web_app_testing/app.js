const express = require('express'), 
  app = express(), 
  config = require('./config/application').server,
  bodyParser = require('body-parser'), 
  port = config.port;

app.set('views', __dirname + '/app/views');
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./app/controllers'));

app.listen(port, () => {});


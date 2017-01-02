const express = require('express'), 
  app = express(), 
  bodyParser = require('body-parser'), 
  port = process.env.PORT || 5000;

app.set('views', __dirname + '/app/views');
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./app/controllers'));

app.listen(port, () => {
  console.log('Listening on port ' + port);
});


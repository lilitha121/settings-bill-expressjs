const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
  // res.send('Setting Bill App')
  res.render("index")
});
app.use(express.static('public'));
app.post('/settings', function (req, res) {

});

app.post('action', function (req, res) {

});

app.get('/actions', function (req, res) {

});

app.get('/actions/:type', function (req, res) {

});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

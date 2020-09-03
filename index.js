const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const moment = require('moment');
moment().format();
const SettingsBill = require('../settings-bill-expressjs/settings-bill')
const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  // res.send('Setting Bill App')
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    colour: settingsBill.colour()
  })
});

app.post('/settings', function (req, res) {
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  })

  res.redirect('/');

});





app.post('/action', function (req, res) {
  settingsBill.recordAction(req.body.radioSelected)

  res.redirect('/');

});

app.get('/actions', function (req, res) {

  var actionsList = settingsBill.actions()
  for (let key of actionsList) {
    key.ago = moment(key.timestamp).fromNow()
  }
  res.render('actions', {
    actions: actionsList
  })
});

app.get('/actions/:type', function (req, res) {

  var actionsList = settingsBill.actionsFor(req.params.type)
  for (let key of actionsList) {
    key.ago = moment(key.timestamp).fromNow()
  }
  res.render('actions', {
    actions: actionsList
  })
});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

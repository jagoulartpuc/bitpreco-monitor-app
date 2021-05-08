var feathers = require('feathers');
var bodyParser = require('body-parser');

var app = feathers();

app.set('view engine', 'ejs');  
app.configure(feathers.rest());
app.configure(feathers.socketio());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/prices', function(req, res) {

});

app.listen(3030);
const express = require('express');
const bodyParser = require('body-parser');
const iotaRoutes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', iotaRoutes);

app.listen(3000, function () {
    console.log('Listening to port 3000');
});

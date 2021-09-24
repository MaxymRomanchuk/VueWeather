const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const forecasts = require('./db/forecasts');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

app.get('/forecasts', (req, res) => {
    forecasts.getAll().then((forecastList) => {
        res.json(forecastList);
    });
});

app.post('/forecast', (req, res) => {
    forecasts.create(req.body).then(forecast => {
        let result = {};
        Object.assign(result, forecast);
        if(result.hasOwnProperty('_id')) delete result['_id'];

        res.json(forecast);
    }).catch((error) => {
        res.status(error.error_code);
        res.json(error);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
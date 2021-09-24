const Joi = require('joi');
const db = require('./connections');
const axios = require('axios');
const forecastProcessor = require('../processing/forecastProcessing');
const constants = require('../constants.json');

const schema = Joi.object().keys({
    city: Joi.string().alphanum().required(),
    description: Joi.string().max(64).required(),
    temperature: Joi.array().required(),
});

const forecasts = db.get('forecasts');

function getAll() {
    return forecasts.find();
}

async function loadForecast(url, city) {
    const response = await axios.get(url).catch((reason) => {
        return reason.response;
    });
    const data = response.data;
    return forecastProcessor.process(data, schema, forecasts, city);
}

function create(body) {
    const city = body['city'].toLowerCase();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},ua&APPID=${constants['api_key']}&units=metric`;
    let result = forecasts.findOne({
        city: city
    }).then(forecast => {
        if(!forecast || forecastProcessor.checkExpiration(forecast['created'])) {
            return loadForecast(
                url,
                city
                );
        } else {
            return forecast;
        }
    })
    return result;
}

module.exports = {
    create,
    getAll
};
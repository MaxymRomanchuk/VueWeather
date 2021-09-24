function process(data, schema, table, city) {
    if(data.hasOwnProperty('cod')) {
        return Promise.reject( {
            message: data.message,
            error_code: data.cod
        });
    }

    const forecast = {
        city: city,
        description: data['weather'][0]['description'],
        temperature: [
            data['main']['temp_max'],
            data['main']['temp_min'],
            data['main']['feels_like']
        ] 
    }
    const result = schema.validate(forecast);

    if (result.error == null) {
        forecast.created = new Date();
        return table.insert(forecast);
    } else {
        return Promise.reject(result.error);
    }
}

function checkExpiration(dateObject) {
    const now = (new Date()).getDate();
    return now !== dateObject.getDate();
}

module.exports.process = process;
module.exports.checkExpiration = checkExpiration;
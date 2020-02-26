const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/151b66ec57eac8d2299dec2fb514ec88/' + latitude + ',' + longtitude + '?units=si'
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather servcie!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                Summary: body.daily.data[0].summary,
                Temperature: body.currently.temperature,
                Rain_Percentage: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
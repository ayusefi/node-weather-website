const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/151b66ec57eac8d2299dec2fb514ec88/' + latitude + ',' + longtitude + '?units=si'
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather servcie!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of raining.')
        }
    })
}

module.exports = forecast
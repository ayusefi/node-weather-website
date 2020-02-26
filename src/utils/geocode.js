const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJkdWxsYWh5dXNlZmkiLCJhIjoiY2s3MWt6M3BiMDdtbTNlcG8xaG1tZ2syaiJ9.YIIs_A7a_tfDn-oLwA799g'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
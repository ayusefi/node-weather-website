const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abdullah Yusefi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abdullah Yusefi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help text.',
        title: 'Help',
        name: 'Abdullah Yusefi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'Konya',
    //     address: req.query.address
    // })
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

    
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Abdullah Yusefi',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdullah Yusefi',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log(' Server up and running!')
})
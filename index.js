const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainPageRoute = require('./routes/main');

const app = express();
const config = dotenv.config().parsed;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB');

        app.set('view engine', config.TEMPLATE_ENGINE);
        app.set('views', config.TEMPLATE_VIEW_PATH);


        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(express.static(config.PUBLIC_ROOT));

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });

        app.use('/', mainPageRoute);


        app.listen(process.env.PORT || config.PORT, err => {
            if (err) {
                console.log('ERROR --> ', err)
            } else {
                console.log('Listening on port ' + config.PORT);
            }
        });
    }).catch(err => {
    console.log('Error --> ', err);
});

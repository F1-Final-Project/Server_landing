const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainPageRoute = require('./routes/main');
const nodemailer = require("nodemailer");

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
        var urlencodedParser = bodyParser.urlencoded({ extended: false })
        app.post('/', urlencodedParser, function(req, res) {
            if(!req.body) return res.sendStatus(400)
            console.log(req.body);
            res.render('success');

            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();
              
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                  host: "smtp.ethereal.email",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                  }
                });
              
                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"Fred Foo 👻" <foo@example.com>', // sender address
                  to: "daniel000@ukr.net", // list of receivers
                  subject: "Hello ✔", // Subject line
                  text: `${req.body.name}, ${req.body.phone}, ${req.body.comment}`, // plain text body
                  html: `<b>${req.body.name}, ${req.body.phone}, ${req.body.comment}</b>` // html body
                });
              
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              }
              
              main().catch(console.error);
        })
    }).catch(err => {
    console.log('Error --> ', err);
});

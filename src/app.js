const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const router = require('./api')
const { PORT } = require('./utils/config');
const app = express()

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 8 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_, response, __, options) => {
        // return BaseController.responsHandler(response, options.statusCode, options.message)
    },
});


app.use(bodyParser.json());
const VERSION_1 = '/';
app.use(VERSION_1, limiter);
router(app, VERSION_1);
app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, async () => {
        console.log(`Server running on ${PORT}, Crtl-C to terminate`, {});
    })
}

module.exports = app
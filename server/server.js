const express = require('express');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;
const config = JSON.parse(fs.readFileSync('config.json'));
const cookie_name = 'twitch_dash';

app.use(session({
    secret: config.express.cookie_secret,
    resave: false,
    unset: 'destroy',
    saveUninitialized: false,
    name: cookie_name,
    cookie: {
        httpOnly: false, // need ajax requests to send it
        maxAge: 1000 * 10 * 60 * 60 * 24 * 30 // 30 days in ms
    }
}));

app.use(bodyParser.json());

// @param[message] json hash
function formatResponse(res, status, message) {
    return res.status(status).json(message);
}

function invalidRequest(res) {
    return formatResponse(res, 400, { error: 'Invalid request' });
}

function unauthorized(res) {
    return formatResponse(res, 403, { error: 'Forbidden' });
}

app.post('/api/login', (req, res) => {
    if (!req.body || !req.body.login_secret) {
        console.error('Invalid secret in body');
        return invalidRequest(res);
    }

    if (req.session.authenticated) {
        console.error('Already logged in');
        return formatResponse(res, 200, { message: 'Already logged in' });
    }

    // lol not really secure (timing attack on string length comparison),
    // but good enough for this
    if (req.body.login_secret != config.express.login_secret) {
        console.error(`Incorrect secret specified ${req.body.login_secret}`);
        return invalidRequest(res);
    }

    console.log('Client successfully authenticated... Logging in...');
    req.session.authenticated = true;
    return formatResponse(res, 200, { message: 'Logging in!' });
});

app.get('/api/token', (req, res) => {
    if (!req.session.authenticated) {
        console.error('Request for token is not authenticated');
        return unauthorized(res);
    }

    console.log(`Received request for token: ${req.query.name}`);
    console.log(`Request for token's session: ${req.session.authenticated}`);

    if (!config.token.hasOwnProperty(req.query.name)) {
        console.error('Invalid token name given:', req.query.name);
        return invalidRequest(res);
    }
    return formatResponse(res, 200, { "token": config.token[req.query.name] });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy;
    res.clearCookie(cookie_name);
    return formatResponse(res, 200, { message: 'Logged out' });
});

app.listen(port, () => console.log(`API backend listening on port ${port}`))
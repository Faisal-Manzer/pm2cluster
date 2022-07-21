const tx2 = require('tx2');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const setConfig = (data, noTrigger = false) => {
    app.locals.data = data;
    if (!noTrigger) { 
        tx2.emit('change', data);
    }
}

tx2.action('config', (reply) => {
    reply(app.locals.data);
});

tx2.action('change', (data, reply) => {
    setConfig(data, true);
});

app.get('/set', (req, res) => {
    setConfig(req.query.data);
    res.send(`Config set to ${req.query.data}<br />Navigate to <a href='/'>home</a>`);
});

app.get('/', (req, res) => {
    res.send(`Config is ${app.locals.data || 'N/A'}`);
});

app.listen(port, () => {
    app.locals.data = 'init';
    console.log(`Example app listening on http://localhost:${port}`)
});

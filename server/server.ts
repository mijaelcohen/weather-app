import express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

import apiRouter from './api';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/index.html`));
});

app.use("/v1", apiRouter);

app.use("/dist", express.static(`dist`));

app.listen(3000, ()=>{
    console.log('Weather app is running → PORT 3000');
});
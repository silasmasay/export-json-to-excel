const express = require('express');
// const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./controllers/exportController')(app);

app.listen(8000);
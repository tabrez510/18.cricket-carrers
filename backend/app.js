const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const carrerRoutes = require('./routes/carrer');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', carrerRoutes);

sequelize
    .sync({alter: true})
    .then(() => {
        app.listen(3000, () => console.log('server is running on 3000 PORT'));
    })
    .catch((err) => console.log(err));
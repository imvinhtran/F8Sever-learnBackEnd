const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

const app = express();
//fix undifine when use mongoosedb
app.use(express.json());
app.use(express.urlencoded());

//Method-override

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

// Register `hbs.engine` with the Express app.
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: { sum: (a, b) => a + b },
        defaultLayout: 'main',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(3000);

const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

const app = express();
//fix undifine when use mongoosedb
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

//Method-override

app.use(methodOverride('_method'));

app.use(SortMiddleware);

//Midleware
// app.get('/midleware',
//     function (req, res, next) {
//         if (['vethuong', 'vevip'].includes(req.query.ve)){
//             return next()
//         }
//         res.status(403).json({ message: 'Access denied' })
//     },
//     function (req, res, next) {
//         res.json({
//             message: 'Successfully'
//         })
//     }
// )

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

// Register `hbs.engine` with the Express app.
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sort.type];

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
                </a>`;
            },
        },
        defaultLayout: 'main',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(3000);

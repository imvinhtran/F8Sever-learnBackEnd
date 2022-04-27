const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

// Register `hbs.engine` with the Express app.
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources/views'));


app.get('/', (req, res) => {
    res.render('home');
});
app.get('/news', (req, res) => {
    res.render('news');
});

app.listen(3000);
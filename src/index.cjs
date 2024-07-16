const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser');
const baterai = require('./routes/baterai.cjs')
const mesin = require('./routes/mesin.cjs')
const proximity = require('./routes/proximity.cjs')
const pzem = require('./routes/pzem.cjs')
const history = require('./routes/history.cjs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', baterai);
app.use('/api', mesin);
app.use('/api', proximity);
app.use('/api', pzem);
app.use('/api', history);


app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

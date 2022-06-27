const express = require('express');
const morgan = require('morgan');

const { datesRouter } = require('./routes/covid.routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//endpoinds
app.use('/api/v1/covid-dates', datesRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

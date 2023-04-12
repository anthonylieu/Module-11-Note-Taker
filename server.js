const express = require('express');
const app = express();
const port = 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(process.env.PORT || port, () => {
  console.log('server is running');
});

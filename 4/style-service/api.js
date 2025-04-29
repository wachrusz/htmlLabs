const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3050, () => {
  console.log('Editor available at http://localhost:3050');
});
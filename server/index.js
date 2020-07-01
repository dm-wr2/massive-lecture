require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      ctrl = require('./controller'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//Endpoints
app.get('/api/avengers', ctrl.getHeroes);
app.post('/api/avenger', ctrl.addHero);
app.put('/api/avenger/:id', ctrl.editPower);
app.delete('/api/avenger/:id', ctrl.snapHero);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
var cors = require('cors');

const app = express();
const port = 8000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const database = new Datastore('database.db');
database.loadDatabase();


app.get('/news', async function(request, response) {
    const search = request.query.search; 
    const aq_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=`+ search;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();
    response.send(aq_data);
});

app.post('/news', (request,response) => {
  console.log('I got a request!');
  console.log(request.body);
  response.json();
})

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(',');
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const api_key = process.env.API_KEY;
  const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };
  response.json(data);
});

app.get('/api2', async (request, response) => {
console.log('kek');
  const weather_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=228`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=228`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();
  console.log(aq_data);
  response.json();
});
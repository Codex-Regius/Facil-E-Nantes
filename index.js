const axios = require('axios')
const express = require('express')
const cors = require('cors')
const api = express();
api.use(cors())

api.get('/', (req, res)=> {
  axios.get('https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=3eDEt59IRt4OTDgu72sWOEcUtZjEH3MZFuqEoizPP1M&product=observation&name=Nantes')
  .then(response => {
    res.json(response.data)
  })
})

api.listen(8050, (err)=>{
  if (err){
    console.log(err)
  }
})
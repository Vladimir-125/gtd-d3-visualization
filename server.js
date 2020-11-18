const express   = require('express');
const app       = express();
const fs        = require('fs');
const PORT      = 3000;




// send static files for user
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    return res.sendFile(__dirname + '/index.html')
});

app.get('/data', (req, res)=>{
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    return res.status(200).json(data);
});

app.listen(PORT, ()=> console.log(`Listening at port number ${PORT}...`))
const express   = require('express');
const app       = express();
const fs        = require('fs');
const PORT      = 3000;




// send static files for user
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    return res.sendFile(__dirname + '/index.html')
});

app.get('/map', (req, res)=>{
    return res.sendFile(__dirname + '/leaflet.html')
});

app.get('/table', (req, res)=>{
    return res.sendFile(__dirname + '/gtd-table.html')
});

app.get('/lasso-demo', (req, res)=>{
    return res.sendFile(__dirname + '/lasso_demo.html')
});

app.get('/lasso', (req, res)=>{
    return res.sendFile(__dirname + '/lasso.html')
});

app.get('/timeseries', (req, res)=>{
    return res.sendFile(__dirname + '/timeseries.html')
});

app.get('/data', (req, res)=>{
    // let rawdata = fs.readFileSync('data.json');
    // let data = JSON.parse(rawdata);
    // return res.status(200).json(data);
    return res.sendFile(__dirname + '/data.json')

});

app.get('/table-data', (req, res)=>{
    // let rawdata = fs.readFileSync('./raw_data/data1.json');
    // let data = JSON.parse(rawdata);
    // return res.status(200).json(data);
    return res.sendFile(__dirname + '/raw_data/data1.json')
});

app.get('/time', (req, res)=>{
    // let rawdata = fs.readFileSync('data/dateToUnix_utc.json');
    // let data = JSON.parse(rawdata);
    // return res.status(200).json(data);
    return res.sendFile(__dirname + '/data/dateToUnix_utc.json')

});


app.listen(PORT, ()=> console.log(`Listening at port number ${PORT}...`))
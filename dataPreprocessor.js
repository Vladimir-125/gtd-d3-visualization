const csv = require('csv-parser');
const fs = require('fs');

const data = []

fs.createReadStream('./data/sample.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(row['eventid']!== '' && row['latitude']!== '' && row['longitude']!== ''){
        const json = {
            eventid: row['eventid'],
            latitude: row['latitude'],
            longitude: row['longitude']
        }
        data.push(json);
    }
  })
  .on('end', () => {
    fs.writeFileSync('data.json', JSON.stringify(data));
  });
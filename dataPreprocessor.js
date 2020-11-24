const csv = require('csv-parser');
const fs = require('fs');

const data = []
const file = './data/sample.csv';
//const file = './raw_data/globalterrorismdb_0718dist.csv';
fs.createReadStream(file)
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
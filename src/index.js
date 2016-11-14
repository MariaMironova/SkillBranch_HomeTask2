import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
const fields = ['board', 'image', '', 'video', 'ram', 'os', 'floppy', 'hdd'];

/*{"board":
  { "vendor":"IBM",
    "model":"IBM-PC S-100",
    "cpu":{"model":"80286",
    "hz":12000},
 "image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
 "video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},
 "ram":{
    "vendor":"CTS",
    "volume":1048576,
    "pins":30},
  "os":"MS-DOS 1.25",
  "floppy":0,
  "hdd":
    [{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],
 "monitor":null,"length":42,"height":21,"width":54}*/

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

function getResult(json, key) {
  console.log(key);
  if (json.hasOwnProperty(key) || isFinite(val)) {
    return json[key];
  } else {
    return false;
  }
}

app.get('/', (req, res) => {
  res.json(pc);
});

app.get('/:key', (req, res) => {
  const key = req.params.key;

  if (key == 'volumes') {
    const hdd = pc.hdd;
    const mapOfVol = new Array();
    const volumesMap = {};
    console.log(hdd);
    hdd.forEach((vendor) => {
        const vol = vendor.volume;
        if (volumesMap.hasOwnProperty(vol)) volumesMap[vol] += +vendor.size;
        else volumesMap[vol] = +vendor.size;
     });

     for (var vol in volumesMap)
        if (volumesMap.hasOwnProperty(vol)) volumesMap[vol] += 'B';
     return res.json(volumesMap);
  }


  const result = getResult(pc, key);
  if (result || result == 0) {
    console.log(result);
    return res.json(result);
  } else {
    return res.status(404).send('Not Found');
  }
});

app.get('/:key/:value', (req, res) => {
  const key = req.params.key;
  const value = req.params.value;
  const result = getResult(getResult(pc, key), value);

  if (result) {
    return res.json(result);
  } else {
    return res.status(404).send('Not Found');
  }
});

app.get('/:key/:value/:addValue', (req, res) => {
  res.json(pc);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

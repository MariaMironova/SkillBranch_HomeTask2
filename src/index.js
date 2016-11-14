import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

function getResult(json, key) {
  if (json.hasOwnProperty(key)) {
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
  if (result !== false) {
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

  if (result && value != 'length') {
    return res.json(result);
  } else {
    return res.status(404).send('Not Found');
  }
});

app.get('/:key/:value/:addValue', (req, res) => {
  const key = req.params.key;
  const value = req.params.value;
  const addValue = req.params.addValue;
  const result = getResult(getResult(getResult(pc, key), value), addValue);

  if (result && addValue != 'length') {
    return res.json(result);
  } else {
    return res.status(404).send('Not Found');
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

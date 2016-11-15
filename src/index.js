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


function getVolumes() {
  const hdd = pc.hdd;
  const volumesMap = {};
  hdd.forEach((vendor) => {
      const vol = vendor.volume;
      if (volumesMap.hasOwnProperty(vol)) volumesMap[vol] += +vendor.size;
      else volumesMap[vol] = +vendor.size;
   });

   for (var vol in volumesMap)
      if (volumesMap.hasOwnProperty(vol)) volumesMap[vol] += 'B';
   return volumesMap;
}

app.get('/:key?/:value?/:addValue?', (req, res) => {
  const params = {};
  console.log(req.params.length);
  for (var par in req.params) {
    console.log(par);
    params[par] = req.params[par];
  }

  let result = pc;
  for (var par in params) {
    if (params[par] == 'length' && par != 'key') return res.status(404).send('Not Found');
    if (params[par] == undefined) return result === false ? res.status(404).send('Not Found') : res.json(result);
    if (params[par] == 'volumes') return res.json(getVolumes());
    result = getResult(result, params[par]);
  }
  return result === false ? res.status(404).send('Not Found') : res.json(result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

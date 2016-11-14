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

app.get('/', (req, res) => {
  res.json(pc);
});

app.get('/board', (req, res) => {
  res.json(pc.board);
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

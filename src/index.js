import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

function getColor(color) {
  color = ((color.charAt(0) != '#') ? '#' : '') + color.toLowerCase();
  console.log(color);
  var isOk  = /(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$)/i.test(color);
  if (color.length == 4 && isOk) {
    var newColor = color.substring(0,1) + color.charAt(1) + color.substring(1,3) + color.charAt(2) + color.charAt(3) + color.charAt(3);
    color = newColor;
  }
  return isOk ? color : 'Invalid color';
}

app.get('/', (req, res) => {
  const color = req.query.color;
  if (color === undefined) {
    res.send('Invalid color');
  }
  res.send(getColor(color.trim()));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

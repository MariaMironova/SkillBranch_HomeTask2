import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import hsl from 'hsl-to-hex';

const app = express();
app.use(cors());

function hsl2hex(hslColor) {
  hslColor = hslColor.match(/^hsl\(\s*(\d+)\s*,\s*%20(\d+)%\s*,\s*%20(\d+)%\s*\)$/);
  if ( (!hslColor) || (hslColor[2] < 0) || (hslColor[2] > 100) || (hslColor[3] < 0) || (hslColor[3] > 100)) return 'Invalid color';
  return hsl(hslColor[1], hslColor[2], hslColor[3]);
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
 if (!rgb) return 'Invalid color';
 let result = '#';
 for (var i = 1; i <= 3; i++) {
  var num = parseInt(rgb[i],10);
  if (num > 255 || num < 0) return 'Invalid color';
  result += ("0" + num.toString(16)).slice(-2);
 }
 return result;
}

function hex2hex(color) {
  color = ((color.charAt(0) != '#') ? '#' : '') + color.toLowerCase();
  var isOk  = /(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$)/i.test(color);
  if (color.length == 4 && isOk) {
    var newColor = color.substring(0,1) + color.charAt(1) + color.substring(1,3) + color.charAt(2) + color.charAt(3) + color.charAt(3);
    color = newColor;
  }
  return isOk ? color : 'Invalid color';
}

function getColor(color) {
  if (color.startsWith('rgb'))  return rgb2hex(color);
  if (color.startsWith('hsl')) return hsl2hex(color);
  return hex2hex(color);
}

app.get('/', (req, res) => {
  const color = req.query.color;
  console.log(color);
  if (color === undefined) {
    res.send('Invalid color');
  }
  res.send(getColor(color.trim()));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

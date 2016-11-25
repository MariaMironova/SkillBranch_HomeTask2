import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

//const b = 3/(Math.pow(3/2,1/2)-1);
const rubicPos = [            1,
                             18,
                            243,
                           3240,
                          43254,
                         577368,
                        7706988,
                      102876480,
                     1373243544,
                    18330699168,
                   244686773808,
                  3266193870720,
                 43598688377184,
                581975750199168,
               7768485393179328,
             103697388221736960,
            1384201395738071424,
           18476969736848122368,
          246639261965462754048,
         3292256598848819251200,
        43946585901564160587264];

function blackbox(num) {
  num = parseInt(num, 10);
  if( num < 0 || num > 18) return 'Invalid';
  return rubicPos[num];
  //return Math.round((3+b)/(6*2)*Math.pow(b, num));
}

app.get('/', (req, res) => {
  const num = req.query.i;
  console.log(num);
  if (num === undefined) {
    res.send('Invalid');
  }
  res.send('' + blackbox(num.trim()));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

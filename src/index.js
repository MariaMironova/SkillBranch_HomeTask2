import express from 'express';
import cors from 'cors';
import sum from './sum';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const summa = '' + sum(a, b);
  res.send(summa);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

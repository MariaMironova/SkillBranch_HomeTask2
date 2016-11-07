import express from 'express';
import cors from 'cors';
import fio from './fio';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  const fullname = req.query.fullname;
  res.send(fio(fullname));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

import { Router } from 'express';
import { urlencoded, json } from 'body-parser';

const router = Router();
router.use(urlencoded({ extended: true }));
router.use(json());

// this is a temporary array, later we can connect this to a database such as mongoDb
let bottleCaps = [
  {
    id: 0,
    name: 'Estrella',
    country: 'Spain',
    brewery: 'Küntzmann Damm',
    description: 'Iconic 5 pointed star making it easy to identify, text',
    colors: ['red'],
    logo: 'star',
    year: 2020,
  },
  {
    id: 1,
    name: 'Amstel',
    country: 'Amsterdam',
    brewery: 'Amstel Brewery',
    description: 'Text only bottle cap displaying name and date of brewery',
    colors: ['red', 'white'],
    logo: 'Text only',
    year: 2020,
  },
  {
    id: 2,
    name: 'TedsBeer',
    country: 'Newcastle',
    brewery: 'Amstel Brewery',
    description: 'Text only bottle cap displaying name and date of brewery',
    colors: ['red', 'white'],
    logo: 'Text only',
    year: 2020,
  },
  {
    id: 3,
    name: 'Glenfiddich 12 Year',
    country: 'Scotland',
    brewery: 'Glenfiddich Distillery',
    description: 'Glenfiddich 12 Year Single Malt',
    colors: ['Green'],
    logo: 'Stag',
    year: 2020,
  },
];

router.get('/getAll', async (req, res) => {
  // if no bottle caps are found, return 404, otherwise return all items
  if (bottleCaps.length == 0) {
    res.status(404).json({ message: 'no bottle caps found' });
  }
  res.status(200).json(bottleCaps);
});

router.get('/getById', async (req, res) => {
  // id is stored as a number so we'll try parsing this and return error if not a number
  const id = parseInt(req.query.id);
  if (isNaN(id)) {
    res.status(400).json({
      message: `id must be a number but '${id}' was provided`,
    });
    return;
  }

  // find the bottle cap in the array, if it doesn't exist we will return a 404
  const bottleCap = bottleCaps.find((bottleCap) => bottleCap.id === id);

  if (bottleCap) {
    res.status(200).json(bottleCap);
  } else {
    res.status(404).json({ message: `bottle cap with id '${id}' not found` });
  }
});

router.post('/create', async (req, res) => {
  // read object from body and convert id to number, if number is invalid return 400
  let bottleCap = req.body;
  bottleCap.id = parseInt(bottleCap.id);
  if (isNaN(bottleCap.id)) {
    res.status(400).json({
      message: `id must be a number but '${bottleCap.id}' was provided`,
    });
    return;
  }

  // check that the object doesn't already exist, if it does then return a 400
  if (bottleCaps.find((cap) => cap.id == bottleCap.id)) {
    res.status(400).json({
      message: `a bottle cap with id '${bottleCap.id}' already exists`,
    });
    return;
  }

  // insert object into database and return 204
  bottleCaps.push(bottleCap);
  res.status(204).json();
});

router.put('/update', async (req, res) => {
  // read object from body and convert id to number, if number is invalid return 400
  let bottleCap = req.body;
  bottleCap.id = parseInt(bottleCap.id);
  if (isNaN(bottleCap.id)) {
    res.status(400).json({
      message: `id must be a number but '${bottleCap.id}' was provided`,
    });
    return;
  }

  // search for bottle cap, if it exists we'll replace it, otherwise return 404
  let index = bottleCaps.findIndex((cap) => cap.id == bottleCap.id);
  if (index !== -1) {
    bottleCaps[index] = bottleCap;
    res.status(204).json();
  } else {
    res.status(404).json({ message: `bottle cap with id '${bottleCap.id}' not found` });
  }
});

router.delete('/deleteById', async (req, res) => {
  // read object from body and convert id to number, if number is invalid return 400
  const id = parseInt(req.query.id);
  if (isNaN(id)) {
    res.status(400).json({
      message: `id must be a number but '${id}' was provided`,
    });
    return;
  }

  // search for bottle cap, if it exists we'll remove it from the database, otherwise return 404
  let index = bottleCaps.findIndex((cap) => cap.id == id);
  if (index !== -1) {
    bottleCaps.splice(index, 1);
    res.status(204).json();
  } else {
    res.status(404).json({ message: `bottle cap with id '${id}' not found` });
  }
});

export default router;

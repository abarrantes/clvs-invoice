const express     = require('express');
const apiRouter   = express.Router();
const Item        = require('../models/item');

/* GET home page */
apiRouter.get('/api/items', (req, res, next) => {
  Item.find().sort({itemCode:1})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.get('/api/itemName', (req, res, next) => {
  console.log(req.query.itemCode);
  let code = req.query.itemCode;
  Item.find({itemCode:code})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

module.exports = apiRouter;

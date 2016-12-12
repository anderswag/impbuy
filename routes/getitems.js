"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (opHelper) => {

  router.get("/", (req, res) => {
      //Query
      opHelper.execute('ItemSearch', {
        'SearchIndex': 'Books',
        'Keywords': 'harry potter',
        'ResponseGroup': 'ItemAttributes,Offers,Images'
      }).then((response) => {
          console.log("Results object: ", response.result.ItemSearchResponse.Items.Item[0].ImageSets.ImageSet[0].LargeImage);
          // console.log("Raw response body: ", response.responseBody);
          res.json(response.result.ItemSearchResponse.Items.Item[0].ImageSets.ImageSet[0].LargeImage)
      }).catch((err) => {
          console.error("Something went wrong! ", err);
      });
  });

  return router;
}

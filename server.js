"use strict";

require('dotenv').config();

const PORT            = process.env.PORT || 8080;
const ENV             = process.env.ENV || "development";
const express         = require("express");
const bodyParser      = require("body-parser");
const sass            = require("node-sass-middleware");
const app             = express();
const util            = require('util')
const OperationHelper = require('apac').OperationHelper;
// const knexConfig  = require("./knexfile");
// const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
// const knexLogger  = require('knex-logger');



// Credentials
const opHelper = new OperationHelper({
    awsId:     process.env.AWSAccessKeyId,
    awsSecret: process.env.AWSSecretKey,
    assocId:   process.env.AWSTag,
    locale: 'CA'
});

//Query
opHelper.execute('ItemSearch', {
  'SearchIndex': 'Books',
  'Keywords': 'harry potter',
  'ResponseGroup': 'ItemAttributes,Offers,Images'
}).then((response) => {
    console.log("Results object: ", response.result.ItemSearchResponse.Items.Item[0].ImageSets.ImageSet[0].LargeImage);
    // console.log("Raw response body: ", response.responseBody);
}).catch((err) => {
    console.error("Something went wrong! ", err);
});


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

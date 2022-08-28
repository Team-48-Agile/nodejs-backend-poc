const express = require("express");
const bodyParser= require ("body-parser");
const app = express();
const port = 8084;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) // for parsing application/json
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

require("./routes/main")(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.engine("html", require("ejs").renderFile);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port: ${port}!`));
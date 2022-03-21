const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();
const PORT = process.env.PORT || 8080;
const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

server.use(cors());
server.use(bodyParser.json());

client.connect()
  .then(client => {
    const db = client.db("everheardof");
    console.log("Connected.");

    db.collection("users").find().toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    })

    

    server.listen(PORT, () => {
      console.log("Server listening on PORT " + PORT)
    })
  }).catch(err => {
    console.error("Client couldn't connect.")
    console.error(err);
  })





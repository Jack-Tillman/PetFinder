
// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// route to serve stylesheet
app.get("/styles.css", (req, res) => {
  res.sendFile(`${__dirname}/public/styles.css`);
});
// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(`${__dirname}/public/index.html`);
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response;
  res.send(pets);
});

// get pet by owner with query string, so at localhost:8080/api/v1/pets/owner?owner=John
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  const { owner } = req.query;

  // changed from find to filter to capture owners that own more than 1 dog
  const pet = pets.filter((pet) => pet.owner === owner);
  console.log(pet);

  // send the pet as a response
  res.send(pet);
});

// get pet by name, so at localhost:8080/api/v1/pets/Rover , for example 
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const { name } = req.params;
  // console.log(name);

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);
  // send the pet as a response
  res.send(pet);
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;

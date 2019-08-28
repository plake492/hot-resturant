// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// console.log("Hello!");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Tables & Waiting List (DATA)
// =============================================================
const tables = [
    {
      routeName: "ashleymorales",
      name: "Ashley Morales",
      email: "ashley@me.com",
      phone: "407-407-4077",
      id: "garbage"
    },
    {
        routeName: "connordurham",
        name: "Connor Durham",
        email: "connor@me.com",
        phone: "222-222-2225",
        id: "moregarbage"
    },
    {
        routeName: "patricklake",
        name: "Patrick Lake",
        email: "patrick@me.com",
        phone: "555-555-4555",
        id: "words"
    },
    {
        routeName: "jenross",
        name: "Jen Ross",
        email: "jen@me.com",
        phone: "333-333-3336",
        id: "themostgarbage"
    },
  ];
  // Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  
//   Displays all tables
  app.get("/api/people", function(req, res) {
    return res.json(tables);
  });
  
  // Displays a single character, or returns false
  app.get("/api/people/:tables", function(req, res) {
    let chosen = req.params.tables;
  
    console.log(chosen);
  
    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].id) {
        return res.json(tables[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Reservation - takes in JSON input
  app.post("/api/people", function(req, res) {
 
    let newTable = req.body;

    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    tables.push(newTable);
  
    res.json(newTable);
  });
  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
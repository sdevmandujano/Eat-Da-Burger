var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create Routes
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
    
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([req.body.name], function(result) {
  
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;



    burger.update(req.body, condition, function(result) {
        if (result.changedRows == 0) {
           
            return res.status(404).end();
        } else {
          res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
        
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;


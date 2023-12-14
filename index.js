import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "";


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-data", async (req, res) => {
  
  var search=req.body.id;
  

  try {
    const response = await axios.get(API_URL+`search?q=${search}`);
    const result = response.data;
    res.render("index.ejs", { 
      data: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/get-data", async (req, res) => {
  console.log(req.body);
  var vehicle=req.body.vehicle;
  

  try {
    const response = await axios.get(API_URL+`/filter?vehicle_friendly_name=${vehicle}`);
    const result = response.data;
    res.render("index.ejs", { 
      data: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

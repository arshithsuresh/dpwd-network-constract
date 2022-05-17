const express = require('express');
const app = express.Router();

const HandleRoadProjectRequests = require('./roadproject/RoadProjectAPI');
const HandleComplaintRequests = require('./complaint/ComplaintAPI');

app.use("/projects",HandleRoadProjectRequests);
app.use("/complaints",HandleComplaintRequests);

module.exports = app;

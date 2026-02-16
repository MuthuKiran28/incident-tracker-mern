const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidentController");

router.post("/", controller.createIncident);
router.get("/", controller.getIncidents);
router.get("/:id", controller.getIncidentById);
router.patch("/:id", controller.updateIncident);

module.exports = router;

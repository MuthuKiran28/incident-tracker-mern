const Incident = require("../models/Incident");

// Create
exports.createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All with pagination
exports.getIncidents = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    severity,
    status,
    search,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = {};

  if (severity) query.severity = severity;
  if (status) query.status = status;
  if (search) query.$text = { $search: search };

  const total = await Incident.countDocuments(query);

  const incidents = await Incident.find(query)
    .sort({ [sortBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    incidents,
  });
};

// Get by ID
exports.getIncidentById = async (req, res) => {
  const incident = await Incident.findById(req.params.id);
  res.json(incident);
};

// Update
exports.updateIncident = async (req, res) => {
  const incident = await Incident.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(incident);
};


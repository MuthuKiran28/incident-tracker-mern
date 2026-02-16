const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    service: { type: String, required: true },
    severity: {
      type: String,
      enum: ["SEV1", "SEV2", "SEV3", "SEV4"],
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "MITIGATED", "RESOLVED"],
      default: "OPEN",
    },
    owner: String,
    summary: String,
  },
  { timestamps: true }
);

incidentSchema.index({ severity: 1 });
incidentSchema.index({ status: 1 });
incidentSchema.index({ title: "text", summary: "text" });

module.exports = mongoose.model("Incident", incidentSchema);

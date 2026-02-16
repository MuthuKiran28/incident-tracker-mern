const mongoose = require("mongoose");
const Incident = require("./models/Incident");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function seed() {
  await Incident.deleteMany();

  const data = [];

  for (let i = 1; i <= 200; i++) {
    data.push({
      title: `Incident ${i}`,
      service: i % 2 === 0 ? "Billing" : "Auth",
      severity: ["SEV1", "SEV2", "SEV3", "SEV4"][i % 4],
      status: "OPEN",
      owner: `Engineer ${i}`,
      summary: `Sample incident ${i}`,
    });
  }

  await Incident.insertMany(data);
  console.log("Seeded 200 incidents");
  process.exit();
}

seed();

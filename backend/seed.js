const mongoose = require("mongoose");
const Incident = require("./models/Incident");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB:", mongoose.connection.name);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPastDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // last 30 days
  const randomDate = new Date(
    now.getTime() - daysAgo * 24 * 60 * 60 * 1000
  );
  return randomDate;
}

async function seed() {
  try {
    await connectDB();

    await Incident.deleteMany();
    console.log("Old incidents removed");

    const services = ["Auth", "Billing", "Payments", "Search", "Analytics"];
    const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
    const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

    const data = [];

    for (let i = 1; i <= 200; i++) {
      data.push({
        title: `Incident ${i}`,
        service: getRandomElement(services),
        severity: getRandomElement(severities),
        status: getRandomElement(statuses),
        owner: `Engineer ${Math.floor(Math.random() * 10) + 1}`,
        summary: `This is a simulated production issue for testing purposes.`,
        createdAt: getRandomPastDate(),
        updatedAt: new Date(),
      });
    }

    await Incident.insertMany(data);

    console.log("Seeded 200 incidents successfully 🎉");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();

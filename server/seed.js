import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Force path alignment for the .env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

import Event from './src/models/Event.js';
import Seat from './src/models/Seat.js';
import User from './src/models/User.js';
import Booking from './src/models/Booking.js';

const mockEvents = [
  {
    title: "Global Tech Summit 2026",
    description: "The ultimate gathering for elite full-stack and backend software engineering professionals.",
    date: new Date("2026-10-15T09:00:00Z"),
    venue: "Expo Center, Lahore"
  },
  {
    title: "Rock Fest Live",
    description: "An evening of incredible live music and high-energy stadium performances.",
    date: new Date("2026-11-20T18:30:00Z"),
    venue: "Gaddafi Stadium, Lahore"
  }
];

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not found in env variables!");

    console.log("📡 Connecting to database for seeding...");
    await mongoose.connect(uri);

    // 1. CLEAR EXISTING DATA (Fresh start every time you run the script)
    console.log("🧹 Wiping old collections clean...");
    await Event.deleteMany({});
    await Seat.deleteMany({});
    await Booking.deleteMany({});
    // Note: We leave Users alone so you don't delete your test accounts

    // 2. INSERT EVENTS
    console.log("📅 Seeding mock events...");
    const createdEvents = await Event.insertMany(mockEvents);

    // 3. GENERATE SEATS FOR EACH EVENT Dynamically
    console.log("🪑 Generating 50 clean seats per event...");
    const rows = ['A', 'B', 'C', 'D', 'E']; // 5 rows
    const seatsToInsert = [];

    for (const event of createdEvents) {
      for (const row of rows) {
        for (let seatNum = 1; seatNum <= 10; seatNum++) { // 10 seats per row
          seatsToInsert.push({
            eventId: event._id,
            seatNumber: `${row}-${seatNum}`, // Creates "A-1", "A-2", ..., "E-10"
            status: 'Available',
            lockedBy: null,
            expiresAt: null
          });
        }
      }
    }

    await Seat.insertMany(seatsToInsert);
    console.log(`✅ Success! Successfully seeded ${createdEvents.length} events and ${seatsToInsert.length} seats.`);
    
    // Exit script cleanly
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed radically: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

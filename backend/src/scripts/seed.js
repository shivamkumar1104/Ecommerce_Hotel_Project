/**
 * Database Seed Script
 * Populates the MongoDB database with initial suite data from frontend hotelData.js
 *
 * Usage: node src/scripts/seed.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Suite from "../models/Suite.js";

dotenv.config();

const SUITES_SEED = [
  {
    name: "Infinity Pool Ocean Villa",
    category: "villa",
    shortDescription: "A private oceanfront villa with heated infinity pool and personal butler service.",
    description:
      "Perched gracefully above the water's edge, this private villa features an expansive heated infinity pool, outdoor rainfall shower, floor-to-ceiling glass walls, and a dedicated 24-hour personal butler.",
    pricePerNight: 950,
    currency: "USD",
    maxGuests: 4,
    bedrooms: 1,
    bathrooms: 2,
    size: { sqft: 1990, sqm: 185 },
    view: "ocean",
    isFeatured: true,
    amenities: [
      "Private Heated Infinity Pool",
      "24/7 Personal Butler Service",
      "Freestanding Marble Soaking Tub",
      "Espresso & Botanical Bar",
      "Bose Surround Sound System",
      "Complimentary Sunset Champagne",
    ],
    images: [
      {
        url: "../images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg",
        alt: "Infinity Pool Ocean Villa exterior",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        alt: "Villa interior bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        alt: "Villa bathroom",
      },
    ],
    addons: [
      { name: "Helicopter Transfer", description: "Private helicopter arrival & departure", price: 800, icon: "helicopter" },
      { name: "Sunset Spa Ritual", description: "90-min couples spa treatment", price: 350, icon: "spa" },
      { name: "Champagne Breakfast", description: "In-villa champagne breakfast for two", price: 120, icon: "champagne" },
    ],
  },
  {
    name: "Royal Equilibre Penthouse",
    category: "penthouse",
    shortDescription: "The crown jewel — rooftop plunge pool, private elevator, wine cellar and stargazing deck.",
    description:
      "The crown jewel of Equalirio. Occupying the top floor, this penthouse offers a private rooftop plunge pool, private elevator access, wine cellar, stargazing telescope deck, and bespoke spa suite.",
    pricePerNight: 1850,
    currency: "USD",
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 3,
    size: { sqft: 3440, sqm: 320 },
    view: "city",
    isFeatured: true,
    amenities: [
      "Private Rooftop Plunge Pool",
      "Private Elevator Access",
      "In-Suite Wine Cellar",
      "Private Sauna & Steam Room",
      "Chef's Private Dining Prep Room",
      "Helicopter Transfer Included",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        alt: "Royal Penthouse living area",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        alt: "Penthouse bedroom",
      },
    ],
    addons: [
      { name: "Private Chef", description: "Exclusive 3-course dinner by our Michelin-starred chef", price: 500, icon: "chef" },
      { name: "Helicopter Transfer", description: "Private helicopter arrival & departure", price: 800, icon: "helicopter" },
    ],
  },
  {
    name: "Rainforest Sanctuary Suite",
    category: "suite",
    shortDescription: "A canopy-level eco suite with open-air baths and living walls of tropical greenery.",
    description:
      "Suspended above the forest floor, this eco-harmony suite blurs the boundary between interior and wilderness, with an open-air soaking tub, living wall of tropical plants, and a private forest meditation deck.",
    pricePerNight: 680,
    currency: "USD",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    size: { sqft: 1290, sqm: 120 },
    view: "garden",
    isFeatured: false,
    amenities: [
      "Open-Air Forest Soaking Tub",
      "Living Tropical Plant Wall",
      "Private Forest Meditation Deck",
      "Organic Botanical Minibar",
      "Solar-Powered Climate Control",
      "Biodegradable Amenities Kit",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
        alt: "Rainforest Sanctuary Suite exterior",
        isPrimary: true,
      },
    ],
    addons: [
      { name: "Jungle Yoga Session", description: "Private sunrise yoga in the rainforest", price: 90, icon: "yoga" },
      { name: "Sunset Spa Ritual", description: "90-min botanical spa treatment", price: 280, icon: "spa" },
    ],
  },
  {
    name: "Ocean Signature Suite",
    category: "ocean",
    shortDescription: "Uninterrupted ocean panoramas, a private plunge pool terrace and bespoke butler.",
    description:
      "Wake up to the sound of waves in this expansive ocean-view suite featuring a private plunge pool terrace, wraparound glass walls, handcrafted teak furnishings, and a bespoke turn-down ritual.",
    pricePerNight: 1200,
    currency: "USD",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 2,
    size: { sqft: 1500, sqm: 139 },
    view: "ocean",
    isFeatured: true,
    amenities: [
      "Private Plunge Pool Terrace",
      "Panoramic Ocean Wraparound Glass",
      "Handcrafted Teak Furnishings",
      "Bespoke Butler Turn-Down Ritual",
      "Nespresso & Artisan Tea Collection",
      "Direct Beach Concierge Access",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
        alt: "Ocean Signature Suite view",
        isPrimary: true,
      },
    ],
    addons: [
      { name: "Private Sailing Trip", description: "Half-day private catamaran excursion", price: 600, icon: "sail" },
      { name: "Champagne Breakfast", description: "In-suite champagne breakfast for two", price: 120, icon: "champagne" },
    ],
  },
];

const seed = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not set in .env");
    }

    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing suites
    await Suite.deleteMany({});
    console.log("🗑  Cleared existing suites");

    // Insert seed data
    const inserted = await Suite.insertMany(SUITES_SEED);
    console.log(`✅ Seeded ${inserted.length} suites:`);
    inserted.forEach((s) => console.log(`   • ${s.name} (${s.slug}) — $${s.pricePerNight}/night`));

    await mongoose.disconnect();
    console.log("\n🎉 Seed complete! Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();

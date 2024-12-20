const express = require("express");
const ServerlessHttp = require("serverless-http");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Mocked data for carriers
const carriers = [
      { name: "DHL Express", cost: 12.5, co2Emissions: 2.5, deliveryTime: 1, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.8, itemType: "fragile", category: "Express" },
    { name: "FedEx", cost: 11.0, co2Emissions: 2.2, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.7, itemType: "cold", category: "Express" },
    { name: "UPS", cost: 13.0, co2Emissions: 2.8, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.6, itemType: "fragile", category: "Normal" },
    { name: "Blue Dart", cost: 10.0, co2Emissions: 3.0, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.5, itemType: "standard", category: "Normal" },
    { name: "India Post", cost: 7.0, co2Emissions: 4.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "cold", category: "Green" },
    { name: "Royal Mail", cost: 9.5, co2Emissions: 3.5, deliveryTime: 3, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.3, itemType: "fragile", category: "Green" },
    { name: "Aramex", cost: 8.5, co2Emissions: 3.3, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.1, itemType: "standard", category: "Normal" },
    { name: "TNT", cost: 11.8, co2Emissions: 2.7, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.4, itemType: "fragile", category: "Express" },
    { name: "La Poste", cost: 9.0, co2Emissions: 3.2, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.2, itemType: "cold", category: "Normal" },
    { name: "Yamato Transport", cost: 14.0, co2Emissions: 2.9, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.6, itemType: "fragile", category: "Express" },
    { name: "Singapore Post", cost: 7.5, co2Emissions: 3.8, deliveryTime: 4, serviceOptions: ["Free Pickup"], rating: 3.8, itemType: "standard", category: "Green" },
    { name: "China Post", cost: 8.0, co2Emissions: 4.1, deliveryTime: 5, serviceOptions: ["Drop-off", "Free Pickup"], rating: 3.6, itemType: "cold", category: "Green" },
    { name: "Canada Post", cost: 12.0, co2Emissions: 3.0, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.2, itemType: "standard", category: "Normal" },
    { name: "Australia Post", cost: 11.5, co2Emissions: 3.3, deliveryTime: 3, serviceOptions: ["Drop-off"], rating: 4.1, itemType: "cold", category: "Normal" },
    { name: "USPS", cost: 9.8, co2Emissions: 3.6, deliveryTime: 2, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "standard", category: "Normal" },
    { name: "Correos", cost: 8.7, co2Emissions: 3.9, deliveryTime: 4, serviceOptions: ["Drop-off", "Free Pickup"], rating: 3.7, itemType: "cold", category: "Green" },
    { name: "Hermes", cost: 10.2, co2Emissions: 2.9, deliveryTime: 3, serviceOptions: ["Drop-off"], rating: 4.3, itemType: "fragile", category: "Normal" },
    { name: "DPD", cost: 9.3, co2Emissions: 3.7, deliveryTime: 3, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.2, itemType: "standard", category: "Normal" },
    { name: "GLS", cost: 8.2, co2Emissions: 4.0, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 3.9, itemType: "fragile", category: "Green" },
    { name: "SF Express", cost: 10.5, co2Emissions: 3.2, deliveryTime: 2, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "cold", category: "Normal" },
    { name: "Nippon Express", cost: 12.3, co2Emissions: 3.4, deliveryTime: 1, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.5, itemType: "fragile", category: "Express" },
    { name: "Purolator", cost: 8.9, co2Emissions: 3.8, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 4.0, itemType: "standard", category: "Green" },
    { name: "Cainiao", cost: 7.8, co2Emissions: 4.1, deliveryTime: 5, serviceOptions: ["Drop-off", "Free Pickup"], rating: 3.5, itemType: "cold", category: "Green" },
    { name: "ZTO Express", cost: 8.3, co2Emissions: 3.9, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 3.6, itemType: "fragile", category: "Normal" },
    { name: "An Post", cost: 9.0, co2Emissions: 3.7, deliveryTime: 3, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.0, itemType: "cold", category: "Normal" },
    { name: "PostNL", cost: 9.8, co2Emissions: 3.3, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.1, itemType: "standard", category: "Normal" },
    { name: "Poczta Polska", cost: 8.5, co2Emissions: 3.5, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 3.8, itemType: "cold", category: "Green" },
    { name: "Pos Malaysia", cost: 10.0, co2Emissions: 3.6, deliveryTime: 2, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "standard", category: "Normal" },
    { name: "New Zealand Post", cost: 11.0, co2Emissions: 3.4, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.2, itemType: "cold", category: "Normal" },
    { name: "Hongkong Post", cost: 10.8, co2Emissions: 3.3, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.3, itemType: "fragile", category: "Normal" }
];

// Predefined carrier sets for specific routes
const routeCarrierMap = {
  "Mumbai to UAE": carriers.slice(0, 10),
  "Delhi to LA": carriers.slice(10, 20),
  "Chennai to Japan": carriers.slice(20, 30),
};


app.get("/.netlify/functions/api", (req, res) => {
    try {
      // Extract input parameters from query
      const {
        src,
        dest,
        weight,
        idealShippingDuration,
        itemType,
        shippingCategory,
      } = req.query;
  
      // Validate inputs
      if (
        !src ||
        !dest ||
        !weight ||
        !idealShippingDuration ||
        !itemType ||
        !shippingCategory
      ) {
        return res.status(400).json({
          success: false,
          error:
            "All fields (source, destination, weight, ideal shipping duration, item type, and shipping category) are required.",
        });
      }
  
      // Match the route
      const routeKey = `${src} to ${dest}`;
      const routeCarriers = routeCarrierMap[routeKey];
  
      if (!routeCarriers) {
        return res.status(404).json({
          success: false,
          error: `No carriers found for the route "${routeKey}".`,
        });
      }
  
      // Filter carriers based on criteria
      const filteredCarriers = routeCarriers.filter(
        (carrier) =>
          carrier.deliveryTime <= idealShippingDuration &&
          carrier.itemType === itemType &&
          (shippingCategory === "Express"
            ? carrier.deliveryTime <= 2
            : shippingCategory === "Normal"
            ? carrier.deliveryTime <= 5
            : shippingCategory === "Green"
            ? carrier.co2Emissions <= 3.0
            : true) // Allow all if no valid category is provided
      );
  
      // Sort filtered carriers by cost (ascending)
      const sortedCarriers = filteredCarriers.sort((a, b) => a.cost - b.cost);
  
      // Limit to 4-5 carriers or return all if fewer
      const finalCarriers = sortedCarriers.slice(
        0,
        Math.max(5, sortedCarriers.length)
      );
  
      if (finalCarriers.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No carriers match the specified criteria.",
        });
      }
  
      res.json({ success: true, carriers: finalCarriers });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({
        success: false,
        error: "An internal error occurred. Please try again later.",
      });
    }
  });
  
  module.exports.handler = ServerlessHttp(app);
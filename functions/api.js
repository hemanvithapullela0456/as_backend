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
        { name: "DHL Express", cost: 12.5, co2Emissions: 2.5, deliveryTime: 1, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.8, itemType: "fragile", category: "Express", weight: 1 },
        { name: "FedEx", cost: 11.0, co2Emissions: 2.2, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.7, itemType: "cold", category: "Express", weight: 2 },
        { name: "UPS", cost: 13.0, co2Emissions: 2.8, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.6, itemType: "fragile", category: "Normal", weight: 2.5 },
        { name: "Blue Dart", cost: 10.0, co2Emissions: 3.0, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.5, itemType: "standard", category: "Normal", weight: 3 },
        { name: "India Post", cost: 7.0, co2Emissions: 4.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "cold", category: "Green", weight: 4 },
        { name: "TNT", cost: 9.0, co2Emissions: 2.4, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.3, itemType: "fragile", category: "Normal", weight: 1 },
        { name: "Aramex", cost: 14.0, co2Emissions: 3.2, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.4, itemType: "standard", category: "Green", weight: 2 },
        { name: "Royal Mail", cost: 6.0, co2Emissions: 3.5, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 4.2, itemType: "cold", category: "Normal", weight: 2.5 },
        { name: "USPS", cost: 8.5, co2Emissions: 3.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.1, itemType: "fragile", category: "Express", weight: 3 },
        { name: "Canada Post", cost: 7.5, co2Emissions: 2.9, deliveryTime: 3, serviceOptions: ["Drop-off"], rating: 4.0, itemType: "cold", category: "Normal", weight: 4 },
        { name: "DHL Express", cost: 12.5, co2Emissions: 2.5, deliveryTime: 1, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.8, itemType: "fragile", category: "Express", weight: 1 },
        { name: "FedEx", cost: 11.0, co2Emissions: 2.2, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.7, itemType: "cold", category: "Express", weight: 2 },
        { name: "UPS", cost: 13.0, co2Emissions: 2.8, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.6, itemType: "fragile", category: "Normal", weight: 2.5 },
        { name: "Blue Dart", cost: 10.0, co2Emissions: 3.0, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.5, itemType: "standard", category: "Normal", weight: 3 },
        { name: "India Post", cost: 7.0, co2Emissions: 4.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "cold", category: "Green", weight: 4 },
        { name: "TNT", cost: 9.0, co2Emissions: 2.4, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.3, itemType: "fragile", category: "Normal", weight: 1 },
        { name: "Aramex", cost: 14.0, co2Emissions: 3.2, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.4, itemType: "standard", category: "Green", weight: 2 },
        { name: "Royal Mail", cost: 6.0, co2Emissions: 3.5, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 4.2, itemType: "cold", category: "Normal", weight: 2.5 },
        { name: "USPS", cost: 8.5, co2Emissions: 3.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.1, itemType: "fragile", category: "Express", weight: 3 },
        { name: "Canada Post", cost: 7.5, co2Emissions: 2.9, deliveryTime: 3, serviceOptions: ["Drop-off"], rating: 4.0, itemType: "cold", category: "Normal", weight: 4 },
        { name: "DHL Express", cost: 12.5, co2Emissions: 2.5, deliveryTime: 1, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.8, itemType: "fragile", category: "Express", weight: 1 },
        { name: "FedEx", cost: 11.0, co2Emissions: 2.2, deliveryTime: 1, serviceOptions: ["Drop-off"], rating: 4.7, itemType: "cold", category: "Express", weight: 2 },
        { name: "UPS", cost: 13.0, co2Emissions: 2.8, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.6, itemType: "fragile", category: "Normal", weight: 2.5 },
        { name: "Blue Dart", cost: 10.0, co2Emissions: 3.0, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.5, itemType: "standard", category: "Normal", weight: 3 },
        { name: "India Post", cost: 7.0, co2Emissions: 4.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.0, itemType: "cold", category: "Green", weight: 4 },
        { name: "TNT", cost: 9.0, co2Emissions: 2.4, deliveryTime: 2, serviceOptions: ["Drop-off", "Free Pickup"], rating: 4.3, itemType: "fragile", category: "Normal", weight: 1 },
        { name: "Aramex", cost: 14.0, co2Emissions: 3.2, deliveryTime: 2, serviceOptions: ["Drop-off"], rating: 4.4, itemType: "standard", category: "Green", weight: 2 },
        { name: "Royal Mail", cost: 6.0, co2Emissions: 3.5, deliveryTime: 4, serviceOptions: ["Drop-off"], rating: 4.2, itemType: "cold", category: "Normal", weight: 2.5 },
        { name: "USPS", cost: 8.5, co2Emissions: 3.0, deliveryTime: 3, serviceOptions: ["Free Pickup"], rating: 4.1, itemType: "fragile", category: "Express", weight: 3 },
        { name: "Canada Post", cost: 7.5, co2Emissions: 2.9, deliveryTime: 3, serviceOptions: ["Drop-off"], rating: 4.0, itemType: "cold", category: "Normal", weight: 4 }
      ];
      


const additionalCarriers = [];
const baseNames = ["RapidMove", "SwiftTrans", "GlobalShippers", "EcoMove", "SureSafe"];
const itemTypes = ["fragile", "cold", "standard"];
const categories = ["Express", "Normal", "Green"];
const deliveryTimes = [1, 2, 3, 4, 5]; // In days
const serviceOptions = ["Drop-off", "Free Pickup"];
const weights = [1, 2,2.5,3,4]; // Use this for UI filtering later

let id = 1;

baseNames.forEach((baseName) => {
  itemTypes.forEach((itemType) => {
    categories.forEach((category) => {
      deliveryTimes.forEach((time) => {
        additionalCarriers.push({
          id: id++, // Unique ID for easy management
          name: `${baseName} - ${itemType} - ${category}`,
          cost: parseFloat((5 + Math.random() * 10).toFixed(2)), // Randomized cost
          co2Emissions: parseFloat((2 + Math.random() * 3).toFixed(2)), // Randomized CO2
          deliveryTime: time,
          serviceOptions: serviceOptions.slice(0, Math.random() > 0.5 ? 1 : 2), // Randomize options
          rating: parseFloat((3 + Math.random()).toFixed(1)), // Ratings between 3.0 and 4.9
          itemType: itemType,
          category: category,
          weight: weights[Math.floor(Math.random() * weights.length)], // Randomly select weight from the array
        });
      });
    });
  });
});


// Predefined carrier sets for specific routes
const routeCarrierMap = {
    "Mumbai to UAE": carriers.slice(0, 10),
    "Delhi to LA": carriers.slice(10, 20),
    "Chennai to Japan": carriers.slice(20, 30),
  };
  
  // Merge predefined and additional carriers into the routeCarrierMap
  const allCarriers = [...carriers, ...additionalCarriers];
  
  // Regenerate the routeCarrierMap to include additional carriers
  Object.keys(routeCarrierMap).forEach((route) => {
    routeCarrierMap[route] = [
      ...routeCarrierMap[route],
      ...additionalCarriers.slice(0, 10), // Optionally, limit the additional carriers per route
    ];
  });
  
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
      const availableCarriers = routeCarriers.length > 0 ? routeCarriers : allCarriers;
  
      const filteredCarriers = availableCarriers.filter((carrier) => {
        const isWithinDeliveryTime =
          (idealShippingDuration === "0-5" && carrier.deliveryTime >= 0 && carrier.deliveryTime <= 5) ||
          (idealShippingDuration === "5-10" && carrier.deliveryTime > 5 && carrier.deliveryTime <= 10) ||
          (idealShippingDuration === "10-15" && carrier.deliveryTime > 10 && carrier.deliveryTime <= 15) ||
          (idealShippingDuration === "15+" && carrier.deliveryTime > 15);
      
        const matchesItemType = carrier.itemType === itemType;
      
        const matchesShippingCategory =
          shippingCategory === "Express"
            ? carrier.deliveryTime <= 2
            : shippingCategory === "Normal"
            ? carrier.deliveryTime <= 5
            : shippingCategory === "Green"
            ? carrier.co2Emissions <= 3.0
            : true; // Allow all if no valid category is provided
      
        const matchesWeight = carrier.weight >= parseFloat(weight);  // Update to allow weight >= input weight
      
        return isWithinDeliveryTime && matchesItemType && matchesShippingCategory && matchesWeight;
      });
      
  
      // Sort filtered carriers by cost (ascending)
      const sortedCarriers = filteredCarriers.sort((a, b) => a.cost - b.cost);
  
      // Limit to 4-5 carriers or return all if fewer
      const finalCarriers = sortedCarriers.slice(0, Math.min(5, sortedCarriers.length));
  
      if (finalCarriers.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No carriers match the specified criteria.",
        });
      }
  
      res.json({ success: true, carriers: finalCarriers });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "An error occurred while processing the request.",
      });
    }
  });
  
  module.exports.handler = ServerlessHttp(app);  // Closing this outside of 
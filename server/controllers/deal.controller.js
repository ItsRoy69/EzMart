const RetailerDeal = require("../mongodb_models/retailerDealModel");

const createDeals = async (req, res) => {
  try {
    // Get Deal data from the request body
    const { title, product, quantity, deal } = req.body;

    // Create a new RetailerDeal document
    const newDeal = new RetailerDeal({
      title,
      product,
      quantity,
      deal,
      // You might also need to associate the Deal with the retailer who created it
      // retailerId: req.user._id, // Assuming you have user authentication implemented
    });

    // Save the new Deal to the database
    await newDeal.save();

    res.status(201).json({ message: "Retailer Deal created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the Deal" });
  }
};

const fetchDeals = async (req, res) => {
  try {
    // Fetch all retailer Deals from the database
    const Deals = await RetailerDeal.find();

    res.status(200).json(Deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Deals" });
  }
};



module.exports = { createDeals, fetchDeals };

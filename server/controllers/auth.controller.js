const RetailerData = require("../mongodb_models/retailerDataModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { email, retailerId, password } = req.body;
    const registerUserEmail = await RetailerData.find({ email });
    if (registerUserEmail?.length > 0) {
        throw new Error("Retailer already exists with this email.");
    }
    const registerUserID = await RetailerData.find({ retailerId });
    if (registerUserID?.length > 0) {
        throw new Error("Retailer already exists with this ID.");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const retailer = new RetailerData({...req.body, password: hashedPassword});
    await retailer.save();
    res.status(201).json({
      message: `Retailer registered successfully`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message ?? "An error occurred while registering the retailer." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const retailer = await RetailerData.findOne({ email });

    if (!retailer) {
      throw new Error("Retailer not found.");
    }

    const comparePassword = await bcrypt.compare(password, retailer.password);

    if (!comparePassword) {
      throw new Error("Invalid password.");
    }

    const user = {
      name:retailer.name,
      id: retailer._id,
      email: retailer.email,
      role: retailer.role // Assuming 'role' is a property in the RetailerData schema
    };

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message ?? "An error occurred while logging in."
    });
  }
};



module.exports = { registerUser, loginUser };

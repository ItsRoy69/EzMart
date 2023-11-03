const UserData = require("../models/userDataModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, authorisedId, password, walletAddress, role } = req.body;

    if (!name || !email || !authorisedId || !password || !walletAddress || !role) {
      throw new Error("Please provide all required fields.");
    }

    const userWithEmail = await UserData.findOne({ email });
    if (userWithEmail) {
      throw new Error("User already exists with this email.");
    }

    const userWithId = await UserData.findOne({ authorisedId });
    if (userWithId) {
      throw new Error("User already exists with this ID.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserData({ name, email, authorisedId, password: hashedPassword, walletAddress, role });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, walletAddress, role } = req.body;

    if (!email || !password || !walletAddress || !role) {
      throw new Error("Please provide email, password, walletAddress, and role.");
    }

    const user = await UserData.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password.");
    }

    if (user.walletAddress !== walletAddress) {
      throw new Error("Wallet address does not match the user's address.");
    }

    if (user.role !== role) {
      console.log(`User role: ${user.role}, Role from request: ${role}`);
      throw new Error("Role does not match the user's role.");
    }

    const userData = {
      name: user.name,
      id: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports = { registerUser, loginUser };

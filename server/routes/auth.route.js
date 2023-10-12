const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Redirection logic after successful login
router.use("/dashboard", (req, res, next) => {
  const userRole = req.user?.role; // Assuming the user's role is attached to the request after authentication
  if (userRole === "distributor") {
    res.redirect("/dashboard2");
  } else if (userRole === "retailer") {
    res.redirect("/dashboard");
  } else {
    // Handle unrecognized role or unauthorized access
    res.status(403).json({ error: "Unauthorized access." });
  }
});

module.exports = router;

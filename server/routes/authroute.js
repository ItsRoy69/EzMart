const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/create", registerUser);
// POST route for user login
router.post("/signin", loginUser);

// GET route for user login (if needed)
router.get("/signin", (req, res) => {
  const userid = req.authorisedId;

  res.status(200).json({ userid });
});

router.use("/dashboard", (req, res, next) => {
  const userRole = req.user?.role;
  if (userRole === "distributor") {
    res.redirect("/dashboard2");
  } else if (userRole === "retailer") {
    res.redirect("/dashboard");
  } else {
    res.status(403).json({ error: "Unauthorized access." });
  }
});

module.exports = router;

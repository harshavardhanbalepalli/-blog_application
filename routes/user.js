const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signUp");
});

router.get("/signin", (req, res) => {
  return res.render("signIn");
});

router.post("/signin", async (req, res) => {

  const { email, password } = req.body;

  try {
    const token = await User.matchedPasswordAndGenerateToken(email, password);

    if (!token) {
      return res.render("signIn", {
        error: "Incorrect email or password"
      });
    }

    return res.cookie("token", token, {
      httpOnly: true,
      path: "/"
    }).redirect("/");

  } catch (error) {
    return res.render("signIn", {
      error: "Incorrect email or password"
    });
  }
});



router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.get('/logout', (req, res)=>{
  res.clearCookie("token").redirect('/');
})

module.exports = router;

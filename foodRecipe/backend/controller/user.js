// const User = require("../models/user")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const userSignUp = async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password is required" })
//     }
//     let user = await User.findOne({ email })
//     if (user) {
//         return res.status(400).json({ error: "Email is already exist" })
//     }
//     const hashPwd = await bcrypt.hash(password, 10)
//     const newUser = await User.create({
//         email, password: hashPwd
//     })
//     let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY)
//     return res.status(200).json({ token, user:newUser })

// }

// const userLogin = async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password is required" })
//     }
//     let user = await User.findOne({ email })
//     if (user && await bcrypt.compare(password, user.password)) {
//         let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
//         return res.status(200).json({ token, user })
//     }
//     else {
//         return res.status(400).json({ error: "Invaild credientials" })
//     }
// }

// const getUser = async (req, res) => {
//     const user = await User.findById(req.params.id)
//     res.json({email:user.email})
// }

// module.exports = { userLogin, userSignUp, getUser }


const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Signup Controller
const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

// User Login Controller
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      return res.status(200).json({ token, user });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Get Single User by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { userSignUp, userLogin, getUser };

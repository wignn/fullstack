const prisma = require('../config/db');
const bcrypt = require ('bcrypt');
const GetusersName = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { name: req.params.name },
      include:{profile: true}
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getAllusers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true, 
        bookMarks: true
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserbyid = async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where:{id: Number(req.params.id)},
      include:{
        profile: true,
        bookMarks:true
      }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create user with validation
const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Name is required and cannot be empty or only whitespace.' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ message: 'Email is required and cannot be empty or only whitespace.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const user = await prisma.user.create({
      data: { name: name.trim(), email: email.trim() },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Name is required and cannot be empty or only whitespace.' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ message: 'Email is required and cannot be empty or only whitespace.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name: name.trim(), email: email.trim() },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Status 
const updateStatus = async (req, res) => {
  try {
    const { email,  } = req.body; 
    const user = await prisma.user.update({
      where: { email: email }, 
      data: {  isOnline: true,  },
    });

    return res.status(200).json({ message: "User status updated", user });
  } catch (err) {
    console.error("Error updating user status:", err);
    return res.status(500).json({ error: err.message });
  }
};



// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Missing fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: "error", message: "Invalid email format" });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        isOnline: true,
        profile:{
          create:{
            image:'/uploads/04-09-2024/cropped-image-1725410901243-748257845.png'
          }
        }
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error in /register:", error);
    return res.status(500).json({ status: "error", message: "An error occurred" });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  GetusersName,
  registerUser,
  updateStatus,
  getAllusers,
  getUserbyid
};

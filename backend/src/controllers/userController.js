const prisma = require('../config/db');


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const GetusersName = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { name: req.params.name },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

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
// Update user with validation
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

// // Register user
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !name.trim()) {
//     return res.status(400).json({ message: 'Name is required and cannot be empty or only whitespace.' });
//   }
//   if (!email || !email.trim()) {
//     return res.status(400).json({ message: 'Email is required and cannot be empty or only whitespace.' });
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: 'Invalid email format.' });
//   }
//   if (!password || password.length < 8) {
//     return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
//   }

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: { email: email.trim() },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name: name.trim(),
//         email: email.trim(),
//         password: hashedPassword,
//       },
//     });

//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({
//       message: 'User registered successfully!',
//       token,
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  GetusersName
  // registerUser,
};

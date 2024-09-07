const prisma = require("../config/db");

const Getprofile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: Number(req.params.id) },
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetAllProfile = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  Getprofile,
  GetAllProfile,
};

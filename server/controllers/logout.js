module.exports.logout = async (req, res) => {
  res.clearCookie("access_token");

  // You may also want to clear any other cookies or session data here

  res.status(200).json({ message: "Logout successful" });
};

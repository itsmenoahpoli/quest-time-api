function getUserProfile(request, response) {
  return response.status(200).json({ status: "online" });
}

module.exports = {
  getUserProfile,
};

const checkAuthenticatedUser = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

export default checkAuthenticatedUser;

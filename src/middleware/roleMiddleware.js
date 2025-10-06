exports.requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};


// eslint-disable-next-line consistent-return
const admin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send({ status: 403, data: 'Unathorized access.' });
  next();
};

export default admin;

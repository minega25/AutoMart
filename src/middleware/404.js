export default function (req, res, next) {
  res.status(404).send({ status: 404, error: 'Resource not found' });
}

// eslint-disable-next-line no-unused-vars
export default function errorHandler(error, req, res, next) {
  const status = error.code ?? 500;
  console.error(error);
  res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message ?? 'Internal Server Error',
    data: error.data ?? undefined,
    date: new Date(),
  });
}

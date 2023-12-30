export default function errorHandler (error, req, res, next) {
  const status = error.code ?? 500;

  res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message ?? 'Internal Server Error',
    data: error.data ?? null,
    date: new Date()
  });
};

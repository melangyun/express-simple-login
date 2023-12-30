function authorizerErrorHandler (err, req, res, next) {
  const status = err.code ?? 500;
  if (status === 401) {
    res.clearCookie('token');
  }
}

export default authorizerErrorHandler;

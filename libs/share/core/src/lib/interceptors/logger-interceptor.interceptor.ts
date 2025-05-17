import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Http request: ', req.method, req.params, req);
  return next(req);
};

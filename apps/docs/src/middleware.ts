import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { url, redirect } = context;
  
  // If accessing root path, redirect to default locale
  if (url.pathname === '/' || url.pathname === '') {
    return redirect('/en/', 302);
  }
  
  return next();
});

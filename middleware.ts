export { auth as middleware } from '@/auth';

export const config = {
  // matcher: ['/writr/:path*', '/login'],
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

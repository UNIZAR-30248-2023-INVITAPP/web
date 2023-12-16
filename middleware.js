/* istanbul ignore file */
import { NextResponse } from 'next/server'
import { GoogleAuthProvider } from 'firebase/auth';

export function middleware(request) {
  return NextResponse.next();
  if (!request.headers.cookie?.includes('authenticated=true')) {
    // Redirect to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
    // return NextResponse.redirect('/login');
  }
  return NextResponse.next();
  /*
  const credential = GoogleAuthProvider.credential(localStorage.getItem("idToken"));
    // Comprobar que la sesion es valida
    signInWithCredential(auth, credential)
      .then(() => {
        return NextResponse.next();
      })
      .catch((error) => {
        return NextResponse.redirect('http://localhost:3000/login');
      });
  if (true) {
    // Redirect to the login page
    //const url = request.nextUrl.clone()
    //url.pathname = '/login'
    //return NextResponse.rewrite(url)
    //return NextResponse.next();
    
  }
  */
  
}

export const config = {
  matcher: ['/eventos', '/estadisticas/(.*)']
  //matcher: ['/((?!api|login|favicon.ico).*)',]
}

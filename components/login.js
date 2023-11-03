import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '@/firebase';
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router"; 

function Login() {
const provider = new GoogleAuthProvider();
const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {

          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const user = result.user;
          
          // Extraemos los datos que pueden ser útiles
          const nombre = result.user.displayName;
          const email = result.user.email;
          const foto = result.user.photoURL;

          //Guardamos los datos en la bd del navegador para un rápido acceso
          localStorage.setItem("nombre", nombre);
          localStorage.setItem("email", email);
          localStorage.setItem("foto", foto);

          router.push("/eventos");
      })
        .catch((error) => {
          console.log(error);
        })
    }

    const redirigirSignUp = () => {
      router.push("/signup");
    }
  var sectionStyle = {
    backgroundImage: `url(https://www.lafactoriadelshow.com/blog/wp-content/uploads/2023/03/ideas-fiestas-tematicas.jpeg)`
  }

  return (
    <div className='login d-flex justify-content-center align-items-center 100-w vh-100' style={sectionStyle}>
      <div className='form_container w-70 p-5 rounded border border-dark bg-white'>
          <Form>
            <h3>Iniciar sesión</h3>
            <div className='mb-2'>
              <Form.Label>Correo electrónico</Form.Label>
              <input type="email" placeholder='Introduce correo' className='form-control'/>
            </div>
            <div className='mb-2'>
              <Form.Label>Contraseña</Form.Label>
              <input type="password" placeholder='Introduce contraseña' className='form-control'/>
            </div>
          <div className='d-grid'>
            <Button>Iniciar sesión</Button>
          </div>
          <div className='mt-2 d-grid'>
            <Button onClick={signInWithGoogle}>Iniciar sesión con Google</Button>
          </div>
          <div className='mt-2 d-grid'>
            <Button onClick={redirigirSignUp}>¿No tienes cuenta?</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
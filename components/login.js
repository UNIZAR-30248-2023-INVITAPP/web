import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Logo from "./../imgs/logo_blanco.png"

function Login() {
	// Uso del provider de autentificación de Google
	const provider = new GoogleAuthProvider();

	// Uso del componente router para redirección entre páginas
	const router = useRouter();

	// Función para gestionar el inicio de sesión con Google
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// Declaración de credenciales y token de acceso. NO SÉ SI SON NECESARIOS (!!)
				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const token = credential.idToken;

				// Declaración del usuario. NO SÉ SI ES NECESARIO (!!)
				const user = result.user;

				// Extraemos los datos que pueden ser útiles. NO SÉ SI ES NECESARIO (!!)
				const nombre = result.user.displayName;
				const email = result.user.email;
				const foto = result.user.photoURL;

				// Guardamos los datos en la bd del navegador para un rápido acceso. NO SÉ SI ES NECESARIOS (!!)
				localStorage.setItem("nombre", nombre);
				localStorage.setItem("email", email);
				localStorage.setItem("foto", foto);
				localStorage.setItem("idToken", token);

				// Redireccionamos a eventos tras un inicio de sesión válido
				router.push("/eventos");
			})
			.catch((error) => {
				// Hacemos log del error en caso de que haya ocurrido algún problema
				console.log(error);
			});
	};

	// Función utilizada para redirigir a la pantalla de creación de cuenta
	const redirigirSignUp = () => {
		router.push("/signup");
	};

	// Imagen de fondo utilizada en las pantallas de login y signup
	var sectionStyle = {
		backgroundImage: `url(https://www.lafactoriadelshow.com/blog/wp-content/uploads/2023/03/ideas-fiestas-tematicas.jpeg)`,
	};

	return (
		<div
			className="login d-flex justify-content-center align-items-center 100-w vh-100"
			style={sectionStyle}
		>
			{/* Tal vez aumentar anchura del div */}
			<div className="form_container w-70 p-5 rounded border border-dark bg-white text-center">
				<Form>
					<img id="img" src={Logo.src} width={265} heigth={265}/>
					<hr />
					
					{/* --------DESCOMENTAR PARA SPRINT 3---------}
                    <div className="mb-2">
                        <Form.Label>Correo electrónico</Form.Label>
                        <input
                            type="email"
                            placeholder="Introduce correo"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <Form.Label>Contraseña</Form.Label>
                        <input
                            type="password"
                            placeholder="Introduce contraseña"
                            className="form-control"
                        />
                    </div>
                    */}
					{/* -------DESCOMENTAR PARA SPRINT 3------- */}
					{/* <div className="d-grid">
						<Button>Iniciar sesión</Button>
					</div> */}
					<div className="mt-2 d-grid">
						{/* Intentar cambiar formato botón Google */}
						<Button onClick={signInWithGoogle}>
							Iniciar sesión con Google
						</Button>
					</div>
					{/* -------DESCOMENTAR PARA SPRINT 3------- */}
					{/* <div className="mt-2 d-grid">
						<Button onClick={redirigirSignUp}>
							¿No tienes cuenta?
						</Button>
					</div> */}
				</Form>
			</div>
		</div>
	);
}

export default Login;

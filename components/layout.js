import { Button } from "react-bootstrap";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
	// Uso del componente router para redirección entre páginas
	const router = useRouter();

	// Función para gestionar el cierre de sesión del usuario
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Redirecciona al usuario a la pantalla inicial
				localStorage.clear();
				router.push("/");
				//console.log("Signed out successfully");
			})
			.catch((error) => {
				// Hacemos log del error en caso de que haya ocurrido algún problema
				//console.log(error);
			});
	};
	return (
		<>
			{/* Barra de navegación */}
			<nav className="navbar navbar-dark bg-dark">
				<div className="container text-center">
					<span className="navbar-brand mx-auto">InvitApp</span>
					{/* Se ha incluido botón para gestionar el cierre de sesión */}
					<Button onClick={() => handleLogout()}>
						Cerrar sesión
					</Button>
				</div>
			</nav>

			{children}
		</>
	);
};

export default Layout;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

function Signup() {
	// Campos a completar en el registro
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	// Uso del componente router para redirección entre páginas
	const router = useRouter();

	// Variables para controlar el Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Imagen de fondo utilizada en las pantallas de login y signup
	var sectionStyle = {
		backgroundImage: `url(https://www.lafactoriadelshow.com/blog/wp-content/uploads/2023/03/ideas-fiestas-tematicas.jpeg)`,
	};
	/*
  	const handleSubmit = async (e) => {
		e.preventDefault();

		const nombre = e.target.user.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.confirmPassword.value;

		// Si los datos son coherentes
		if (password === confirmPassword) {
			setContrasenasDistintas(false);
			const res = await fetch(process.env.REACT_APP_BACKEND_HOST + "/signup", {
				method: "POST",
				mode: "cors",
				credentials: "include",
				body: new URLSearchParams({
					username: nombre,
					email: email,
					password: password,
				}),
			});

			console.log(res);

			if (res.status === 401) {
				toast({
					title: "Ha sucedido un error",
					status: "error",
					position: "top",
				});
			} 
			else if (res.status === 403) {
				toast({
					title: "Ya existe un usuario con ese nombre",
					status: "warning",
					position: "top",
				});
			}
			else if(res.status === 200){
				onOpen(true);    
			}
		}
		// Si los datos no son coherentes
		else {
			setContrasenasDistintas(true);
		}
	};
	*/

	return (
		<>
			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Cuenta creada correctamente</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Inicia sesión para poder acceder a nuestros servicios
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							{
								handleClose;
							}
							router.push("/");
						}}
					>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
			<div
				className="login d-flex justify-content-center align-items-center vh-100"
				style={sectionStyle}
			>
				<div className="form_container p-5 rounded border border-dark bg-white">
					<Form>
						<h3>Crear cuenta</h3>
						<div className="mb-2">
							<Form.Label>Nombre completo</Form.Label>
							<input
								type="name"
								placeholder="Introduce nombre"
								className="form-control"
							/>
						</div>
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
						<div className="mb-2">
							<Form.Label>Confirmar contraseña</Form.Label>
							<input
								type="password"
								placeholder="Confirma contraseña"
								className="form-control"
							/>
						</div>
						<div className="d-grid">
							<Button onClick={handleShow}>Hecho</Button>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}

export default Signup;

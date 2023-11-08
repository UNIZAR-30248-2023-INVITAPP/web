import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Login from "@/components/login.js";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase";

export default function Home() {
	const [cargado, setCargado] = useState(false);
	const [idToken, setIdToken] = useState(null);
	useEffect(() => {
		// Perform localStorage action
		setIdToken(localStorage.getItem("idToken"));
		setCargado(true);
	}, []);
	// Uso del componente router para redirección entre páginas
	const router = useRouter();
	// Si no hay nadie en la sesión actual se mostrará la página de Login
	if (cargado) {
		if (idToken === null) {
			router.push("/login");
		} else {
			const credential = GoogleAuthProvider.credential(idToken);
			// Comprobar que la sesion es valida
			signInWithCredential(auth, credential)
				.then(() => {
					router.push("/eventos");
				})
				.catch((error) => {
					router.push("/login");
				});
		}
	}
	// // Si hay alguien en la sesión actual se redirigirá directamente a eventos
	// if (user) {
	//     router.push("/eventos");
	// }
	// // Si no hay nadie en la sesión actual se mostrará la página de Login
	// else {
	//     return <Login></Login>;
	// }
}

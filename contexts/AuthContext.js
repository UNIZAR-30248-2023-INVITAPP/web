import React, { useContext, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// NO SÉ SI REALMENTE SIRVE PARA ALGO TODO ESTO (!!)
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

	// ESTÁ FATAL ESTO (!!)
	function signup(email, password) {
		createUserWithEmailAndPassword(auth, email, password).then((user) => {
			return user;
		});
	}

	useEffect(() => {
		const salir = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return salir;
	}, []);

	const value = {
		currentUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

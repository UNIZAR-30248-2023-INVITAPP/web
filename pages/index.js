import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Login from "@/components/login.js";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase";

export default function Home() {
    // NO FUNCIONA EL GUARDADO DE SESION (!!)
    // Se recoge información sobre el usuario actual del sistema
    const user = auth.currentUser;
    console.log(user);
    // Uso del componente router para redirección entre páginas
    const router = useRouter();
    // Si hay alguien en la sesión actual se redirigirá directamente a eventos
    if (user) {
        router.push("/eventos");
    }
    // Si no hay nadie en la sesión actual se mostrará la página de Login
    else {
        return <Login></Login>;
    }
}

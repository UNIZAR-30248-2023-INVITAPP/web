import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase";

export async function isLogged (){
    var id = localStorage.getItem("idToken")
    console.log(id)
    if (!id) return false
    const credential = GoogleAuthProvider.credential(id);
    // Comprobar que la sesion es valida
    return await signInWithCredential(auth, credential)
    .then(() => {
        return true
    })
    .catch(() => {
        return false
    });
}

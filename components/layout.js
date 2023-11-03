import { Button } from "react-bootstrap";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Layout = ({children}) => {
    const router = useRouter();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            router.push("/")
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        // An error happened.
        });
    }   
    return ( 
        <>
            {/* Barra de navegación */}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container text-center">
                    <span className="navbar-brand mx-auto">InvitApp</span>
                    <Button onClick={() => handleLogout()}>Logout</Button>
                </div>
            </nav>

            {children}
        </>
     );
}
 
export default Layout;
const Layout = ({children}) => {
    return ( 
        <>
            {/* Barra de navegación */}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container text-center">
                    <span className="navbar-brand mx-auto">InvitApp</span>
                </div>
            </nav>

            {children}
        </>
     );
}
 
export default Layout;
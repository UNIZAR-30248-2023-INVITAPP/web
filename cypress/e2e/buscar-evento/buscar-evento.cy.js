import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones";

describe("Buscar un evento en la barra de búsqueda", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it("Prueba 1: Verificación barra de búsqueda", () => {
        // Verifica que la barra de búsqueda exista
        cy.get("#form").find("#searchBar").should("exist");
        // También puedes realizar más verificaciones si es necesario, por ejemplo, asegurarte de que tenga el atributo 'placeholder' correcto
        cy.get("#searchBar").should(
            "have.attr",
            "placeholder",
            "Buscar un evento..."
        );
    });

    it("Prueba 2: Crear un evento", () => {
        anadirEventoPrueba("Test - Buscar Evento");
    });

    it("Prueba 3: Buscar el evento en la barra de búsqueda y comprobar que aparece", () => {
        // Buscar el evento creado previamente
        cy.get("#searchBar").clear().type("Buscar Evento");

        // Verificar que existe el evento con ese título
        cy.get("h5").contains("Test - Buscar Evento").should("exist");
    });

    it("Prueba 4: Eliminar el evento creado", () => {
        eliminarEventoDom("Test - Buscar Evento");
    });
});

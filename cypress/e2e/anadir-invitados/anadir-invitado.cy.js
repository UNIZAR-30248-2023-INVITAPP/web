import { anadirEventoPrueba, eliminarEvento, eliminarEventoDom, anadirEventoPruebaDom } from "../aux-funciones";

describe("Añadir un invitado", () => {
    var docReference;
    const nombreEvento = "Test - Añadir un invitado";

    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");

        cy.wait(1000);
    });

    it("Añadir un invitado", () => {
        anadirEventoPruebaDom(nombreEvento)
        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "12345678Z";
        const emailInvitado = "prueba@correo.es";
        const genero = "Femenino";
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent()
            .parent()
            .parent();
        ultimoEvento.contains("button", "Invitados").click();
        // Comprobar que no hay invitados
        cy.contains("Aun no hay invitados para este evento");

        // Rellenar el formulario
        // Rellenar el nombre del invitado
        cy.get("#formNombre").type(nombreInvitado);
        // Rellenar el DNI
        cy.get("#formDNI").type(DNIInvitado);
        // Rellenar el email
        cy.get("#formEmail").type(emailInvitado);
        // Rellenar el genero
        cy.get("#formGenero").select(genero)
        // Pulsar el boton
        cy.contains("button", "Añadir").click();
        // cy.intercept("*").as("fetch");

        // cy.wait("@fetch");

        // Comprobar que se ha añadido
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );
        // Comprobar que aparece el nombre
        cy.contains(nombreInvitado).should("exist");
        // Comprobar que aparece el DNI
        cy.contains(DNIInvitado).should("exist");
        // Comprobar que aparece el Email
        cy.contains(emailInvitado).should("exist");
    });

    it("Añadir un invitado", () => {
        eliminarEventoDom(nombreEvento)
    });
});

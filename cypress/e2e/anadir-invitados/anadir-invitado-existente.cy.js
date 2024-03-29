import { anadirEventoPruebaDom, eliminarEventoDom } from "../aux-funciones";

describe("Añadir dos invitados con el mismo DNI", () => {
    const nombreEvento = "Test - Añadir dos invitado con el mismo DNI";

    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it("Añadir dos invitados con el mismo DNI", () => {
        anadirEventoPruebaDom(nombreEvento)
        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "12345678Z";
        const emailInvitado = "prueba@correo.es";
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent()
            .parent()
            .next();
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
        // Pulsar el boton
        cy.contains("button", "Añadir").click();


        cy.wait(500)

        cy.get('.btn-close').eq(0).click()

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

        // Rellenar el formulario otra vez
        // Rellenar el nombre del invitado
        cy.get("#formNombre").type(nombreInvitado);
        // Rellenar el DNI
        cy.get("#formDNI").type(DNIInvitado);
        // Rellenar el email
        cy.get("#formEmail").type(emailInvitado);
        // Pulsar el boton
        cy.contains("button", "Añadir").click();

        // Comprobar que existe el mensaje de error
        cy.contains("Ya existe un invitado con ese DNI").should("exist");

        cy.wait(500)

        cy.get('.btn-close').eq(0).click()

        eliminarEventoDom(nombreEvento)
    });
});

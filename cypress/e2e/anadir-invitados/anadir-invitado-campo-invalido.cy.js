import { anadirEventoPrueba, eliminarEvento } from "../aux-funciones";

describe("Añadir un invitado con campo invalido", () => {
    var docReference;
    const nombreEvento = "Test - Añadir un invitado con campo invalido";

    beforeEach(() => {
        docReference = anadirEventoPrueba(nombreEvento).then(
            (result) => (docReference = result)
        );
        cy.wait(500);

        cy.visit("http://localhost:3000/eventos");
    });

    afterEach(() => {
        eliminarEvento(docReference.id);
    });

    it("Añadir un invitado con DNI invalido", () => {
        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "DNI invalido";
        const emailInvitado = "prueba@correo.es";
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Ver invitados").click();
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

        // Comprobar que no se ha añadido
        cy.contains("DNI invalido").should("exist");
        cy.contains("Aun no hay invitados para este evento").should("exist");
    });

    it("Añadir un invitado con email invalido", () => {
        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "11111111A";
        const emailInvitado = "esto no es un correo valido";
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Ver invitados").click();
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

        // Comprobar que no se ha añadido
        cy.contains("Aun no hay invitados para este evento").should("exist");
    });
});
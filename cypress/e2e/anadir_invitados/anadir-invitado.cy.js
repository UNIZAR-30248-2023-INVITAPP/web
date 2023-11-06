import { anadirEventoPrueba, eliminarEvento } from "../aux-funciones";

describe("Añadir un invitado", () => {
    var docReference;

    beforeEach(async () => {
        docReference = await anadirEventoPrueba();
        cy.visit("http://localhost:3000/eventos");
    });

    afterEach(async () => {
        await eliminarEvento(docReference.id);
    });

    it("Añadir un invitado", () => {
        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "11111111A";
        const emailInvitado = "prueba@correo.es";
        // Comprobar que no hay invitados
        const ultimoEvento = cy.get(".list-group").children().last();
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
});

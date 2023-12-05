const { eliminarEventoDom, anadirEventoPrueba } = require("../aux-funciones")

describe('En esta prueba se modifican las propiedades con las mismas que otro ya existente', () => {

    const nombreEvento1 = 'Evento de Prueba 1'
    const nombreEvento2 = 'Evento de Prueba 2'



    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Crear un evento "Evento de Prueba 1" ', async () => {
        await anadirEventoPrueba(nombreEvento1)
    })

    it('Prueba 2: Crear un evento "Evento de Prueba 2" ', async () => {
        await anadirEventoPrueba(nombreEvento2)
    })

    it('Prueba 3: Seleccionar el segundo evento creado y ponerle el nombre del primero y comprobar el mensaje de error', () => {
        // Seleccionar el evento con nombre "Evento de Prueba 2"
        cy.get('li') // Selecciona todos los elementos <li> que representan eventos
        .contains('h5', nombreEvento2) // Busca el elemento <h5> con el texto "Evento de Prueba 2"
        .parent() // Selecciona el padre del elemento h5
        .parent()
        .next() // Selecciona el siguiente elemento (que sería el div hermano del padre del h5)
        .within(() => {
            cy.get('button:contains("Modificar")') // Busca el botón con el texto "Editar"
            .click(); // Realiza clic en el botón "Editar"
        });

        //Cambiar el nombre a 'Evento de Prueba 1'
        cy.get('#nombre').clear().type(nombreEvento1)
        // Rellenar fecha
        const fechaUnDiaDespues = new Date();
        fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

        // Formatea la fecha en el formato YYYY-MM-DD
        const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
            fechaUnDiaDespues.getMonth() + 1
        ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
            2,
            "0"
        )}`;
        cy.get('#fecha').type(fechaUnDiaDespuesFormateada);
        // Rellenar la hora
        cy.get('#hora').type('00:00');
        // Rellenar hora
        // Pinchar el botón de modificar evento
        cy.get('button.btn-dark').contains('Modificar Evento').click()

        cy.wait(500)

        // Verificar que aparece el error
        cy.contains('Ya existe un evento con esas propiedades').should('exist')
    })

    it('Prueba 4: Eliminar los eventos creados para la prueba', () => {
        eliminarEventoDom(nombreEvento1)
        eliminarEventoDom(nombreEvento2)
        cy.wait(1000)
    })
})

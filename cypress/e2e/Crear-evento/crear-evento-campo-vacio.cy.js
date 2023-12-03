
describe('Crear evento campos vacíos', () => {
    beforeEach(() => {    
        cy.visit('http://localhost:3000/eventos')
    })
  
  
    it('Prueba 1: Rellenar todos los campos menos nombre y crear evento', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
  
        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalCrearEvento').should('be.visible');
  
        // Rellenar el nombre del evento
        cy.get('#fecha').type('2025-12-31');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        //Rellenar la ubicacion
        cy.get('#ubicacion').type('Calle Maria Moliner, 25');
        // Crear Evento
        cy.get('#boton-crear-evento').click()
  
        // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
        cy.contains('Todos los campos son obligatorios').should('exist');
        
    })

    it('Prueba 2: Rellenar todos los campos menos fecha y crear evento', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
  
        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalCrearEvento').should('be.visible');
  
        // Rellenar el nombre del evento
        cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        //Rellenar la ubicacion
        cy.get('#ubicacion').type('Calle Maria Moliner, 25');
        // Crear Evento
        cy.get('#boton-crear-evento').click()
  
        // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
        cy.contains('Formato de fecha incorrecto').should('exist');    
    })

    it('Prueba 3: Rellenar todos los campos menos hora y crear evento', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
  
        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalCrearEvento').should('be.visible');
  
        // Rellenar el nombre del evento
        cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');
        // Rellenar la fecha
        cy.get('#fecha').type('2025-12-31');
        //Rellenar la ubicacion
        cy.get('#ubicacion').type('Calle Maria Moliner, 25');
        // Crear Evento
        cy.get('#boton-crear-evento').click()
  
        // Comprobar que aparece el mensaje de error cuando se intenta crear el evento sin hora
        cy.contains('Todos los campos son obligatorios').should('exist');
    })

    it('Prueba 4: Rellenar todos los campos menos ubicacion y crear evento', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
  
        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalCrearEvento').should('be.visible');
  
        // Rellenar el nombre del evento
        cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');
        // Rellenar la fecha
        cy.get('#fecha').type('2025-12-31');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        
        // Crear Evento
        cy.get('#boton-crear-evento').click()
  
        // Comprobar que aparece el mensaje de error cuando se intenta crear el evento sin ubicación
        cy.contains('Todos los campos son obligatorios').should('exist');
    })
  })
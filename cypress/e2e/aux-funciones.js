import { doc, collection, deleteDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";

export const anadirEventoPrueba = async (titulo) => {
    const fechaUnDiaDespues = new Date();
    fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
        fechaUnDiaDespues.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
        2,
        "0"
    )}`;
    var docReference = await addDoc(collection(db, "Eventos"), {
        nombre: titulo,
        fecha: fechaUnDiaDespuesFormateada,
        hora: "00:00",
        ubicacion: "Ubicacion de prueba",
        invitados: [],
    });

    return docReference;
};

export const anadirEventoPruebaConInvitado = async (titulo) => {
    const fechaUnDiaDespues = new Date();
    fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
        fechaUnDiaDespues.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
        2,
        "0"
    )}`;
    var docReference = await addDoc(collection(db, "Eventos"), {
        nombre: titulo,
        fecha: fechaUnDiaDespuesFormateada,
        hora: "00:00",
        ubicacion: "Ubicacion de prueba",
        invitados: [
            {
                DNI: "12345678A",
                email: "prueba@email.com",
                nombre: "Nombre Prueba",
            },
        ],
    });

    return docReference;
};

export const eliminarEvento = async (docId) => {
    await deleteDoc(doc(db, "Eventos", docId));
};

export const anadirEventoPruebaDom = (nombre) => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type(nombre);
    // Rellenar la fecha
    cy.get('#fecha').type('2025-12-31');
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle León XII');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    cy.wait(2500)
}

export const eliminarEventoDom = (evento) => {
    // Eliminar el evento
    const etiqueta = cy.get('h5').contains(evento)
    const botones = etiqueta.parent().parent().parent().siblings().contains("Eliminar").parent()
    botones.click()
    cy.get('#modalConfirmarEliminarEventoSimple')  // Selecciona el modal por su ID
    .find('Button')  // Encuentra todos los elementos tipo botón dentro del modal
    .last()  // Selecciona el último botón (asumiendo que "Eliminar" es el último)
    .click();  // Realiza clic en el botón

    cy.wait(1000)
}

/**
 * Esta función devuelve un querySnapshot (que es un array de documentos) de los
 * invitados que hay en el Evento con eventiId.
 */
export const listaInvitadosDeEvento = async (eventoId) => {
    const querySnapshot = await getDocs(collection(db, "Eventos", eventoId, "Invitados"));
    return querySnapshot;
};

/**
 * Esta función añade un invitado a la lista de invitados del evento con eventoId
 * Todos los campos a añadir son string
 */
export const anadirInvitadoDeEvento = async (eventoId, nombre, apellido, DNI, email, genero, nacimiento) => {

    await addDoc(collection(db, "Eventos", eventoId, "Invitados"), {
        nombre: nombre,
        apellido: apellido,
        dni: DNI,
        correo: email,
        genero: genero,//"masculino", "femenino"
        nacimiento: nacimiento,
        asistido: false
    });
};

/**
 * Esta función actualiza los campos de un invitado
 * Dado el id del evento y el id del invitado, además de los campos que desee cambiar,
 * si no desea cambiar un campo debe pasar el mismo valor que había antes de la actualizacion
 */
export const updateInvitadoDeEvento = async (eventoId, invitadoId, nombre, apellido, DNI, email, genero, nacimiento) => {

    const invitadoRef = doc(db, "Eventos", eventoId, "Invitados", invitadoId);
    
    // Set the "capital" field of the city 'DC'
    await updateDoc(invitadoRef, {
        nombre: nombre,
        apellido: apellido,
        dni: DNI,
        correo: email,
        genero: genero,//"masculino", "femenino"
        nacimiento: nacimiento
        //no se puede cambiar el campo "asistido"
    });
};

/**
 * Esta función elimina el invitado con id de evento dado e id del invitado
 */
export const eliminaInvitadoDeEvento = async (eventoId, invitadoId) => {

    const invitadoRef = doc(db, "Eventos", eventoId, "Invitados", invitadoId);
    await deleteDoc(invitadoRef);
};

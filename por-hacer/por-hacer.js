const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let dataJson = JSON.stringify(listadoPorHacer);

    const data = new Uint8Array(Buffer.from(dataJson));
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = descripcion => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB()
    return porHacer;
}

const getListado = (completado) => {
    cargarDB();

    let value = completado === 'false' ? false : true
    let nuevoListadoPorHacer = listadoPorHacer.filter(tarea => {
        return tarea.completado == value;
    });
    return nuevoListadoPorHacer;
}

const actualizar = (descripcion, completado) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = (completado === 'true');
        guardarDB()
        return true
    } else {
        return false
    }
}

const borrar = (descripcion) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer.splice(index, 1)
        guardarDB()
        return true
    } else {
        return false
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
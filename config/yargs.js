const descripcion = {
    alias: 'd',
    demand: true
}

const completado = {
    alias: 'c',
    default: true
}

const argv = require('yargs').command('crear', 'Crear un elemento por hacer', {
        descripcion
    }).command('actualizar', 'Actualiza el estado completo de una tarea', {
        descripcion,
        completado
    }).command('borrar', 'Borra una tarea por hacer', {
        descripcion
    }).command('listar', 'Listar las tareas por hacer segun si etan completos o no', {
        completado
    })
    .help().argv;


module.exports = {
    argv
};
/*Ahora el reto está en vuestras manos dándole la funcionalidad apropiada a este TODO List a través del fichero main.js.

La pautas que tenéis que seguir son las siguientes:

Lo primero que hay que hacer es recuperar los elementos de nuestra página, ya sea el input, el botón, la lista e incluso el campo que queremos hacer desaparecer.
Una vez tengamos todos los elementos capturados tendremos que darle funcionalidad al botón y crear un elemento <li> por cada texto introducido en nuestro input (de ahí que en index.html hubiera una lista vacía). Esto se puede hacer de diferentes formas y recomendamos que controléis "errores" como el no permitir capturar una tarea sin texto.
A estas tareas hay que adjuntarles un botón de borrado que nos elimine cada una de las tareas.
Si todo ha ido correctamente os tendría que aparecer en pantalla una aplicación similar a esta:
Recomendamos jugar con el estilos, con diferentes funcionalidades, enviar los elementos completados a un array distinto en vez de eliminarlos y mostrarlos por pantalla y cualquier vuelta que le queráis dar a esta sencilla aplicación.

Además de esto, y para asimilar conceptos, podéis utilizar los identificadores y elementos de HTML que queráis siempre y cuando la lógica y el comportamiento de la aplicación sea efectivo y coherente.
*/
const inputTareaUnico = document.querySelector('input');
const botonAgregarUnico = document.querySelector('.btn-add');
const listaTareasUnico = document.querySelector('.li-container ul');
const mensajeVacioUnico = document.querySelector('.empty');
const listaTareasCompletadas = document.querySelector('.completed-tasks ul');
const botonRestaurarTareas = document.querySelector('.restore-tasks');

console.log('input capturado correctamente:',inputTareaUnico);
console.log('boton de agregar capturado correctamente:',botonAgregarUnico);
console.log('lista de tareas capturado correctamente:',listaTareasUnico);
console.log('mensaje vacío capturado correctamente:',mensajeVacioUnico);
console.log('lista de tareas capturada correctamente:',listaTareasCompletadas);
console.log('botón de restaurar capturado correctamente;',botonRestaurarTareas);

const tareasCompletadas = [];

function eliminarEspacios(str) {
    let start = 0;
    let end = str.length - 1;
    
    while (start <= end && str[start] === ' ') start++;
    while (end >= start && str[end] === ' ') end--;
    
    return str.slice(start, end + 1);
}

function agregarBotonBorrado(li) {
    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Completar'; 
    botonBorrar.classList.add('btn-complete');
    
    botonBorrar.addEventListener('click', () => {
        const tareaTexto = li.textContent.replace('Completar', '').trim(); 
        tareasCompletadas.push(tareaTexto); 
        li.remove(); 
        actualizarListaTareasCompletadas(); 
        mensajeVacioUnico.textContent = (listaTareasUnico.children.length === 0 && tareasCompletadas.length > 0) ? 'All tasks are completed' : 'No pending tasks'; 
    });

    li.appendChild(botonBorrar);
}
function actualizarListaTareasCompletadas() {

    listaTareasCompletadas.innerHTML = '';
    tareasCompletadas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea;
        const botonRestaurar = document.createElement('button');
        botonRestaurar.textContent = 'Restaurar';
        botonRestaurar.classList.add('btn-restore');
        botonRestaurar.addEventListener('click', () => {
            tareasCompletadas.splice(tareasCompletadas.indexOf(tarea), 1); 
            actualizarListaTareasCompletadas(); 
            crearTarea(tarea); 
            mensajeVacioUnico.textContent = 'No pending tasks'; 
        });

        li.appendChild(botonRestaurar);
        listaTareasCompletadas.appendChild(li);
    });


    if (tareasCompletadas.length === 0 && listaTareasUnico.children.length > 0) {
        mensajeVacioUnico.textContent = 'No pending tasks'; 
    }
}

function crearTarea(textoTarea) {
    const li = document.createElement('li');
    li.textContent = textoTarea;

    agregarBotonBorrado(li);
    listaTareasUnico.appendChild(li);
}


function crearLista() {
    function agregarTarea() {
        const textoTarea = inputTareaUnico.value; 
        const textoLimpioTarea = eliminarEspacios(textoTarea);
        textoLimpioTarea !== "" ? 
            (function() {
                const li = document.createElement('li'); 
                li.textContent = textoLimpioTarea;

                agregarBotonBorrado(li); 
                listaTareasUnico.appendChild(li); 
                inputTareaUnico.value = ""; 

                mensajeVacioUnico.textContent = 'No pending tasks'; 
            })()  : alert("Por favor introduzca un texto...");
    }

    botonAgregarUnico.addEventListener('click', (e) => {
        e.preventDefault(); 
        agregarTarea();
    });


    mensajeVacioUnico.textContent = listaTareasUnico.children.length === 0 ? 'No pending tasks' : '';
}
crearLista();

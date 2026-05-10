const btnOrdenar = document.getElementById('btn-ordenar');
const consoleOutput = document.getElementById('console-output');

// Función para actualizar la interfaz visual
const actualizarPaso = (id, estado, log) => {
    const card = document.getElementById(id);
    const statusText = card.querySelector('.status');
    
    // Limpiamos clases
    card.classList.remove('active', 'completed');
    
    if (estado === 'cocinando') {
        card.classList.add('active');
        statusText.innerText = "Preparando...";
    } else if (estado === 'entregado') {
        card.classList.add('completed');
        statusText.innerText = "¡Listo!✅";
    }

    // Agregar mensaje a la consola
    consoleOutput.innerHTML += `<br>> ${log}`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

// Promesa base para preparar comida
const prepararPlatillo = (id, nombre, tiempo) => {
    return new Promise((resolve) => {
        actualizarPaso(id, 'cocinando', `Cocinando ${nombre}...`);
        
        setTimeout(() => {
            actualizarPaso(id, 'entregado', `${nombre} entregado.`);
            resolve();
        }, tiempo);
    });
};

// Función principal que dispara el botón
const iniciarSimulacion = () => {
    // 1. Configuración inicial
    btnOrdenar.disabled = true;
    consoleOutput.innerHTML = "> Orden recibida. Iniciando proceso...";
    
    // Reiniciar tarjetas si ya se usaron
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.remove('active', 'completed');
        c.querySelector('.status').innerText = "Esperando...";
    });

    // 2. Encadenamiento riguroso de Promesas
    prepararPlatillo('step-bebida', 'Bebida', 1500)
        .then(() => {
            return prepararPlatillo('step-pizza', 'Pizza', 3000);
        })
        .then(() => {
            return prepararPlatillo('step-postre', 'Postre', 2000);
        })
        .then(() => {
            consoleOutput.innerHTML += `<br><strong style="color:white;">ORDEN COMPLETADA Y ENTREGADA</strong>`;
            btnOrdenar.disabled = false;
        })
        .catch((error) => {
            consoleOutput.innerHTML += `<br>> ❌ Error: ${error}`;
            btnOrdenar.disabled = false;
        });
};

// Asignar evento al botón
btnOrdenar.addEventListener('click', iniciarSimulacion);
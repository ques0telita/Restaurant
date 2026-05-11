const btnOrdenar = document.getElementById('btn-ordenar');
const consoleOutput = document.getElementById('console-output');
const btnFondo = document.getElementById('btn-fondo');
const backgroundImg = document.querySelector('.background');

// codigo para cambiar el fondo
const toggleFondo = () => {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    if (isDark) {
        btnFondo.innerText = 'Modo Claro';
    } else {
        btnFondo.innerText = 'Modo Oscuro';
    }
};

// agregar event listener al boton de fondo
btnFondo.addEventListener('click', toggleFondo);

// codigo para actualizar la interfaz visual
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

// promesas base para preparar comida
const prepararPlatillo = (id, nombre, tiempo) => {
    return new Promise((resolve) => {
        actualizarPaso(id, 'cocinando', `Cocinando ${nombre}...`);
        
        setTimeout(() => {
            actualizarPaso(id, 'entregado', `${nombre} entregado.`);
            resolve();
        }, tiempo);
    });
};

// codigo principal que dispara el boton de orden
const iniciarSimulacion = () => {
    // primero la configuración inicial
    btnOrdenar.disabled = true;
    consoleOutput.innerHTML = "> Orden recibida. Iniciando proceso...";
    
    // Reiniciar tarjetas si ya se usaron
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.remove('active', 'completed');
        c.querySelector('.status').innerText = "Esperando...";
    });

    // segundo el encadenamiento riguroso de promesas
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

// asignar evento al boton de ordenar
btnOrdenar.addEventListener('click', iniciarSimulacion);

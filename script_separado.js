// Variables globales
const USUARIO_CORRECTO = 'alumno';
const PASSWORD_CORRECTA = '2025';

// Función de login usando estructura IF
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    // Estructura IF para validar credenciales
    if (username === USUARIO_CORRECTO && password === PASSWORD_CORRECTA) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('mainSection').classList.remove('hidden');
        errorDiv.textContent = '';
    } else if (username === '' || password === '') {
        errorDiv.textContent = 'Por favor, complete todos los campos';
    } else {
        errorDiv.textContent = 'Usuario o contraseña incorrectos';
    }
}

// Función para calcular el total
function calcularTotal() {
    let subtotal = 0;
    let productosSeleccionados = [];
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Array de checkboxes para iterar
    const checkboxes = [
        { id: 'laptop', nombre: 'Laptop' },
        { id: 'mouse', nombre: 'Mouse' },
        { id: 'teclado', nombre: 'Teclado' },
        { id: 'monitor', nombre: 'Monitor' }
    ];

    // Estructura FOR para recorrer los productos seleccionados
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = document.getElementById(checkboxes[i].id);
        if (checkbox.checked) {
            const precio = parseFloat(checkbox.value);
            const total = precio * cantidad;
            subtotal += total;
            productosSeleccionados.push({
                nombre: checkboxes[i].nombre,
                precio: precio,
                cantidad: cantidad,
                total: total
            });
        }
    }

    // Obtener costo de envío usando radio buttons
    const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
    const costoEnvio = parseFloat(envioSeleccionado.value);

    // Calcular descuento usando estructura SWITCH CASE
    let descuento = 0;
    let porcentajeDescuento = 0;
    
    switch (true) {
        case (subtotal >= 1000):
            porcentajeDescuento = 15;
            descuento = subtotal * 0.15;
            break;
        case (subtotal >= 500):
            porcentajeDescuento = 10;
            descuento = subtotal * 0.10;
            break;
        case (subtotal >= 200):
            porcentajeDescuento = 5;
            descuento = subtotal * 0.05;
            break;
        default:
            porcentajeDescuento = 0;
            descuento = 0;
    }

    const totalFinal = subtotal - descuento + costoEnvio;

    // Mostrar resultados
    mostrarResultados(productosSeleccionados, subtotal, descuento, porcentajeDescuento, costoEnvio, totalFinal);
}

// Función para mostrar resultados
function mostrarResultados(productos, subtotal, descuento, porcentaje, envio, total) {
    const resultadosDiv = document.getElementById('resultados');
    const detallesDiv = document.getElementById('detalles');
    
    let html = '';

    // Estructura WHILE para mostrar productos
    let i = 0;
    while (i < productos.length) {
        html += `<div class="result-item">
            <span>${productos[i].nombre} (x${productos[i].cantidad})</span>
            <span>$${productos[i].total.toFixed(2)}</span>
        </div>`;
        i++;
    }

    html += `
        <div class="result-item">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span>Descuento (${porcentaje}%):</span>
            <span>-$${descuento.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span>Envío:</span>
            <span>$${envio.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span>TOTAL A PAGAR:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;

    detallesDiv.innerHTML = html;
    resultadosDiv.classList.remove('hidden');
}

// Función para cerrar sesión
function logout() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('mainSection').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('resultados').classList.add('hidden');
}

// Permitir login con Enter
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
});
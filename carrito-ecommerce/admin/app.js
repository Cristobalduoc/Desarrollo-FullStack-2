// ==========================================
// ARCHIVO: app.js
// Lógica de Persistencia y Vistas Separadas
// ==========================================

// --- DATOS INICIALES (SEEDERS) ---
const PRODUCTOS_INICIALES = [
    { id: 1, nombre: "Módulo ESP32 DevKit v1", precio: 6500, stock: 20, imagen: "https://via.placeholder.com/150", descripcion: "Microcontrolador con Wi-Fi y Bluetooth." },
    { id: 2, nombre: "Arduino Uno R3", precio: 8900, stock: 15, imagen: "https://via.placeholder.com/150", descripcion: "Placa de desarrollo para prototipado." },
    { id: 3, nombre: "Sensor Ultrasonido HC-SR04", precio: 1800, stock: 30, imagen: "https://via.placeholder.com/150", descripcion: "Sensor de distancia de 2cm a 400cm." },
    { id: 4, nombre: "Fuente de Poder para Protoboard", precio: 3200, stock: 12, imagen: "https://via.placeholder.com/150", descripcion: "Salida de 3.3V y 5V regulada." },
    { id: 5, nombre: "Protoboard 830 Puntos", precio: 2500, stock: 25, imagen: "https://via.placeholder.com/150", descripcion: "Placa de pruebas sin soldadura." },
    { id: 6, nombre: "Kit Cables Jumper M/M 65 pzs", precio: 2000, stock: 40, imagen: "https://via.placeholder.com/150", descripcion: "Cables flexibles para prototipado." },
    { id: 7, nombre: "Sensor Humedad DHT11", precio: 2200, stock: 18, imagen: "https://via.placeholder.com/150", descripcion: "Módulo de medición ambiental." },
    { id: 8, nombre: "Modulo Rele 5V 2 Canales", precio: 2800, stock: 10, imagen: "https://via.placeholder.com/150", descripcion: "Control de cargas de alta potencia." },
    { id: 9, nombre: "Servo Motor SG90 9g", precio: 2100, stock: 22, imagen: "https://via.placeholder.com/150", descripcion: "Micro servo con giros de 180 grados." },
    { id: 10, nombre: "Sensor Infrarrojo PIR HC-SR501", precio: 2400, stock: 14, imagen: "https://via.placeholder.com/150", descripcion: "Detector de movimiento corporal." }
];

const USUARIOS_INICIALES = [
    { rut: "11111111-1", nombre: "Admin", apellido: "Sistema", correo: "admin@frontend.cl", password: "admin", rol: "admin", telefono: "912345678", region: "Metropolitana", comuna: "Santiago", direccion: "Av. Central 123" },
    { rut: "22222222-2", nombre: "Vendedor", apellido: "Tienda", correo: "vendedor@frontend.cl", password: "vend", rol: "vendedor", telefono: "987654321", region: "Metropolitana", comuna: "Providencia", direccion: "Calle Venta 456" },
    { rut: "33333333-3", nombre: "Cliente", apellido: "Perez", correo: "cliente@frontend.cl", password: "client", rol: "cliente", telefono: "955555555", region: "Metropolitana", comuna: "San Joaquín", direccion: "Pasaje Uno 789" }
];

// Inicializar LocalStorage
function inicializarLocalStorage() {
    if (!localStorage.getItem("productos")) localStorage.setItem("productos", JSON.stringify(PRODUCTOS_INICIALES));
    if (!localStorage.getItem("usuarios")) localStorage.setItem("usuarios", JSON.stringify(USUARIOS_INICIALES));
    if (!localStorage.getItem("ordenes")) localStorage.setItem("ordenes", JSON.stringify([]));
    if (!localStorage.getItem("carrito")) localStorage.setItem("carrito", JSON.stringify([]));
}

function obtenerDatos(clave) { return JSON.parse(localStorage.getItem(clave)) || []; }
function guardarDatos(clave, datos) { localStorage.setItem(clave, JSON.stringify(datos)); }

// Obtener parámetros desde la URL (ej: ?id=2 o ?rut=11111111-1)
function obtenerParametroUrl(parametro) {
    const params = new URLSearchParams(window.location.search);
    return params.get(parametro);
}

// --- LÓGICA SEGÚN LA PÁGINA ACTUAL ---
document.addEventListener("DOMContentLoaded", () => {
    inicializarLocalStorage();
    const ruta = window.location.pathname;

    // 1. PÁGINA: DASHBOARD DE PEDIDOS (index.html)
    if (ruta.endsWith("admin/index.html") || ruta.endsWith("admin/")) {
        cargarTablaPedidos();
    }

    // 2. PÁGINA: LISTA DE PRODUCTOS (productos.html)
    if (ruta.endsWith("admin/productos.html")) {
        cargarTablaProductos();
    }

    // 3. PÁGINA: FORMULARIO PRODUCTO (editar-producto.html)
    if (ruta.endsWith("admin/editar-producto.html")) {
        inicializarFormularioProducto();
    }

    // 4. PÁGINA: LISTA DE USUARIOS (usuarios.html)
    if (ruta.endsWith("admin/usuarios.html")) {
        cargarTablaUsuarios();
    }

    // 5. PÁGINA: FORMULARIO USUARIO (editar-usuario.html)
    if (ruta.endsWith("admin/editar-usuario.html")) {
        inicializarFormularioUsuario();
    }
});

// ==========================================
// FUNCIONES DE PRODUCTOS
// ==========================================
function cargarTablaProductos() {
    const tbody = document.getElementById("tabla-productos-body");
    if (!tbody) return;
    const productos = obtenerDatos("productos");

    tbody.innerHTML = productos.map(p => `
        <tr>
            <td>${p.id}</td>
            <td><img src="${p.imagen}" width="40" alt="prod"></td>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.stock}</td>
            <td>${p.descripcion}</td>
            <td>
                <a href="editar-producto.html?id=${p.id}"><button>Editar</button></a>
                <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        let productos = obtenerDatos("productos").filter(p => p.id !== id);
        guardarDatos("productos", productos);
        cargarTablaProductos();
    }
}

function inicializarFormularioProducto() {
    const id = obtenerParametroUrl("id");
    const form = document.getElementById("form-admin-producto");
    const titulo = document.getElementById("titulo-pagina-prod");

    if (id) {
        titulo.innerText = "Editar Producto #" + id;
        const producto = obtenerDatos("productos").find(p => p.id == id);
        if (producto) {
            document.getElementById("prod-id-hidden").value = producto.id;
            document.getElementById("prod-nombre").value = producto.nombre;
            document.getElementById("prod-precio").value = producto.precio;
            document.getElementById("prod-stock").value = producto.stock;
            document.getElementById("prod-imagen").value = producto.imagen;
            document.getElementById("prod-descripcion").value = producto.descripcion;
        }
    } else {
        titulo.innerText = "Agregar Nuevo Producto";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const idHidden = document.getElementById("prod-id-hidden").value;
        const productos = obtenerDatos("productos");

        const datosProd = {
            id: idHidden ? Number(idHidden) : Date.now(),
            nombre: document.getElementById("prod-nombre").value,
            precio: Number(document.getElementById("prod-precio").value),
            stock: Number(document.getElementById("prod-stock").value),
            imagen: document.getElementById("prod-imagen").value,
            descripcion: document.getElementById("prod-descripcion").value
        };

        if (!validarFormularioProducto(datosProd)) return;

        if (idHidden) {
            const index = productos.findIndex(p => p.id == idHidden);
            productos[index] = datosProd;
        } else {
            productos.push(datosProd);
        }

        guardarDatos("productos", productos);
        window.location.href = "productos.html";
    });
}

// ==========================================
// FUNCIONES DE USUARIOS
// ==========================================
function cargarTablaUsuarios() {
    const tbody = document.getElementById("tabla-usuarios-body");
    if (!tbody) return;
    const usuarios = obtenerDatos("usuarios");

    tbody.innerHTML = usuarios.map(u => `
        <tr>
            <td>${u.rut}</td>
            <td>${u.nombre} ${u.apellido}</td>
            <td>${u.correo}</td>
            <td><strong>${u.rol.toUpperCase()}</strong></td>
            <td>${u.telefono || '-'}</td>
            <td>${u.comuna}, ${u.region}</td>
            <td>
                <a href="editar-usuario.html?rut=${u.rut}"><button>Editar</button></a>
                <button onclick="eliminarUsuario('${u.rut}')">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

function eliminarUsuario(rut) {
    if (confirm("¿Seguro que deseas eliminar este usuario? Sus pedidos anteriores se mantendrán intactos.")) {
        let usuarios = obtenerDatos("usuarios").filter(u => u.rut !== rut);
        guardarDatos("usuarios", usuarios);
        cargarTablaUsuarios();
    }
}

function inicializarFormularioUsuario() {
    const rutParam = obtenerParametroUrl("rut");
    const form = document.getElementById("form-admin-usuario");
    const titulo = document.getElementById("titulo-pagina-user");
    const inputRut = document.getElementById("user-rut");

    if (rutParam) {
        titulo.innerText = "Editar Usuario (RUT: " + rutParam + ")";
        inputRut.value = rutParam;
        inputRut.disabled = true; // El RUT no se puede modificar

        const usuario = obtenerDatos("usuarios").find(u => u.rut === rutParam);
        if (usuario) {
            document.getElementById("user-rol").value = usuario.rol;
            document.getElementById("user-nombre").value = usuario.nombre;
            document.getElementById("user-apellido").value = usuario.apellido;
            document.getElementById("user-correo").value = usuario.correo;
            document.getElementById("user-password").value = usuario.password;
            document.getElementById("user-telefono").value = usuario.telefono || "";
            document.getElementById("user-region").value = usuario.region || "";
            document.getElementById("user-comuna").value = usuario.comuna || "";
            document.getElementById("user-direccion").value = usuario.direccion || "";
        }
    } else {
        titulo.innerText = "Crear Nuevo Usuario";
        inputRut.disabled = false;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuarios = obtenerDatos("usuarios");

        const datosUser = {
            rut: inputRut.value,
            rol: document.getElementById("user-rol").value,
            nombre: document.getElementById("user-nombre").value,
            apellido: document.getElementById("user-apellido").value,
            correo: document.getElementById("user-correo").value,
            password: document.getElementById("user-password").value,
            telefono: document.getElementById("user-telefono").value,
            region: document.getElementById("user-region").value,
            comuna: document.getElementById("user-comuna").value,
            direccion: document.getElementById("user-direccion").value
        };

        if (rutParam) {
            const index = usuarios.findIndex(u => u.rut === rutParam);
            usuarios[index] = datosUser;
        } else {
            if (usuarios.some(u => u.rut === datosUser.rut)) {
                alert("El RUT ya existe en el sistema.");
                return;
            }
            if (!validarFormularioRegistro(datosUser)) return;
            usuarios.push(datosUser);
        }

        guardarDatos("usuarios", usuarios);
        window.location.href = "usuarios.html";
    });
}

// ==========================================
// FUNCIONES DE DASHBOARD / PEDIDOS
// ==========================================
function cargarTablaPedidos() {
    const tbody = document.getElementById("tabla-pedidos-body");
    if (!tbody) return;
    const ordenes = obtenerDatos("ordenes");

    if (ordenes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9">No hay pedidos registrados aún.</td></tr>`;
        return;
    }

    tbody.innerHTML = ordenes.map(o => `
        <tr>
            <td>#${o.id}</td>
            <td>${o.rutCliente}</td>
            <td>${o.nombreCliente}</td>
            <td>${o.correoCliente}</td>
            <td>${o.telefonoCliente}</td>
            <td>${o.direccionEnvio}</td>
            <td>$${o.total}</td>
            <td><strong>${o.estado}</strong></td>
            <td>
                <select onchange="cambiarEstadoPedido(${o.id}, this.value)">
                    <option value="Pendiente" ${o.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="Enviado" ${o.estado === 'Enviado' ? 'selected' : ''}>Enviado</option>
                    <option value="Recibido" ${o.estado === 'Recibido' ? 'selected' : ''}>Recibido</option>
                </select>
            </td>
        </tr>
    `).join("");
}

function cambiarEstadoPedido(idOrden, nuevoEstado) {
    let ordenes = obtenerDatos("ordenes");
    const index = ordenes.findIndex(o => o.id === idOrden);
    if (index !== -1) {
        ordenes[index].estado = nuevoEstado;
        guardarDatos("ordenes", ordenes);
        alert(`Estado de la orden #${idOrden} actualizado a: ${nuevoEstado}`);
    }
}

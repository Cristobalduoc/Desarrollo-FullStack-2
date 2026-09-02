// VALIDACIONES BÁSICAS

// Validar RUT (formato básico: números-dígito)
function validarRUT(rut) {
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    return rutRegex.test(rut);
}

// Validar Email
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar Contraseña (mínimo 6 caracteres)
function validarPassword(password) {
    return password && password.length >= 6;
}

// Validar que no esté vacío
function validarRequerido(valor) {
    return valor && valor.trim().length > 0;
}

// Validar Número Teléfono (opcional, pero si se ingresa debe tener formato)
function validarTelefono(telefono) {
    if (!telefono) return true; // Es opcional
    const telefonoRegex = /^[0-9]{8,12}$/;
    return telefonoRegex.test(telefono.replace(/\D/g, ''));
}

// Validar Región
function validarRegion(region) {
    return validarRequerido(region);
}

// Validar Comuna
function validarComuna(comuna) {
    return validarRequerido(comuna);
}

// Validar Dirección (opcional)
function validarDireccion(direccion) {
    return true; // Es opcional
}

// Validar que el número sea válido
function validarNumero(numero) {
    return !isNaN(numero) && numero > 0;
}

// Validar Stock
function validarStock(stock) {
    return validarNumero(stock) && stock === Math.floor(stock);
}

// Validar Precio
function validarPrecio(precio) {
    return validarNumero(precio) && precio > 0;
}

// Función auxiliar para mostrar mensajes de error
function mostrarError(mensaje) {
    console.error(mensaje);
    return false;
}

// Validar formulario de registro
function validarFormularioRegistro(rut, nombre, apellido, email, password, region, comuna) {
    if (!validarRUT(rut)) {
        return { valido: false, mensaje: "RUT inválido. Formato: 12345678-9" };
    }
    if (!validarRequerido(nombre)) {
        return { valido: false, mensaje: "El nombre es requerido" };
    }
    if (!validarRequerido(apellido)) {
        return { valido: false, mensaje: "El apellido es requerido" };
    }
    if (!validarEmail(email)) {
        return { valido: false, mensaje: "Email inválido" };
    }
    if (!validarPassword(password)) {
        return { valido: false, mensaje: "La contraseña debe tener mínimo 6 caracteres" };
    }
    if (!validarRegion(region)) {
        return { valido: false, mensaje: "Debe seleccionar una región" };
    }
    if (!validarComuna(comuna)) {
        return { valido: false, mensaje: "La comuna es requerida" };
    }
    return { valido: true, mensaje: "Formulario válido" };
}

// Validar formulario de login
function validarFormularioLogin(rut, password) {
    if (!validarRUT(rut)) {
        return { valido: false, mensaje: "RUT inválido" };
    }
    if (!validarPassword(password)) {
        return { valido: false, mensaje: "Contraseña inválida" };
    }
    return { valido: true, mensaje: "Datos de login válidos" };
}

// Validar producto
function validarProducto(nombre, descripcion, precio, stock, imagen) {
    if (!validarRequerido(nombre)) {
        return { valido: false, mensaje: "El nombre del producto es requerido" };
    }
    if (!validarRequerido(descripcion)) {
        return { valido: false, mensaje: "La descripción es requerida" };
    }
    if (!validarPrecio(precio)) {
        return { valido: false, mensaje: "El precio debe ser un número válido mayor a 0" };
    }
    if (!validarStock(stock)) {
        return { valido: false, mensaje: "El stock debe ser un número entero válido" };
    }
    if (!validarRequerido(imagen)) {
        return { valido: false, mensaje: "La URL de imagen es requerida" };
    }
    return { valido: true, mensaje: "Producto válido" };
}

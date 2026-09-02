// ==========================================
// ARCHIVO: validaciones.js
// Validaciones básicas de formularios
// ==========================================

// Validar que un campo no esté vacío o solo contenga espacios
function esCampoVacio(valor) {
    return !valor || valor.trim() === "";
}

// Validar formato de correo básico (debe tener '@' y un punto '.')
function validarCorreo(correo) {
    if (esCampoVacio(correo)) return false;
    return correo.includes("@") && correo.includes(".");
}

// Validar longitud mínima de contraseña (mínimo 4 caracteres)
function validarPassword(password) {
    if (esCampoVacio(password)) return false;
    return password.length >= 4;
}

// Validar formato básico de RUT (al menos 8 caracteres, ej: 12345678-9 o sin guión)
function validarRut(rut) {
    if (esCampoVacio(rut)) return false;
    // Quitamos puntos y espacios para revisar longitud
    const rutLimpio = rut.replace(/\./g, "").trim();
    return rutLimpio.length >= 8;
}

// Validar formulario de registro de usuario cliente
function validarFormularioRegistro(datos) {
    if (esCampoVacio(datos.rut) || !validarRut(datos.rut)) {
        alert("Por favor ingresa un RUT válido (mínimo 8 caracteres).");
        return false;
    }
    if (esCampoVacio(datos.nombre)) {
        alert("El nombre es obligatorio.");
        return false;
    }
    if (esCampoVacio(datos.apellido)) {
        alert("El apellido es obligatorio.");
        return false;
    }
    if (!validarCorreo(datos.correo)) {
        alert("Por favor ingresa un correo electrónico válido (debe incluir @ y .).");
        return false;
    }
    if (!validarPassword(datos.password)) {
        alert("La contraseña debe tener al menos 4 caracteres.");
        return false;
    }
    if (esCampoVacio(datos.region)) {
        alert("La región es obligatoria.");
        return false;
    }
    if (esCampoVacio(datos.comuna)) {
        alert("La comuna es obligatoria.");
        return false;
    }
    return true; // Todo correcto
}

// Validar formulario de login
function validarFormularioLogin(correo, password) {
    if (!validarCorreo(correo)) {
        alert("Ingresa un correo válido.");
        return false;
    }
    if (esCampoVacio(password)) {
        alert("Ingresa tu contraseña.");
        return false;
    }
    return true;
}

// Validar datos de un producto (para Admin / Vendedor)
function validarFormularioProducto(datos) {
    if (esCampoVacio(datos.nombre)) {
        alert("El nombre del producto es obligatorio.");
        return false;
    }
    if (isNaN(datos.precio) || Number(datos.precio) <= 0) {
        alert("El precio debe ser un número mayor a 0.");
        return false;
    }
    if (isNaN(datos.stock) || Number(datos.stock) < 0) {
        alert("El stock debe ser un número mayor o igual a 0.");
        return false;
    }
    if (esCampoVacio(datos.imagen)) {
        alert("La URL de la imagen es obligatoria.");
        return false;
    }
    return true;
}

// En: src/servicios/usuarioServicio.js

// --- SIMULACIÓN DE BASE DE DATOS ---
const usuariosFalsos = [
  {
    id: 1,
    nombre: "Admin Cazador",
    email: "admin@tienda.com",
    rol: "super-admin",
  },
  {
    id: 2,
    nombre: "Vendedor Tienda",
    email: "vendedor@tienda.com",
    rol: "vendedor",
  },
  {
    id: 3,
    nombre: "Ignacio Pérez",
    email: "cliente1@gmail.com",
    rol: "cliente",
  },
  {
    id: 4,
    nombre: "María González",
    email: "cliente2@gmail.com",
    rol: "cliente",
  },
];

// --- SIMULACIÓN DE API (GET /api/usuarios) ---
export const getUsuariosServicio = () => {
  console.log("Servicio: Obteniendo lista de usuarios...");
  
  return new Promise((resolve) => {
    // Simulamos un pequeño retraso de red
    setTimeout(() => {
      console.log("Servicio: Datos de usuarios entregados.");
      resolve(usuariosFalsos);
    }, 500); // 0.5 segundos
  });
};

export const crearUsuarioServicio = (datosUsuario) => {
  console.log("Servicio: Creando usuario con", datosUsuario);

  return new Promise((resolve) => {
    // Simulamos un retraso de red
    setTimeout(() => {
      // Creamos un ID falso y añadimos el rol
      const nuevoUsuario = {
        id: Math.floor(Math.random() * 1000) + 5, // ID aleatorio
        ...datosUsuario, // Esto incluye nombre, email, password
      };
      
      // (No guardamos la contraseña en la lista, tal como lo haría un backend real)
      delete nuevoUsuario.password; 

      usuariosFalsos.push(nuevoUsuario);
      console.log("Servicio: Usuario creado.", nuevoUsuario);
      
      resolve(nuevoUsuario);
    }, 1000); // 1 segundo
  });
};


// En: src/servicios/usuarioServicio.js

// ... (después de 'usuariosFalsos', 'getUsuariosServicio' y 'crearUsuarioServicio') ...

// --- SIMULACIÓN DE API (DELETE /api/usuarios/:id) ---
export const deleteUsuarioServicio = (id) => {
  console.log("Servicio: Borrando usuario con ID", id);

  return new Promise((resolve, reject) => {
    // Simulamos un retraso de red
    setTimeout(() => {
      // (Esta variable 'usuariosFalsos' no se puede reasignar, 
      // así que no podemos filtrar. En un backend real, 
      // esto eliminaría el registro de la DB.)
      
      // Simplemente simulamos que la operación fue exitosa
      // (En el frontend, filtraremos la lista nosotros mismos)
      console.log("Servicio: Usuario borrado (simulado).");
      resolve({ mensaje: "Usuario eliminado" });
    }, 500); // 0.5 segundos
  });
};

export const getUsuarioPorIdServicio = (id) => {
  console.log("Servicio: Buscando usuario con ID", id);
  // El 'id' de la URL viene como string, lo convertimos a número
  const idNumerico = parseInt(id, 10); 

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Buscamos al usuario en nuestra lista falsa
      const usuario = usuariosFalsos.find(u => u.id === idNumerico);
      
      if (usuario) {
        console.log("Servicio: Usuario encontrado.", usuario);
        resolve(usuario); // Lo devolvemos
      } else {
        console.log("Servicio: Usuario no encontrado.");
        reject(new Error('Usuario no encontrado'));
      }
    }, 500);
  });
};

// --- SIMULACIÓN DE API (PUT /api/usuarios/:id) ---
export const updateUsuarioServicio = (id, datosUsuario) => {
  console.log(`Servicio: Actualizando usuario ${id} con`, datosUsuario);
  const idNumerico = parseInt(id, 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      // (En la simulación no podemos modificar la lista original, 
      // pero en un backend real esto haría el UPDATE en la DB)
      
      const usuarioActualizado = {
        id: idNumerico,
        ...datosUsuario,
      };
      console.log("Servicio: Usuario actualizado (simulado).", usuarioActualizado);
      resolve(usuarioActualizado);
    }, 1000);
  });
};

const correosAdmin = ["ig.lopezf@duocuc.cl", "jo.zenteno@duocuc.cl"];

// --- SIMULACIÓN DE REGISTRO (Guardar en LocalStorage) ---
export const registroServicio = (datosUsuario) => {
  console.log("Servicio: Registrando usuario con", datosUsuario);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. Leemos los usuarios que ya existen
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // 2. Validamos si el correo ya existe (lógica de tu JS)
      const correoYaExiste = usuarios.some(usuario => usuario.correo === datosUsuario.correo);
      if (correoYaExiste) {
        console.log("Servicio: Error, el correo ya existe");
        reject(new Error('Este correo ya está registrado. Usa otro correo.'));
        return; // Importante salir
      }

      // 3. Creamos el nuevo usuario (lógica de tu JS)
      const nuevoUsuario = {
        ...datosUsuario,
        id: Math.floor(Math.random() * 1000) + 100, // ID Falso
        esAdmin: correosAdmin.includes(datosUsuario.correo.trim().toLowerCase()),
        fechaRegistro: new Date().toISOString()
      };
      
      // (Por seguridad, no guardamos la contraseña en la lista)
      // (En un backend real, la contraseña iría 'hasheada')
      delete nuevoUsuario.password; 

      // 4. Guardamos la nueva lista
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      console.log("Servicio: ¡Registro exitoso!");
      resolve(nuevoUsuario); // Devolvemos éxito

    }, 1000); // 1 segundo de simulación
  });
};
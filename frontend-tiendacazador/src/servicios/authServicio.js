// En: src/servicios/authServicio.js

// --- SIMULACIÓN DE CONEXIÓN AL BACKEND ---

export const loginServicio = (email, password) => {
  console.log("Servicio: Intentando loguear con", email, password);

  // Devolvemos una "Promesa" (esto es lo que hacen las 
  // llamadas reales al backend, como 'axios.post')
  return new Promise((resolve, reject) => {
    
    // Simulación de 1 segundo de espera (como si fuera al backend)
    setTimeout(() => {
      
      // --- NUESTRA "SIMULACIÓN INTELIGENTE" ---
      // Solo dejamos entrar si el email es 'admin@tienda.com' 
      // Y la contraseña es '1234'
      if (email === 'admin@tienda.com' && password === '1234') {
        
        // ¡ÉXITO! Devolvemos los datos del usuario
        const datosUsuarioFalsos = {
          id: 1,
          nombre: "Admin Cazador",
          email: email,
          rol: "super-admin" // ¡El rol es correcto!
        };
        console.log("Servicio: ¡Login exitoso!");
        resolve(datosUsuarioFalsos); // 'resolve' es como 'return' en una promesa

      } else {
        
        // ¡ERROR! Rechazamos la promesa con un mensaje
        console.log("Servicio: ¡Credenciales incorrectas!");
        reject(new Error('Email o contraseña incorrectos'));
      }
    }, 1000); // 1000ms = 1 segundo
  });
};
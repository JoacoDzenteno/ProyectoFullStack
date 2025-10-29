export const loginServicio = (email, password) => {
  console.log("Servicio: Intentando loguear con", email, password);

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (email === 'admin@tienda.com' && password === '1234') {
        const datosUsuarioFalsos = {
          id: 1,
          nombre: "Admin Cazador",
          email: email,
          rol: "super-admin" 
        };
        console.log("Servicio: ¡Login exitoso!");
        resolve(datosUsuarioFalsos); 

      } else {
        console.log("Servicio: ¡Credenciales incorrectas!");
        reject(new Error('Email o contraseña incorrectos'));
      }
    }, 1000); 
  });
};
// En: src/servicios/productoServicio.js

// --- SIMULACIÓN DE BASE DE DATOS DE PRODUCTOS ---
const productosFalsos = [
  {
    id: 101,
    nombre: "Machi Komacine - Noodle Stopper Figure (FuRyu)",
    descripcion: "Figura de acción de Gon 15cm",
    precio: 35000,
    stock: 25,
    categoria: "Figuras",
    // --- CAMPO NUEVO ---
    imagen: "/imagenes/productos/hunter/1MachiKomacine.png",
    // (Para el detalle, usaremos estos)
    imagenesGaleria: [
      "/imagenes/productos/hunter/1MachiKomacine.png",
      "/imagenes/productos/hunter/1.1MachiKomacine.png",
      "/imagenes/productos/hunter/1.2MachiKomacine.png",
      "/imagenes/productos/hunter/1.3MachiKomacine.png"
    ],
    descripcionDetallada: [
      "Figura de Machi Komacine", "Nueva", "Año 2025", "10 centímetros aproximadamente", "Estado tal como se ve en la foto"
    ]
  },
  {
    id: 102,
    nombre: "Shalnark - Noodle Stopper Figure (FuRyu)",
    descripcion: "Figura de acción de Killua Godspeed",
    precio: 24990,
    stock: 15,
    categoria: "Figuras",
    // --- CAMPO NUEVO ---
    imagen: "/imagenes/productos/hunter/2Shalnark.png",
    imagenesGaleria: ["/imagenes/productos/hunter/2Shalnark.png"],
    descripcionDetallada: ["Figura de Shalnark", "Nueva", "12cm"]
  },
  {
    id: 103,
    nombre: "Gon Freecss - Memorable Saga Special (Bandai Spirits)",
    descripcion: "Polera de algodón con logo HxH",
    precio: 14990,
    stock: 50,
    categoria: "Ropa",
    // --- CAMPO NUEVO ---
    imagen: "/imagenes/productos/hunter/3Gon.png",
    imagenesGaleria: ["/imagenes/productos/hunter/3Gon.png"],
    descripcionDetallada: ["Figura de Gon", "Edición especial"]
  },
  {
    id: 104,
    nombre: "Fushiguro Touji - Premium Chokonose Figure (SEGA)",
    descripcion: "Primer tomo del manga",
    precio: 7990,
    stock: 5, // Stock crítico
    categoria: "Manga",
    // --- CAMPO NUEVO ---
    imagen: "/imagenes/productos/jujutsuKaisen/11Touji.png",
    imagenesGaleria: ["/imagenes/productos/jujutsuKaisen/11Touji.png"],
    descripcionDetallada: ["Figura de Toji", "Nueva"]
  },
];

// --- SIMULACIÓN DE API (GET /api/productos) ---
export const getProductosServicio = () => {
  console.log("Servicio: Obteniendo lista de productos...");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Servicio: Datos de productos entregados.");
      resolve(productosFalsos);
    }, 500); // 0.5 segundos
  });
};

export const crearProductoServicio = (datosProducto) => {
  console.log("Servicio: Creando producto con", datosProducto);

  return new Promise((resolve) => {
    // Simulamos un retraso de red
    setTimeout(() => {
      // Creamos un ID falso (ej. 105)
      const nuevoProducto = {
        id: Math.floor(Math.random() * 1000) + 105, 
        ...datosProducto, // Esto incluye nombre, desc, precio, stock, cat
      };

      // (En un mundo real, el backend lo insertaría en la DB)
      // productosFalsos.push(nuevoProducto); // (No es necesario en la simulación)
      
      console.log("Servicio: Producto creado.", nuevoProducto);
      resolve(nuevoProducto);
    }, 1000); // 1 segundo
  });
};

export const deleteProductoServicio = (id) => {
  console.log("Servicio: Borrando producto con ID", id);

  return new Promise((resolve, reject) => {
    // Simulamos un retraso de red
    setTimeout(() => {
      // (En un backend real, esto eliminaría el registro de la DB)
      // (Para la simulación, no necesitamos modificar la lista falsa)
      
      console.log("Servicio: Producto borrado (simulado).");
      resolve({ mensaje: "Producto eliminado" });
    }, 500); // 0.5 segundos
  });
};
// En: src/servicios/productoServicio.js

// ... (después de 'getProductosServicio', 'crearProductoServicio' y 'deleteProductoServicio') ...

// --- SIMULACIÓN DE API (GET /api/productos/:id) ---
export const getProductoPorIdServicio = (id) => {
  console.log("Servicio: Buscando producto con ID", id);
  // El 'id' de la URL viene como string, lo convertimos a número
  const idNumerico = parseInt(id, 10); 

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Buscamos al producto en nuestra lista falsa
      const producto = productosFalsos.find(p => p.id === idNumerico);
      
      if (producto) {
        console.log("Servicio: Producto encontrado.", producto);
        resolve(producto); // Lo devolvemos
      } else {
        console.log("Servicio: Producto no encontrado.");
        reject(new Error('Producto no encontrado'));
      }
    }, 500); // 0.5 segundos
  });
};

// --- SIMULACIÓN DE API (PUT /api/productos/:id) ---
export const updateProductoServicio = (id, datosProducto) => {
  console.log(`Servicio: Actualizando producto ${id} con`, datosProducto);
  const idNumerico = parseInt(id, 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      // (Simulación de éxito. El backend haría el UPDATE)
      const productoActualizado = {
        id: idNumerico,
        ...datosProducto,
      };
      console.log("Servicio: Producto actualizado (simulado).", productoActualizado);
      resolve(productoActualizado);
    }, 1000); // 1 segundo
  });
};
// (Más adelante aquí irán: getProductoPorId, crearProducto, etc.)
import React from 'react';
// 💡 NOTA: No necesitamos 'Link' porque el botón es type="submit"
import './Contacto.css'; // 👈 Importación de estilos locales

const Contacto = () => {
    return (
        <section className="contacto" id="contacto">
            
            <h1 className="tituloCont">Contactanos</h1>
            
            <div className="seccionCont">
                
                {/* 1. FORMULARIO - SIN LÓGICA DE MANEJO DE ENVÍO */}
                {/* 💡 Al no tener 'onSubmit', el botón enviará el formulario de forma nativa (aunque fallará sin un endpoint real) */}
                <form action="#" method="POST"> 
                    <input 
                        type="text" 
                        placeholder="Nombre" 
                        className="box" 
                        name="nombre" 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        className="box" 
                        name="correo" 
                        required 
                    />
                    <input 
                        type="tel" 
                        placeholder="Número... ej: +569 1111 2222" 
                        className="box" 
                        name="numero"
                    />
                    <textarea 
                        className="box" 
                        placeholder="Escribe tu mensaje" 
                        name="mensaje" 
                        rows="10" 
                        required 
                    ></textarea>
                    
                    {/* Botón de envío */}
                    <button type="submit" className="btn">
                        Enviar mensaje
                    </button>
                </form>

                {/* 2. IMAGEN */}
                <div className="imagen">
                    <img 
                        src="/Imagenes/IMGseccionContato.jpg" 
                        alt="Imagen sección contacto"
                    />
                </div>

            </div>
        </section>
    );
};

export default Contacto;
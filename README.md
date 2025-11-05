# Sistema de Gestión de Tienda - Proyecto Full Stack

## Integrantes
- **Joaquín Zenteno**
- **Ignacio López**

## Descripción General

Este proyecto consiste en el desarrollo de una aplicación **Full Stack** para la gestión de una tienda dedicada a la venta de figuras de colección.  
Permite administrar productos, usuarios y ventas desde un **Panel de Administración**, además de permitir que clientes visualicen el catálogo de productos.

El sistema cuenta con:
- **Backend** en Spring Boot + JPA + Hibernate + MySQL.
- **Frontend** en React + Vite.
- Arquitectura REST y seguridad mediante roles **ADMIN / USER**.

---

## Tecnologías Utilizadas

### Backend
| Tecnología        | Descripción                     |
|-------------------|---------------------------------|
| Spring Boot       | Framework principal backend     |
| Spring Security   | Gestión de autenticación y roles|
| JPA / Hibernate   | Persistencia en Base de Datos   |
| MySQL             | Base de datos relacional        |
| Swagger / SpringDoc OpenAPI | Documentación de API  |
| JUnit             | Testing                          |

### Frontend
| Tecnología     |     Descripción        |
|----------------|------------------------|
| React + Vite   | Framework frontend SPA |
| Axios          | Consumo de API REST    |
| CSS            | Estilos personalizados |
| SweetAlert2    | Mensajes y alertas     |
| Chart.js       | Gráficos para estadísticas |

---

## Requerimientos Previos

| Programa      | Versión Recomendada   |
|---------------|-----------------------|
| Java          | 17 o superior         |
| Node.js       | 18+                   |
| MySQL         | 8+                    |
| XAMPP o MySQL Workbench | Para administrar la BD |

---

## Pasos para Ejecutar

### 1. Base de Datos
- Exportar la base de datos en MySQL workbech
### 2. Backend
- Prender MySQL en XAMPP
- Correr el backend en VisualStudioCode
### 3. Frontend
- Ejecutar npm install
- Correr el frontend con npm run dev 


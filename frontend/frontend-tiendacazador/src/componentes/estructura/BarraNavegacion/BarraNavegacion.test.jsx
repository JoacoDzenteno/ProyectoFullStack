import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { BarraNavegacion } from './BarraNavegacion'
import { CarritoProvider } from '../../../contexto/CarritoContexto'
import { AuthProvider } from '../../../contexto/AuthContexto.jsx'

const renderBarraNavegacion = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CarritoProvider>
          <BarraNavegacion />
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('BarraNavegacion - Tests de Enlaces', () => {
  
  it('debería renderizar todos los enlaces de navegación', () => {
    renderBarraNavegacion()
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('Nosotros')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
    expect(screen.getByText('Blogs')).toBeInTheDocument()
  })

  it('debería tener los hrefs correctos en los enlaces principales', () => {
    renderBarraNavegacion()
    
    const enlaces = [
      { texto: 'Home', href: '/' },
      { texto: 'Productos', href: '/productos' },
      { texto: 'Nosotros', href: '/nosotros' },
      { texto: 'Contacto', href: '/contacto' },
      { texto: 'Blogs', href: '/blogs' }
    ]

    enlaces.forEach(({ texto, href }) => {
      const enlace = screen.getByText(texto).closest('a')
      expect(enlace).toHaveAttribute('href', href)
    })
  })

  it('debería renderizar los enlaces de usuario al abrir el dropdown', async () => {
    const user = userEvent.setup()
    renderBarraNavegacion()
    
    const menuUsuario = document.getElementById('menu-usuario-dropdown')
    await user.click(menuUsuario)
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(screen.getByText('Registro')).toBeInTheDocument()
  })

  it('debería tener los hrefs correctos en los enlaces de usuario', async () => {
    const user = userEvent.setup()
    renderBarraNavegacion()
    
    const menuUsuario = document.getElementById('menu-usuario-dropdown')
    await user.click(menuUsuario)
    
    const enlacesUsuario = [
      { texto: 'Iniciar Sesión', href: '/login' },
      { texto: 'Registro', href: '/registro' }
    ]

    enlacesUsuario.forEach(({ texto, href }) => {
      const enlace = screen.getByText(texto).closest('a')
      expect(enlace).toHaveAttribute('href', href)
    })
  })

  it('debería tener el href correcto en el carrito', () => {
    renderBarraNavegacion()
    
    const carritoLink = document.querySelector('a[href="/carrito"]')
    expect(carritoLink).toBeInTheDocument()
    expect(carritoLink).toHaveAttribute('href', '/carrito')
  })

  it('debería renderizar la marca (navbar brand) con el enlace correcto', () => {
    renderBarraNavegacion()
    
    const brandLink = document.querySelector('.navbar-brand')
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('debería tener todos los enlaces con href válidos', () => {
    renderBarraNavegacion()
    
    const allLinks = document.querySelectorAll('a[href]')
    
    expect(allLinks.length).toBeGreaterThan(0)
    
    allLinks.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy()
    })
  })
})
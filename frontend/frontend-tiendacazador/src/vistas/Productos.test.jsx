import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Productos } from './Productos'
import { CarritoProvider } from '../contexto/CarritoContexto'
import { AuthProvider } from '../contexto/AuthContexto.jsx'
import * as productoServicio from '../servicios/productoServicio'

// Mock del servicio de productos
vi.mock('../servicios/productoServicio', () => ({
  getProductosServicio: vi.fn()
}))

// Mock de BarraNavegacion y PiePagina para simplificar el test
vi.mock('../componentes/estructura/BarraNavegacion/BarraNavegacion', () => ({
  BarraNavegacion: () => <div data-testid="barra-navegacion">BarraNavegacion Mock</div>
}))

vi.mock('../componentes/estructura/PiePagina/PiePagina', () => ({
  PiePagina: () => <div data-testid="pie-pagina">PiePagina Mock</div>
}))

const mockProductos = [
  {
    id: 1,
    nombre: 'Producto 1',
    precio: 100,
    imagen: 'producto1.jpg',
    activo: true
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: 200,
    imagen: 'producto2.jpg',
    activo: true
  }
]

const renderProductos = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CarritoProvider>
          <Productos />
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Productos - Vista Cliente', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  describe('a) Carga inicial', () => {

    it('debería renderizar el título y estructura correcta', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      expect(screen.getByText('Productos')).toBeInTheDocument()
      expect(screen.getByTestId('barra-navegacion')).toBeInTheDocument()
      expect(screen.getByTestId('pie-pagina')).toBeInTheDocument()
    })

    it('debería mostrar spinner mientras carga los productos', () => {
      vi.mocked(productoServicio.getProductosServicio).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockProductos), 1000))
      )

      renderProductos()

      const spinner = document.querySelector('.spinner-border')
      expect(spinner).toBeInTheDocument()
    })

    it('debería renderizar todos los productos después de cargar', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
        expect(screen.getByText('Producto 2')).toBeInTheDocument()
      })
    })

    it('debería mostrar botones "Agregar al carro" para cada producto', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        const botones = screen.getAllByRole('link', { name: /agregar al carro/i })
        expect(botones).toHaveLength(2)
      })
    })

    it('debería mostrar imágenes de productos con alt text correcto', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        expect(screen.getByAltText('Producto 1')).toBeInTheDocument()
        expect(screen.getByAltText('Producto 2')).toBeInTheDocument()
      })
    })

  })

  describe('b) Botón agregar al carrito', () => {

    it('debería mostrar alerta al agregar producto al carrito', async () => {
      const user = userEvent.setup()
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        const botones = screen.getAllByRole('link', { name: /agregar al carro/i })
        expect(botones.length).toBeGreaterThan(0)
      })

      const botones = screen.getAllByRole('link', { name: /agregar al carro/i })
      await user.click(botones[0])

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('¡Producto 1 añadido al carrito!')
      })
    })

    it('debería mostrar el nombre correcto en la alerta', async () => {
      const user = userEvent.setup()
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        const botones = screen.getAllByRole('link', { name: /agregar al carro/i })
        expect(botones.length).toBeGreaterThan(0)
      })

      const botones = screen.getAllByRole('link', { name: /agregar al carro/i })
      await user.click(botones[1])

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('¡Producto 2 añadido al carrito!')
      })
    })

  })

  describe('c) Error en carga de productos', () => {

    it('debería mostrar mensaje de error cuando falla la carga', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockRejectedValue(
        new Error('Error de conexión')
      )

      renderProductos()

      await waitFor(() => {
        expect(screen.getByText('No se pudieron cargar los productos.')).toBeInTheDocument()
      })
    })

    it('debería mostrar alerta con variant danger', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockRejectedValue(
        new Error('Error de conexión')
      )

      renderProductos()

      await waitFor(() => {
        const alert = screen.getByText('No se pudieron cargar los productos.').closest('div')
        expect(alert).toHaveClass('alert-danger')
      })
    })

  })

  describe('d) Accesibilidad', () => {

    it('debería usar getByRole para títulos', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      const titulo = screen.getByRole('heading', { name: 'Productos' })
      expect(titulo).toBeInTheDocument()
    })

    it('debería usar getByRole para enlaces de productos', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        const enlaces = screen.getAllByRole('link')
        expect(enlaces.length).toBeGreaterThan(0)
      })
    })

    it('debería tener imágenes accesibles con alt text', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderProductos()

      await waitFor(() => {
        const imagen = screen.getByAltText('Producto 1')
        expect(imagen).toHaveAccessibleName()
      })
    })

  })

})

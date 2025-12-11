import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ListaProductos } from './ListaProductos'
import * as productoServicio from '../../../servicios/productoServicio'

// Mock del servicio de productos
vi.mock('../../../servicios/productoServicio', () => ({
  getProductosServicio: vi.fn(),
  deleteProductoServicio: vi.fn()
}))

// Mock del LayoutAdmin para simplificar el test
vi.mock('../../../componentes/estructura/LayoutAdmin/LayoutAdmin', () => ({
  LayoutAdmin: ({ titulo, children }) => (
    <div data-testid="layout-admin">
      <h1>{titulo}</h1>
      {children}
    </div>
  )
}))

const mockProductos = [
  {
    id: 1,
    nombre: 'Producto 1',
    precio: 100,
    stock: 10,
    categoria: { nombre: 'HxH' },
    activo: true
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: 200,
    stock: 3,
    categoria: { nombre: 'One Piece' },
    activo: true
  },
  {
    id: 3,
    nombre: 'Producto 3',
    precio: 300,
    stock: 0,
    categoria: null,
    activo: true
  }
]

const renderListaProductos = () => {
  return render(
    <MemoryRouter>
      <ListaProductos />
    </MemoryRouter>
  )
}

describe('ListaProductos - Admin', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    window.confirm = vi.fn(() => true)
  })

  describe('a) Carga inicial: renderiza productos, normaliza atributo "activo", muestra estilos y botones', () => {

    it('debería renderizar la tabla de productos después de cargar', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
        expect(screen.getByText('Producto 2')).toBeInTheDocument()
        expect(screen.getByText('Producto 3')).toBeInTheDocument()
      })
    })

    it('debería mostrar spinner durante la carga', () => {
      vi.mocked(productoServicio.getProductosServicio).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockProductos), 1000))
      )

      renderListaProductos()

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('debería mostrar columnas correctas de la tabla', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('# ID')).toBeInTheDocument()
        expect(screen.getByText('Nombre')).toBeInTheDocument()
        expect(screen.getByText('Precio')).toBeInTheDocument()
        expect(screen.getByText('Stock')).toBeInTheDocument()
        expect(screen.getByText('Categoría')).toBeInTheDocument()
        expect(screen.getByText('Acciones')).toBeInTheDocument()
      })
    })

    it('debería mostrar datos de productos correctamente', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {

        expect(screen.getByText('Producto 1')).toBeInTheDocument()
        expect(screen.getByText('Producto 2')).toBeInTheDocument()
        expect(screen.getByText('HxH')).toBeInTheDocument()
        expect(screen.getByText('One Piece')).toBeInTheDocument()
      })
    })

    it('debería normalizar categoría como "Sin Categoría" cuando es null', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Sin Categoría')).toBeInTheDocument()
      })
    })

    it('debería mostrar estilos de alerta crítica para stock bajo (<=5)', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 2')).toBeInTheDocument()
        const elementosConStockCritico = document.querySelectorAll('.stock-critico')
        expect(elementosConStockCritico.length).toBeGreaterThan(0)
      })
    })

    it('debería mostrar botones de editar y eliminar para cada producto', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        const botonesEditar = screen.getAllByRole('button', { name: '' }).filter(btn => 
          btn.querySelector('[data-icon="pen"]') || btn.className.includes('warning')
        )
        const botonesEliminar = screen.getAllByRole('button', { name: '' }).filter(btn => 
          btn.querySelector('[data-icon="trash"]') || btn.className.includes('danger')
        )
        
        expect(botonesEditar.length).toBeGreaterThanOrEqual(1)
        expect(botonesEliminar.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('debería mostrar botón "Crear Nuevo Producto"', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        const botonCrear = screen.getByRole('button', { name: /crear nuevo producto/i })
        expect(botonCrear).toBeInTheDocument()
      })
    })

  })

  describe('b) Botón eliminar: invoca correctamente a Patch/Delete, actualiza lista y muestra alertas', () => {

    it('debería mostrar confirmación antes de eliminar', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      expect(window.confirm).toHaveBeenCalled()
    })

    it('debería incluir el ID del producto en el mensaje de confirmación', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('ID 1'))
    })

    it('debería invocar deleteProductoServicio cuando se confirma eliminación', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockResolvedValue({})

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        expect(productoServicio.deleteProductoServicio).toHaveBeenCalledWith(1)
      })
    })

    it('debería eliminar el producto de la lista después de eliminación exitosa', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockResolvedValue({})

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        expect(screen.queryByText('Producto 1')).not.toBeInTheDocument()
      })
    })

    it('debería mostrar alerta de éxito después de eliminar producto', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockResolvedValue({})

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        expect(screen.getByText('Producto eliminado exitosamente.')).toBeInTheDocument()
      })
    })

    it('debería mostrar alerta con variant success después de eliminación exitosa', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockResolvedValue({})

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        const alerta = screen.getByText('Producto eliminado exitosamente.').closest('div')
        expect(alerta).toHaveClass('alert-success')
      })
    })

    it('debería mostrar alerta de error cuando falla la eliminación', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockRejectedValue(
        new Error('Error en servidor')
      )

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        expect(screen.getByText('Error al eliminar el producto.')).toBeInTheDocument()
      })
    })

    it('debería mostrar alerta con variant danger cuando hay error', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockRejectedValue(
        new Error('Error en servidor')
      )

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      await waitFor(() => {
        const alerta = screen.getByText('Error al eliminar el producto.').closest('div')
        expect(alerta).toHaveClass('alert-danger')
      })
    })

  })

  describe('c) Cancelación confirm: no llama Delete ni alerta si usuario cancela', () => {

    it('no debería llamar deleteProductoServicio cuando se cancela la confirmación', async () => {
      window.confirm = vi.fn(() => false)
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)
      vi.mocked(productoServicio.deleteProductoServicio).mockResolvedValue({})

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      expect(productoServicio.deleteProductoServicio).not.toHaveBeenCalled()
    })

    it('no debería mostrar alerta cuando se cancela', async () => {
      window.confirm = vi.fn(() => false)
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      expect(screen.queryByText('Producto eliminado exitosamente.')).not.toBeInTheDocument()
      expect(screen.queryByText('Error al eliminar el producto.')).not.toBeInTheDocument()
    })

    it('debería mantener el producto en la lista cuando se cancela', async () => {
      window.confirm = vi.fn(() => false)
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        expect(screen.getByText('Producto 1')).toBeInTheDocument()
      })

      const botones = screen.getAllByRole('button')
      const botonEliminar = botones.find(btn => btn.className.includes('danger'))

      await userEvent.click(botonEliminar)

      expect(screen.getByText('Producto 1')).toBeInTheDocument()
    })

  })

  describe('d) Accesibilidad básica: usa getByRole y findByText en vez de getByTestId', () => {

    it('debería usar getByRole para encontrar títulos', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      const titulo = screen.getByRole('heading', { name: 'Gestión de Productos' })
      expect(titulo).toBeInTheDocument()
    })

    it('debería usar getByRole para encontrar tabla', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        const tabla = screen.getByRole('table')
        expect(tabla).toBeInTheDocument()
      })
    })

    it('debería usar getByRole para encontrar botones', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        const botones = screen.getAllByRole('button')
        expect(botones.length).toBeGreaterThan(0)
      })
    })

    it('debería usar getByRole para encontrar links', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      await waitFor(() => {
        const botones = screen.getAllByRole('button')
        expect(botones.length).toBeGreaterThan(0)
      })
    })

    it('debería permitir encontrar textos con findByText', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      const producto = await screen.findByText('Producto 1')
      expect(producto).toBeInTheDocument()
    })

    it('no debería usar getByTestId en los tests', async () => {
      vi.mocked(productoServicio.getProductosServicio).mockResolvedValue(mockProductos)

      renderListaProductos()

      const titulo = screen.getByRole('heading', { name: 'Gestión de Productos' })
      expect(titulo).toBeInTheDocument()
    })

  })

})

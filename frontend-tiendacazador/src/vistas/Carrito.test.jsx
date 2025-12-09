import React from 'react'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CarritoProvider } from '../contexto/CarritoContexto.jsx'
import { AuthProvider } from '../contexto/AuthContexto.jsx'
import { Carrito } from './Carrito.jsx'

const sampleCart = [
  {
    id: 'p1',
    nombre: 'Producto A',
    precio: 1000,
    cantidad: 2,
    imagen: '/img/a.jpg'
  },
  {
    id: 'p2',
    nombre: 'Producto B',
    precio: 2000,
    cantidad: 1,
    imagen: '/img/b.jpg'
  }
]

function renderWithCarrito(initial = []) {
  // Pre-populate localStorage so CarritoProvider picks it up on init
  localStorage.setItem('carrito', JSON.stringify(initial))
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CarritoProvider>
          <Carrito />
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  // restore confirm if test replaced it
  if (window.confirm && window.confirm._isMock) {
    delete window.confirm
  }
})

test('Carga items del carrito y muestra el total correcto', async () => {
  renderWithCarrito(sampleCart)

  // los nombres de producto deben aparecer
  expect(await screen.findByText('Producto A')).toBeInTheDocument()
  expect(screen.getByText('Producto B')).toBeInTheDocument()

  const total = sampleCart.reduce((acc, it) => acc + it.precio * it.cantidad, 0)
  const totalStr = `$${total.toLocaleString('es-CL')}`
  const resumen = screen.getByText('Resumen del Pedido').closest('.resumen-carrito')
  expect(within(resumen).getByText(totalStr)).toBeInTheDocument()
})

test('Eliminar un producto actualiza la UI y el total', async () => {
  renderWithCarrito(sampleCart)
  const user = userEvent.setup()

  const filaA = await screen.findByText('Producto A')
  const row = filaA.closest('tr')
  const buttons = within(row).getAllByRole('button')
  const deleteBtn = buttons.find((b) => b.classList.contains('btn-danger'))

  await user.click(deleteBtn)

  await waitFor(() => {
    expect(screen.queryByText('Producto A')).toBeNull()
  })

  const newTotal = sampleCart
    .filter((p) => p.id !== 'p1')
    .reduce((acc, it) => acc + it.precio * it.cantidad, 0)
  const resumen = screen.getByText('Resumen del Pedido').closest('.resumen-carrito')
  expect(within(resumen).getByText(`$${newTotal.toLocaleString('es-CL')}`)).toBeInTheDocument()
})

test('Vaciar carrito confirma y borra todos los items', async () => {
  renderWithCarrito(sampleCart)
  const user = userEvent.setup()

  // mock confirm to accept
  window.confirm = (() => true)
  window.confirm._isMock = true

  const vaciarBtn = await screen.findByRole('button', { name: /vaciar carrito/i })
  await user.click(vaciarBtn)

  await waitFor(() => {
    expect(screen.queryByText('Producto A')).toBeNull()
    expect(screen.queryByText('Producto B')).toBeNull()
  })

  const stored = JSON.parse(localStorage.getItem('carrito') || 'null')
  expect(Array.isArray(stored) && stored.length === 0).toBe(true)
})

test('Vaciar carrito cancelado no borra los items', async () => {
  renderWithCarrito(sampleCart)
  const user = userEvent.setup()

  // mock confirm to cancel
  window.confirm = (() => false)
  window.confirm._isMock = true

  const vaciarBtn = await screen.findByRole('button', { name: /vaciar carrito/i })
  await user.click(vaciarBtn)

  // items siguen presentes
  expect(await screen.findByText('Producto A')).toBeInTheDocument()
  expect(screen.getByText('Producto B')).toBeInTheDocument()
})

test('LocalStorage se actualiza cuando se elimina un item', async () => {
  renderWithCarrito(sampleCart)
  const user = userEvent.setup()

  const filaA = await screen.findByText('Producto A')
  const row = filaA.closest('tr')
  const buttons = within(row).getAllByRole('button')
  const deleteBtn = buttons.find((b) => b.classList.contains('btn-danger'))

  await user.click(deleteBtn)

  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('carrito') || 'null')
    expect(Array.isArray(stored) && stored.length === 1).toBe(true)
    expect(stored[0].id).toBe('p2')
  })
})

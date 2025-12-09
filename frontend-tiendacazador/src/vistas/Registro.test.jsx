import { vi } from 'vitest'
const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import * as authServicio from '../servicios/authServicio.js'
import * as datos from '../recursos/datos/registroFormDatos.js'
import { CarritoProvider } from '../contexto/CarritoContexto.jsx'
import { AuthProvider } from '../contexto/AuthContexto.jsx'

import { Registro } from './Registro.jsx'

describe('Registro', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    localStorage.clear()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('muestra error de validación cuando RUT no es válido', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CarritoProvider>
            <Registro />
          </CarritoProvider>
        </AuthProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    // RUT inválido
    await user.type(screen.getByPlaceholderText(/12345678K/i), '123')
    await user.type(screen.getByPlaceholderText(/Juan/i), 'Juan')
    await user.type(screen.getByPlaceholderText(/Pérez González/i), 'Pérez')
    await user.type(screen.getByPlaceholderText(/ejemplo@gmail.com/i), 'test@duocuc.cl')
    await user.type(screen.getByPlaceholderText(/Av. Siempre Viva 123/i), 'Calle 1')
    await user.selectOptions(screen.getByLabelText(/Región/i), 'Región Metropolitana de Santiago')
    // esperar a que la comuna 'Santiago' exista antes de seleccionarla
    await screen.findByRole('option', { name: 'Santiago' })
    await user.selectOptions(screen.getByLabelText(/Comuna/i), 'Santiago')
    await user.type(screen.getByPlaceholderText(/Contraseña/i), 'abcd')

    await user.click(screen.getByRole('button', { name: /Registrarse/i }))

    expect(await screen.findByText(/El RUT ingresado no es válido/i)).toBeInTheDocument()
  })

  test('registro exitoso llama al servicio y redirige al login', async () => {
    vi.spyOn(authServicio, 'registroServicio').mockResolvedValue({ ok: true })
    // Evitar depender de la lógica de validación en esta prueba: forzamos validaciones a true
    vi.spyOn(datos, 'validarRut').mockReturnValue(true)
    vi.spyOn(datos, 'validarNombre').mockReturnValue(true)
    vi.spyOn(datos, 'validarApellidos').mockReturnValue(true)
    vi.spyOn(datos, 'validarCorreo').mockReturnValue(true)
    vi.spyOn(datos, 'validarDireccion').mockReturnValue(true)
    vi.spyOn(datos, 'validarContrasena').mockReturnValue(true)
    window.alert = vi.fn()

    render(
      <MemoryRouter>
        <AuthProvider>
          <CarritoProvider>
            <Registro />
          </CarritoProvider>
        </AuthProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()

    // Llenar campos mínimos usando valores válidos
    await user.type(screen.getByPlaceholderText(/12345678K/i), '12345678K')
    await user.type(screen.getByPlaceholderText(/Juan/i), 'Juan')
    await user.type(screen.getByPlaceholderText(/Pérez González/i), 'Pérez')
    await user.type(screen.getByPlaceholderText(/ejemplo@gmail.com/i), 'test@duocuc.cl')
    await user.type(screen.getByPlaceholderText(/Av. Siempre Viva 123/i), 'Calle 1')
    // seleccionar región y comuna
    await user.selectOptions(screen.getByLabelText(/Región/i), 'Región Metropolitana de Santiago')
    await screen.findByRole('option', { name: 'Santiago' })
    await user.selectOptions(screen.getByLabelText(/Comuna/i), 'Santiago')
    await user.type(screen.getByPlaceholderText(/Contraseña/i), 'abcd')

    await user.click(screen.getByRole('button', { name: /Registrarse/i }))

    // espera que el servicio haya sido llamado y que alert + navigate ejecuten
    await waitFor(() => {
      expect(authServicio.registroServicio).toHaveBeenCalled()
      expect(window.alert).toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalledWith('/login')
    })
  })
})

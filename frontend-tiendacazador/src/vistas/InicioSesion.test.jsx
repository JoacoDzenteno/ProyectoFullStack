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

import * as authContext from '../contexto/AuthContexto.jsx'
import { CarritoProvider } from '../contexto/CarritoContexto.jsx'
import * as authServicio from '../servicios/authServicio.js'

import { InicioSesion } from './InicioSesion.jsx'

describe('InicioSesion', () => {
  const loginMock = vi.fn()
  beforeEach(() => {
    vi.resetAllMocks()
    vi.spyOn(authContext, 'useAuth').mockReturnValue({ login: loginMock })
  })

  test('login exitoso llama a login del contexto y navega al panel', async () => {
    vi.spyOn(authServicio, 'loginServicio').mockResolvedValue({ id: 'u1', nombre: 'Test' })

    render(
      <MemoryRouter>
        <CarritoProvider>
          <InicioSesion />
        </CarritoProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/Correo electrónico/i), 'test@duocuc.cl')
    await user.type(screen.getByPlaceholderText(/Contraseña/i), 'secret')
    await user.click(screen.getByRole('button', { name: /Ingresar/i }))

    await waitFor(() => {
      expect(authServicio.loginServicio).toHaveBeenCalledWith('test@duocuc.cl', 'secret')
      expect(loginMock).toHaveBeenCalledWith({ id: 'u1', nombre: 'Test' })
      expect(navigateMock).toHaveBeenCalledWith('/admin/panel')
    })
  })

  test('muestra error cuando el servicio de login falla', async () => {
    vi.spyOn(authServicio, 'loginServicio').mockRejectedValue(new Error('Credenciales inválidas'))

    render(
      <MemoryRouter>
        <CarritoProvider>
          <InicioSesion />
        </CarritoProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/Correo electrónico/i), 'bad@duocuc.cl')
    await user.type(screen.getByPlaceholderText(/Contraseña/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /Ingresar/i }))

    expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument()
    // botón debe volver a estar habilitado
    expect(screen.getByRole('button', { name: /Ingresar/i })).not.toBeDisabled()
  })
})

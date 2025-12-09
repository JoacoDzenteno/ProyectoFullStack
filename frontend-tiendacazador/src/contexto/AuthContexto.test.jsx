import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import * as authServicio from '../servicios/authServicio.js'
import { AuthProvider, useAuth } from './AuthContexto.jsx'

// Small consumer to inspect and drive the context
function Consumer() {
  const { usuario, login, logout } = useAuth()
  return (
    <div>
      <div data-testid="usuario">{usuario ? usuario.nombre : 'no-user'}</div>
      <button onClick={() => login({ usuario: { id: 'x', nombre: 'manual' } })}>login-manual</button>
      <button onClick={() => logout()}>logout-btn</button>
    </div>
  )
}

describe('AuthContexto', () => {
  afterEach(() => {
    vi.resetAllMocks()
    localStorage.clear()
  })

  test('setea usuario cuando hay usuario en localStorage (perfil verificado)', async () => {
    // Simular perfil ya verificado en localStorage (el provider lee localStorage en init)
    localStorage.setItem('usuario', JSON.stringify({ id: 'u1', nombre: 'TestUser' }))
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('usuario').textContent).toBe('TestUser')
    })
  })

  test('setea usuario null cuando verificarPerfil rechaza', async () => {
    vi.spyOn(authServicio, 'verificarPerfilServicio').mockRejectedValue(new Error('no session'))
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('usuario').textContent).toBe('no-user')
    })
  })

  test('login y logout funcionan y limpian localStorage', async () => {
    // inicialmente no hay usuario en localStorage
    // no es necesario espiar verificarPerfilServicio porque el provider no lo llama actualmente

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    )

  // esperar a que el provider haya terminado la verificación inicial y el consumer esté en el DOM
  await waitFor(() => expect(screen.getByTestId('usuario')).toBeInTheDocument())

  // login vía la función del contexto
  const user = userEvent.setup()
  await user.click(screen.getByText('login-manual'))

  await waitFor(() => expect(screen.getByTestId('usuario').textContent).toBe('manual'))

    // logout debe limpiar usuario del contexto y de localStorage
    await user.click(screen.getByText('logout-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('usuario').textContent).toBe('no-user')
      expect(localStorage.getItem('usuario')).toBeNull()
    })
  })
})

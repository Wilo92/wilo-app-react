import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Componente App', () => {
  test('muestra una alerta al hacer clic en el botón', () => {
    // Simula la función alert
    window.alert = jest.fn();

    // Renderiza el componente
    render(<App />);

    // Busca el botón por su texto
    const boton = screen.getByText('¡Personal Web site!');

    // Simula un clic en el botón
    fireEvent.click(boton);

    // Verifica que se haya llamado a alert con el mensaje correcto
    expect(window.alert).toHaveBeenCalledWith('¡Personal Web site!');
  });
});

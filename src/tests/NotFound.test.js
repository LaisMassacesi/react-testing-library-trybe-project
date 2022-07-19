import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Verifique o componente Not Found', () => {
  test('Teste se a página contém um heading com o devido texto', () => {
    renderWithRouter(<NotFound />);

    const notFoundTxt = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTxt).toBeInTheDocument();
  });

  test('Verifique se a página mostra a devida imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying/i);
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toContain(`${srcImg}`);
  });
});

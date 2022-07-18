import { render, screen } from '@testing-library/react';
import history from '../renderWithRouter'
import React from 'react';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    render(<App />);

    const linkHome = screen.getByRole('link', 'Home');
    expect(linkHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    render(<App />);

    const linkHome = screen.getByRole('link', 'About');
    expect(linkHome).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(<App />);

    const linkHome = screen.getByRole('link', 'Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
  });
});

describe('Teste se é redirecionada para a página inicial ao clicar no link home', () => {
  const history = screen.
});

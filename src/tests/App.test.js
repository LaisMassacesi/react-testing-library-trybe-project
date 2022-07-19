import React from 'react';
// import { Router } from 'react-router-dom/';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWhithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    renderWhithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /About/i });
    expect(linkHome).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWhithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkHome).toBeInTheDocument();
  });
});

describe('Teste se os links renderizam os respectivos componentes ao clicar', () => {
  test('Verifica se redireciona para /home ao clicar em Home', () => {
    const { history } = renderWhithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se redireciona para /about ao clicar em About', () => {
    const { history } = renderWhithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Verifica se redireciona para /favorites ao clicar em Favorite Pokémons', () => {
    const { history } = renderWhithRouter(<App />);

    const linkFavs = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavs).toBeInTheDocument();

    userEvent.click(linkFavs);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('redirect página Not Found no caso de uma url desconhecida', () => {
    const { history } = renderWhithRouter(<App />);
    history.push('/pag/q-nao-existe/');

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});

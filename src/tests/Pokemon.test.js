import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByAltText(/Pikachu sprite/i);
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg.src).toContain(src);
  });

  test('Teste se cada card do pokemon possui o link More Details', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeTruthy();

    const favorite = screen.getByAltText(/is marked as favorite/i);
    const src = '/star-icon.svg';
    expect(favorite.src).toContain(src);
  });
});

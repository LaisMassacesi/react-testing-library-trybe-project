import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Teste o componente Favorite Pokemons', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');

    const notFoundMsg = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', async () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkFavorite);

    history.push('/favorites');

    const favorited = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favorited).toBeInTheDocument();
  });
});

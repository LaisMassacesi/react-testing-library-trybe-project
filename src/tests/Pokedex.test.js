import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  test('Teste se a página contém um heading Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pageTitle = screen.getByRole('heading',
      { name: /Encountered pokémons/i }, { level: 2 });
    expect(pageTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo pokémon da lista', () => {
    renderWithRouter(<App />);

    const pokemon = screen.queryByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btnNext);

    const nextPokemon = screen.queryByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType).toBeDefined();
    expect(btnType).toHaveLength(+'7');

    const btnEletric = screen.getAllByRole('button', { name: 'Electric' });
    expect(btnEletric).toHaveLength(1);

    const btnFire = screen.getAllByRole('button', { name: 'Fire' });
    expect(btnFire).toHaveLength(1);

    const btnBug = screen.getAllByRole('button', { name: 'Bug' });
    expect(btnBug).toHaveLength(1);

    const btnPoison = screen.getAllByRole('button', { name: 'Poison' });
    expect(btnPoison).toHaveLength(1);

    const btnPsychic = screen.getAllByRole('button', { name: 'Psychic' });
    expect(btnPsychic).toHaveLength(1);

    const btnNormal = screen.getAllByRole('button', { name: 'Normal' });
    expect(btnNormal).toHaveLength(1);

    const btnDragon = screen.getAllByRole('button', { name: 'Dragon' });
    expect(btnDragon).toHaveLength(1);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);

    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const renderPokemon = screen.getByText(pokemonName);
      expect(renderPokemon).toBeInTheDocument();

      const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(btnNext);
    });
  });
});

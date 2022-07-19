import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWhithRouter from '../renderWithRouter';

describe('Teste se a página About contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading com o texto About Pokédex;', () => {
    renderWhithRouter(<About />);

    const aboutTxt = screen.getByRole('heading',
      { name: /About Pokédex/i }, { level: 2 });
    expect(aboutTxt).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWhithRouter(<About />);

    const describeTxt = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia/i,
    );
    expect(describeTxt).toBeInTheDocument();

    const detailsTxt = screen.getByText(
      /One can filter Pokémons by type, and see more details /i,
    );
    expect(detailsTxt).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWhithRouter(<About />);

    const Img = screen.getAllByAltText(/Pokédex/i);
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(Img[0].src).toContain(`${srcImg}`);
  });
});

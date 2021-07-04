import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';

import TagsInput from './TagsInput'

describe('TagsInput component', () => {
	beforeEach(jest.clearAllMocks);

  it('deve renderizar duas tags', async () => {
    function handleSelectedTags() { return }

    // renderizacao do componente
		const { container } = render(
			<TagsInput name="emails" label="emails" selectedTags={handleSelectedTags}/>
		);

    // construcao do cenário: o usuário aqui está preenchendo
    // o input com dois e-mails válidos, separados por ;
    const value = 'teste1@teste.com;teste2@teste.com;';
    const field = screen.getByLabelText('emails');
    fireEvent.input(field, { target: { value }});
    fireEvent.blur(field);
    await screen.findByLabelText('emails');
    
    // o teste deverá quebrar se os dois componentes abaixo não
    // existirem
    screen.getByText('teste1@teste.com');
		screen.getByText('teste2@teste.com');
	});

  // it('deve deletar a útima tag criada ao pressionar o botão de backspace', async () => {
  //   console.warn('teste não implementado.');
  // });
});
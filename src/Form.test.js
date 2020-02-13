import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Form from './Form';

describe('Form', () => {
  const submitFn = jest.fn();
  const formInputConfig = [
    {
      text: 'Your Name:',
      identifier: 'name'
    },
    {
      text: 'Your Date of Birth:',
      identifier: 'birthday'
    }
  ];
  const props = {
    inputConfig: formInputConfig,
    btnText: 'Submit',
    formHeader: 'My Example Form',
    isDisabled: false,
    onSubmit: submitFn
  };
  test('fills and submits the form successfully', async () => {
    const { getByLabelText, getByText } = render(<Form {...props} />);

    fireEvent.change(getByLabelText('Your Name:'), {
      target: { value: 'Michael Bolton' }
    });

    fireEvent.change(getByLabelText('Your Date of Birth:'), {
      target: { value: '2/21/1991' }
    });

    const button = getByText('Submit');

    fireEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith({
      birthday: '2/21/1991',
      name: 'Michael Bolton'
    });
  });
});

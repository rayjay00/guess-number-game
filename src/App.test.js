import React from 'react';
import App from './App.jsx';

import { initialState } from './state';

import { render, fireEvent } from '@testing-library/react';

describe('App functionality', () => {
  test('Sets upper and lower bounds, triggers proper actions on submit', () => {
    const { getByLabelText, getByText } = render(<App />);
    window.alert = jest.fn();

    const upperBoundInput = getByLabelText('Upper Bound:');
    const lowerBoundInput = getByLabelText('Lower Bound:');

    let lowerUpperText = getByText(
      `Guess the number between ${initialState.lowNum} and ${initialState.highNum}.`
    );
    expect(lowerUpperText).toBeInTheDocument();

    // choose upper/lower bound
    fireEvent.change(upperBoundInput, { target: { value: '30' } });
    fireEvent.change(lowerBoundInput, { target: { value: '-20' } });

    lowerUpperText = getByText('Guess the number between -20 and 30.');
    expect(lowerUpperText).toBeInTheDocument();

    // numbers only
    const guessInput = getByLabelText('Your Guess:');
    fireEvent.change(guessInput, { target: { value: 'gdf' } });
    fireEvent.click(getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith('Only numbers please!');

    // mismatched number
    fireEvent.change(upperBoundInput, { target: { value: '-20' } });
    fireEvent.change(lowerBoundInput, { target: { value: '20' } });
    fireEvent.change(guessInput, { target: { value: '10' } });
    fireEvent.click(getByText('Submit'));
    expect(window.alert).toHaveBeenCalledWith(
      'Hey! Your numbers are mismatched. Make sure your low bound is actually lower than the high bound.'
    );
  });
});

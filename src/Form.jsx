import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import InputAction from "./InputAction";

import { colors, StyledButton } from "./styles";

const StyledForm = styled.form`
  flex: 1;
  border: 1px solid ${colors.tertiary};
  font-family: Helvetica, sans-serif;
  margin-top: 1rem;
  padding: 0 1rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export default function Form({
  btnText,
  formHeader,
  inputConfig,
  isDisabled,
  onSubmit
}) {
  const [formVals, setFormVals] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }

    onSubmit(formVals);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {formHeader && <h2>{formHeader}</h2>}
      {inputConfig.map(config => (
        <InputAction
          {...config}
          key={config.identifier}
          inputProps={{
            onChange: e =>
              setFormVals({
                ...formVals,
                [config.identifier]: e.target.value
              })
          }}
        />
      ))}
      <StyledButton primary disabled={isDisabled} type="submit">
        {btnText}
      </StyledButton>
    </StyledForm>
  );
}

Form.defaultProps = {
  isDisabled: false
};

Form.propTypes = {
  btnText: PropTypes.string.isRequired,
  formHeader: PropTypes.string,
  inputConfig: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

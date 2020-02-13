import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors } from "./styles";

const StyledInputWrapper = styled.div`
  display: flex;
  margin: 0.25rem 0;
  font-family: Helvetica, sans-serif;
  label {
    flex: 0.25;
    text-align: left;
  }
  input {
    flex: 1;
    border: 1px solid ${colors.primary};
    margin-left: 10px;
    font-size: 1rem;
  }
`;

export default function InputAction({
  identifier,
  inputProps,
  required,
  text,
  type,
  value
}) {
  return (
    <StyledInputWrapper>
      <label htmlFor={identifier}>{text}</label>
      <input
        type={type}
        name={identifier}
        value={value}
        id={identifier}
        required={required}
        {...inputProps}
      />
    </StyledInputWrapper>
  );
}

InputAction.defaultProps = {
  type: "text"
};

InputAction.propTypes = {
  identifier: PropTypes.string.isRequired,
  inputProps: PropTypes.object.isRequired,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

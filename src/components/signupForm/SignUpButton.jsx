import React from 'react';
import styled from 'styled-components';

const SignUpButton = ({buttonTxt, handleClick}) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={handleClick}>
        <span>{buttonTxt}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
    padding: 5px;
    width: 100%;
    border-radius: 10px;
    font-size: 1em;
    cursor: pointer;
  }

  .button span {
    position: relative;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: #1E1334;
    border-radius: 9px;
    transition: 0.5s;
  }

  .button:hover::before {
    opacity: 0.7;
  }

  .button::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
    border-radius: 9px;
    transition: 0.5s;
    opacity: 0;
    filter: blur(20px);
  }

  .button:hover:after {
    opacity: 1;
  }`;

export default SignUpButton;

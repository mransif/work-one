import React from 'react';
import styled from 'styled-components';

const Button = ({click, text,type,style}) => {
  return (
    <StyledWrapper>
      <button onClick={click} type={type} className="custom-btn btn-1 btn-mrgin">{text}</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .custom-btn {
   width: 100%;
   height: 40px;
   color: #fff;
   border-radius: 5px;
   padding: 10px 25px;
   font-family: 'Lato', sans-serif;
   font-weight: 500;
   background: transparent;
   cursor: pointer;
   transition: all 0.3s ease;
   position: relative;
   display: inline-block;
   box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5),
     7px 7px 20px 0px rgba(0,0,0,.1),
     4px 4px 5px 0px rgba(0,0,0,.1);
   outline: none;
  }

  .btn-1 {
   background: rgb(96,9,240);
   background: #01B707;
   border: none;
  }

  .btn-1:before {
   height: 0%;
   width: 2px;
  }

  .btn-1:hover {
   box-shadow: 4px 4px 6px 0 rgba(255,255,255,.5),
                -4px -4px 6px 0 rgba(116, 125, 136, .5), 
      inset -4px -4px 6px 0 rgba(255,255,255,.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
  }`;

export default Button;

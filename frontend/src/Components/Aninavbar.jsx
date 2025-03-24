import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <div className="nav">
        <div className="container">
          <div className="btn">Home</div>
          <div className="btn">Contact</div>
          <div className="btn">About</div>
          <div className="btn">FAQ</div>
          <svg
            className="outline"
            overflow="visible"
            width="100%"
            height={60}
            viewBox="0 0 1000 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="rect"
              pathLength={100}
              x={0}
              y={0}
              width="100%"
              height={60}
              fill="transparent"
              strokeWidth={5}
            />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .rect {
    stroke-dashoffset: 5;
    stroke-dasharray: 0 0 10 100 10 100; /* Adjusted for full width */
    transition: 0.5s;
    stroke: #fff;
  }

  .nav {
    position: relative;
    width: 100vw; /* Full screen width */
    height: 60px;
  }

  .container {
    position: absolute;
    inset: 0;
    background: #bef6;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em;
    width: 100vw; /* Full width */
  }

  .container:hover .outline .rect {
    transition: 999999s;
    stroke-dashoffset: 1;
    stroke-dasharray: 0;
  }

  .btn {
    padding: 0.5em 1.5em;
    color: #fff;
    cursor: pointer;
    transition: 0.1s;
  }

  .btn:hover {
    background: #fff3;
  }

  /* Adjust stroke-dasharray values proportionally for full width */
  .btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 5% 10% 20% 10% 5%;
  }

  .btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 10% 10% 30% 10% 10%;
  }

  .btn:nth-child(3):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 15% 10% 25% 10% 20%;
  }

  .btn:nth-child(4):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 20% 10% 15% 10% 40%;
  }

  .btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 100 10 100;
    transition: 0.5s !important;
  }
`;

export default Button;

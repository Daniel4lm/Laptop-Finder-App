import styled from "styled-components";
import { useMobileContext } from "../../contexts/MobileContext";

export default function Hamburger() {

  const { mobState, toggleNav } = useMobileContext();

  const handleToggle = () => {
    toggleNav();
  }

  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleToggle}>
        <Icon clicked={mobState.toggle}>&nbsp;</Icon>
      </MenuLabel>
    </>
  )
}

const MenuLabel = styled.label`
  background-color: transparent;
  //position: absolute;
  //top: 0.5rem;
  //left: 0.4rem;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  //align-items: center;
  z-index: 1000;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "rgba(97, 98, 201, 0.8)")};
  width: 25px;
  height: 2px;
  margin-top: 21px;
  //display: inline-block;
  user-select: none;
  transition: all 0.3s;

    &::before,
    &::after {
      content: "";
      background-color: rgba(97, 98, 201, 0.8);
      width: 25px;
      height: 2px;
      //display: inline-block;
      position: absolute;
      left: 0;
      transition: all 0.3s;
    }
    &::before {
      top: ${(props) => (props.clicked ? "0" : "-0.6rem")};
      transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
    }
    &::after {
      top: ${(props) => (props.clicked ? "0" : "0.6rem")};
      transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
    }
    
    
`;

/*
${MenuLabel}:hover &::before {
      top: ${(props) => (props.clicked ? "0" : "-0.6rem")};
    }
    ${MenuLabel}:hover &::after {
      top: ${(props) => (props.clicked ? "0" : "0.6rem")};
    }
 */
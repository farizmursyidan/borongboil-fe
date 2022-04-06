import React from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';

export default function Backdrop({ toggleSidebar }) {
  return <Wrapper className={`${styles.darkBg}`} onClick={() => toggleSidebar(false)}></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  color : purpleBg
  
  top: 0;
  left: 0;
  z-index: 99;
  opacity: 0.8;
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import styles from '../../style/index.module.css';
// Assets
import logo from "../../assets/svg/Asset-1.svg";

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  const general = {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
    boxSizing: 'border-box'
  }

  return (
    <Wrapper>
      <div className={`${styles.darkBg}`}>
        <div className={`${styles.container}`}>
          <InnerWrapper className={`${styles.flexSpaceCenter}`} style={{ padding: "30px 0" }}>
            <Link className={`${styles.flexCenter} ${styles.animate} ${styles.pointer}`} to="home" smooth={true} offset={-80}>
              <img src={logo} width="50" style={{ filter: "invert(93%) sepia(93%) saturate(0%) hue-rotate(251deg) brightness(106%) contrast(105%)" }} />
              <h1 className={`${styles.font15} ${styles.extraBold} ${styles.whiteColor}`} style={{ marginLeft: "15px", ...general, paddingLeft: '10px' }}>
                borongboil
              </h1>
            </Link>
            <StyleP className={`${styles.whiteColor} ${styles.font13}`}>
              © {getCurrentYear()} - Borongboil.id All Rights Reserved
            </StyleP>
            <Link className={`${styles.whiteColor} ${styles.animate} ${styles.pointer} ${styles.font13}`} to="home" smooth={true} offset={-80} style={{ color: '#fff' }}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;
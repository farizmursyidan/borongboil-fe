import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';
import { Link } from "react-scroll";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import logo from "../../assets/svg/Asset-1.svg";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const general = {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
    boxSizing: 'border-box'
  }

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className={`${styles.flexCenter} ${styles.animate} ${styles.borongboilBg}`} style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className={`${styles.container} ${styles.flexSpaceCenter}`}>
          <Link className={`${styles.pointer} ${styles.flexNullCenter}`} to="home" smooth={true}>
            <img src={logo} width="50" style={{ marginRight: "10px" }} />
            <h1 style={{ marginLeft: "15px", ...general, color: "#0B093B" }} className={`${styles.font20} ${styles.extraBold}`}>
              borongboil
            </h1>
          </Link>
          <BurderWrapper className={`${styles.pointer}`} onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapperRight className={`${styles.flexNullCenter}`} style={general}>
            <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Jual Mobil
              </Link>
            </li>
            <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Kenapa Kami
              </Link>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;



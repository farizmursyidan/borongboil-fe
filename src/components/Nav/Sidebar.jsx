import React from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';
import { Link } from "react-scroll";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
// import LogoIcon from "../../assets/svg/Logo";
import logo from "../../assets/svg/Asset-1.svg";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className={`${styles.animate} ${styles.darkBg}`} sidebarOpen={sidebarOpen}>
      <SidebarHeader className={`${styles.flexSpaceCenter}`}>
        <div className={`${styles.flexNullCenter}`}>
          <img src={logo} width="50" style={{ marginRight: "10px", filter: "invert(93%) sepia(93%) saturate(0%) hue-rotate(251deg) brightness(106%) contrast(105%)" }} />
          <h1 className={`${styles.whiteColor} ${styles.font20}`} style={{ marginTop: "25px" }}>
            borongboil
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className={`${styles.animate} ${styles.pointer}`}>
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className={`${styles.flexNullCenter} ${styles.flexColumn}`}>
        <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className={`${styles.whiteColor}`}
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Home
          </Link>
        </li>
        <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className={`${styles.whiteColor}`}
            style={{ padding: "10px 15px" }}
            to="contact"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Jual Mobil
          </Link>
        </li>
        <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className={`${styles.whiteColor}`}
            style={{ padding: "10px 15px" }}
            to="services"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Kenapa Kami
          </Link>
        </li>
      </UlStyle>
      {/* <UlStyle className={`${styles.flexSpaceCenter}`}>
        <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer}`}>
          <a href="/" style={{ padding: "10px 30px 10px 0" }} className={`${styles.whiteColor}`}>
            Log in
          </a>
        </li>
        <li className={`${styles.semiBold} ${styles.font15} ${styles.pointer} ${styles.flexCenter}`}>
          <a href="/" className={`${styles.radius8} ${styles.lightBg}`} style={{ padding: "10px 15px" }}>
            Get Started
          </a>
        </li>
      </UlStyle> */}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;

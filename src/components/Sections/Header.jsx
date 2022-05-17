import React from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/heroimage.png";
import { Link } from "react-scroll";
// import Dots from "../../assets/svg/Dots";

export default function Header() {
  return (
    <Wrapper id="home" className={`${styles.container} ${styles.flexSpaceCenter}`} style={{ background: '#fff' }}>
      <LeftSide className={`${styles.flexCenter}`}>
        <div>
          <h1 className={`${styles.extraBold} ${styles.font60}`} style={{ color: '#0B093B' }}>DAPATKAN HARGA PENAWARAN TERBAIK UNTUK MOBIL ANDA</h1>
          <HeaderP className={`${styles.font15} ${styles.semiBold}`}>
            Jual mobil tidak perlu repot, dapatkan harga terbaik dan pelayanan terbaik bersama kami. Cukup isi form detail kendaraan anda tim kami akan datang ke tempat anda
          </HeaderP>
          <BtnWrapper>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-60}
            >
              <FullButton title="Cek disini" />
            </Link>
          </BtnWrapper>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img className={`${styles.radius8}`} src={HeaderImage} alt="office" style={{ zIndex: 9 }} />
        </ImageWrapper>
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  
  min-height: 500px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;



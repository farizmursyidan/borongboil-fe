import React from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';
// Assets
import RollerIcon from "../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../assets/svg/Services/PrinterIcon";

export default function ServiceBox({ icon, title, subtitle }) {
  let getIcon;

  switch (icon) {
    case "roller":
      getIcon = <MonitorIcon />;
      break;
    case "monitor":
      getIcon = <BrowserIcon />;
      break;
    case "browser":
      getIcon = <RollerIcon />;
      break;
    case "printer":
      getIcon = <PrinterIcon />;
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }


  return (
    <Wrapper className={`${styles.flex} ${styles.flexColumn}`}>
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className={`${styles.font20} ${styles.extraBold}`} style={{ color: '#0B093B' }}>{title}</TitleStyle>
      <SubtitleStyle className={`${styles.font13}`} style={{ color: '#0B093B' }}>{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
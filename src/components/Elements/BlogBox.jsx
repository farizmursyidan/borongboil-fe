import React from "react";
import styled from "styled-components";
import styles from '../../style/index.module.css';

export default function BlogBox({ tag, title, text, action, author }) {
  return (
    <WrapperBtn className={`${styles.animate} ${styles.pointer}`} onClick={action ? () => action() : null}>
      <Wrapper className={`${styles.whiteBg} ${styles.radius8} ${styles.shadow}`}>
        <h3 className={`${styles.font20} ${styles.extraBold}`}>{title}</h3>
        <p className={`${styles.font13}`} style={{ padding: "30px 0" }}>
          {text}
        </p>
        <p className={`${styles.font13} ${styles.extraBold}`}>{author}</p>
        <div className={`${flex}`}>
          <p className={`${styles.tag} ${styles.coralBg} ${styles.radius6} ${styles.font13} ${styles.extraBold}`}>{tag}</p>
        </div>
      </Wrapper>
    </WrapperBtn>
  );
}

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
`;
const WrapperBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  :hover {
    opacity: 0.5;
  }
`;

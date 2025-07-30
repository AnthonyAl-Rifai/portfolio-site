import styled from '@emotion/styled';
import React from 'react';
import usePixelScaler from '../../hooks/usePixelScaler';

const MenuOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MenuBody = styled.div<{ maxWidth: number }>(({ maxWidth = 450 }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth,
  textAlign: 'left',
}));

const CenterBody = styled.div<{ maxWidth: number }>(({ maxWidth = 450 }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth,
  textAlign: 'center',
}));

const HyphenatedParagraph = styled.p`
  text-align: left;
  hyphens: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
`;

interface MainMenuProps {
  onClose: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onClose }) => {
  const menuBodyProps = {
    maxWidth: usePixelScaler(300),
  };

  return (
    <MenuOverlay onClick={onClose}>
      <MenuBody {...menuBodyProps}>
        <HyphenatedParagraph><strong>sensei bonus</strong> is a duo based in northeast los angeles. after years of playing music together in various projects, friends and calarts alums anthony al-rifai and daniel jodeci found a shared vitality while quarantined during the covid-19 pandemic. in the absence of familiar escapes and distractions, al-rifai and jodeci channeled the claustrophobic days of 2020 into a sound that viscerally yearns for a dark, crowded dance floor.</HyphenatedParagraph>
        <HyphenatedParagraph>drawing from the propulsive energy of electronic body music and informed by the layered soundscapes of psychedelic rock, sensei bonus revels in the malaise and jubilance of the human condition. <br /> <br />one punch eraser is their debut album.</HyphenatedParagraph>
      </MenuBody>
      <CenterBody {...menuBodyProps}><strong>2.4.2024</strong></CenterBody>
    </MenuOverlay>
  );
};

export default MainMenu;

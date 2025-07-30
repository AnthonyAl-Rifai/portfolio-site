import styled from '@emotion/styled';
import AccessMoreIcon from '../../icons/AccessMoreIcon';
import { useState } from 'react';
import MainMenu from '../MainMenu/MainMenu';
import InstagramIcon from '../../icons/InstagramIcon';
import BandcampIcon from '../../icons/BandcampIcon';
import SpotifyIcon from '../../icons/SpotifyIcon';
import AppleMusicIcon from '../../icons/AppleMusicIcon';
import YoutubeIcon from '../../icons/YoutubeIcon';
import { keyframes } from '@emotion/react';
import useFirstRender from '../../hooks/useFirstRender';
import FadeContainer from './FadeContainer';
import usePixelScaler from '../../hooks/usePixelScaler';

const rotateIn = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(135deg);  }
`;

const rotateOut = keyframes`
  from { transform: rotate(135deg); }
  to { transform: rotate(0deg); }
`;

const TopNavContainer = styled.div(() => ({
  width: '100%',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  overflow: '',
  paddingTop: 20,
  paddingBottom: 20,
  zIndex: 101,
}));

const TopNavTextContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TopNavTopText = styled.p<{ fontSize?: number }>(({ fontSize = 26 }) => ({
  fontSize,
  color: '#646866',
  fontWeight: 400,
  margin: 0,
}));

const TopNavBottomText = styled.p<{ fontSize?: number }>(({ fontSize = 16 }) => ({
  fontSize,
  color: '#646866',
  fontWeight: 400,
  margin: 0,
}));

const ButtonContainer = styled.div(() => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  right: 7,
  top: 12,
}));

const IconButton = styled.button<{ shouldRotate?: boolean }>(({
  shouldRotate,
}) => {
  let animation;
  if (typeof shouldRotate !== 'undefined') {
    animation = `${shouldRotate ? rotateIn : rotateOut} 0.5s ease-out forwards`
  }
  return {
    padding: 10,
    ...(typeof animation !== 'undefined' ? { animation } : {})
  };
});

const TopNav: React.FC = () => {
  const [isMainMenuVisible, setIsMainMenuVisible] = useState(false);
  const isFirstRender = useFirstRender();

  const toggleMainMenu = () => {
    if (isMainMenuVisible) {
      setIsMainMenuVisible(false);
    } else {
      setIsMainMenuVisible(true);
    }
  };

  const shouldRotate = !isFirstRender ? isMainMenuVisible : undefined;

  const mainMenuContainerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: '#fffffff2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '100',
  };

  const topNavButtonContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const onInstagramClick = () => {
    window.open('https://www.instagram.com/senseibonus', '_blank', 'noopener,noreferrer');
  };

  const onBandcampClick = () => {
    window.open('https://senseibonus.bandcamp.com/album/one-punch-eraser', '_blank', 'noopener,noreferrer');
  };

  const onSpotifyClick = () => {
    window.open('https://open.spotify.com/album/7lcg5MFBM0FuemJk73VQ3F?si=Ma9o-IDgQyCjg9KUbJvnJw', '_blank', 'noopener,noreferrer');
  };

  const onAppleMusicClick = () => {
    window.open('https://music.apple.com/us/artist/sensei-bonus/1725067885', '_blank', 'noopener,noreferrer');
  };

  const onYoutubeClick = () => {
    window.open('https://www.youtube.com/@senseibonus', '_blank', 'noopener,noreferrer');
  };

  const mainNavIconSize = usePixelScaler(42);
  const navIconSize = usePixelScaler(36);
  const topTextSize = usePixelScaler(26);
  const bottomTextSize = usePixelScaler(16);

  return (
    <>
      <TopNavContainer>
        <TopNavTextContainer>
          <TopNavTopText fontSize={topTextSize}>one punch eraser</TopNavTopText>
          <TopNavBottomText fontSize={bottomTextSize}>sensei bonus</TopNavBottomText>
        </TopNavTextContainer>
        <ButtonContainer>
          <IconButton onClick={toggleMainMenu} shouldRotate={shouldRotate}>
            <AccessMoreIcon size={mainNavIconSize} strokeWidth={0.7} />
          </IconButton>
          <FadeContainer active={isMainMenuVisible} {...topNavButtonContainer}>
            <IconButton onClick={onInstagramClick}>
              <InstagramIcon size={navIconSize} strokeWidth={0.7} />
            </IconButton>
            <IconButton onClick={onBandcampClick}>
              <BandcampIcon size={navIconSize} strokeWidth={0.7} />
            </IconButton>
            <IconButton onClick={onSpotifyClick}>
              <SpotifyIcon size={navIconSize} strokeWidth={0.7} />
            </IconButton>
            <IconButton onClick={onAppleMusicClick}>
              <AppleMusicIcon size={navIconSize} strokeWidth={0.7} />
            </IconButton>
            <IconButton onClick={onYoutubeClick}>
              <YoutubeIcon size={navIconSize} strokeWidth={0.7} />
            </IconButton>
          </FadeContainer>
        </ButtonContainer>
      </TopNavContainer>
      <FadeContainer active={isMainMenuVisible} {...mainMenuContainerStyles}>
        <MainMenu onClose={toggleMainMenu} />
      </FadeContainer>
    </>
  )
};

export default TopNav;

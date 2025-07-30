import styled from '@emotion/styled';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import { ViewportProvider } from './context/ViewportContext';
import { PlayerProvider } from './context/PlayerContext';
import { useEffect } from 'react';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import TopNav from './components/TopNav/TopNav';
import useFontLoader from './hooks/useFontLoader';
import { useTrackPageVisit } from './hooks/usePlayerAnalytics';

const MainContainer = styled.div(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100vw',
  alignItems: 'center',
  flexDirection: 'column',
}));

const CenterContainer = styled.div(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const AudioPlayerContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexGrow: 1,
  marginTop: 90,
  paddingBottom: 90,
}));

function App() {
  const isFontLoaded = useFontLoader();
  useTrackPageVisit();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []); 

  const renderContent = () => {
    if (!isFontLoaded) {
      return (
        <CenterContainer>
          <LoadingIndicator />
        </CenterContainer>
      );
    }

    return (
      <MainContainer>
        <TopNav />
        <AudioPlayerContainer>
          <AudioPlayer />
        </AudioPlayerContainer>
      </MainContainer>
    );
  };

  return (
    <div className="App">
      <PlayerProvider>
        <ViewportProvider>
          {renderContent()}
        </ViewportProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;

import { useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import type { Screen, FormData, VoteStats, SpectrumStats } from './types';
import { useAudio } from './hooks/useAudio';
import { FloatingParticles } from './components/FloatingParticles';
import { GlitchTransition } from './components/GlitchTransition';
import { AudioToggle } from './components/AudioToggle';
import { LoaderScreen } from './screens/LoaderScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { VoteScreen } from './screens/VoteScreen';
import { SpectrumScreen } from './screens/SpectrumScreen';
import { FormScreen } from './screens/FormScreen';
import { InfoScreen } from './screens/InfoScreen';
import './App.css';

const INITIAL_FORM_DATA: FormData = {
  nombre: '',
  sexo: '',
  regalo: true,
  voto: null,
  espectro: 50,
};

const MOCK_VOTE_STATS: VoteStats = {
  total: 47,
  sombrero: 29,
  k: 18,
  porcentajeSombrero: 61.7,
  porcentajeK: 38.3,
};

const MOCK_SPECTRUM_STATS: SpectrumStats = {
  media: 42.5,
  mediana: 38,
  distribucion: [5, 8, 12, 18, 22, 28, 35, 42, 38, 30, 25, 20, 15, 10, 8, 5, 3, 2, 1, 1],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('loader');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [glitchActive, setGlitchActive] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const { enabled: audioEnabled, play: playAudio, toggle: toggleAudio, playSfx } = useAudio();

  const navigateTo = useCallback((nextScreen: Screen) => {
    playSfx('tap');
    setGlitchActive(true);
    
    // Short delay for glitch effect
    setTimeout(() => {
      setScreen(nextScreen);
      setGlitchActive(false);
      
      // Animate new screen in
      if (screenRef.current) {
        gsap.fromTo(
          screenRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    }, 150);
  }, [playSfx]);

  const handleLoaderComplete = useCallback(() => {
    playAudio();
    navigateTo('welcome');
  }, [playAudio, navigateTo]);

  const handleVote = useCallback((vote: 'sombrero' | 'k') => {
    playSfx('tap');
    setFormData(prev => ({ ...prev, voto: vote }));
  }, [playSfx]);

  const handleSpectrum = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, espectro: value }));
  }, []);

  const handleFormSubmit = useCallback((data: Partial<FormData>) => {
    playSfx('success');
    setFormData(prev => ({ ...prev, ...data }));
    navigateTo('info');
  }, [playSfx, navigateTo]);

  const renderScreen = () => {
    switch (screen) {
      case 'loader':
        return <LoaderScreen onComplete={handleLoaderComplete} />;
      case 'welcome':
        return <WelcomeScreen onStart={() => navigateTo('q1-vote')} />;
      case 'q1-vote':
        return (
          <VoteScreen
            selectedVote={formData.voto}
            stats={MOCK_VOTE_STATS}
            onVote={handleVote}
            onNext={() => navigateTo('q2-spectrum')}
          />
        );
      case 'q2-spectrum':
        return (
          <SpectrumScreen
            value={formData.espectro}
            stats={MOCK_SPECTRUM_STATS}
            onChange={handleSpectrum}
            onNext={() => navigateTo('form')}
          />
        );
      case 'form':
        return (
          <FormScreen
            formData={formData}
            voteStats={MOCK_VOTE_STATS}
            spectrumStats={MOCK_SPECTRUM_STATS}
            onSubmit={handleFormSubmit}
          />
        );
      case 'info':
        return <InfoScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex justify-center bg-pixel-black">
      {/* Mobile container */}
      <div className="w-full max-w-[480px] h-full relative overflow-hidden">
        {/* Floating particles on select screens */}
        {(screen === 'welcome' || screen === 'q1-vote' || screen === 'q2-spectrum') && (
          <FloatingParticles />
        )}

        {/* Screen content with transition */}
        <div ref={screenRef} className="relative w-full h-full" style={{ zIndex: 2 }}>
          {renderScreen()}
        </div>

        {/* Glitch transition overlay */}
        <GlitchTransition active={glitchActive} />

        {/* Audio toggle button */}
        {screen !== 'loader' && (
          <AudioToggle enabled={audioEnabled} onToggle={toggleAudio} />
        )}
      </div>
    </div>
  );
}

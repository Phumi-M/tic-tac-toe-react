import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/svgs/tic-tac-toe.svg';
import './LandingPage.css';

function LandingPage({ onPlay }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="landing-page">
      <button
        className="landing-theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      <div className="landing-content">
        <img src={logo} alt="Tic-Tac-Toe" className="landing-logo" />
        <h1 className="landing-title">Tic-Tac-Toe</h1>
        <p className="landing-subtitle">Challenge a friend and see who wins!</p>
        <button className="landing-play-btn" onClick={onPlay}>
          Play Now
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

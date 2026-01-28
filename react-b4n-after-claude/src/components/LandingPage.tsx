import * as React from 'react';
import '../styles/landing-page.css';

interface LandingPageProps {
  onSelect: (seconds: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => (
  <div className="landing-container">
    <div className="landing-logo">
      <p className="landing-title">🅱️4🅽 After</p>
      <p className="landing-subtitle">A Before and After category inspired game</p>
    </div>
    <button className="landing-btn easy" onClick={() => onSelect(60)}>Easy (60s)</button>
    <button className="landing-btn medium" onClick={() => onSelect(45)}>Medium (45s)</button>
    <button className="landing-btn hard" onClick={() => onSelect(30)}>Hard (30s)</button>
  </div>
);

export default LandingPage;

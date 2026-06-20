import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import LevelMap from './components/LevelMap';
import ShiftSetup, { DEFAULT_CONFIG } from './components/ShiftSetup';
import GameBoard from './components/GameBoard';
import { getLevelById } from './data/levels';

function HomePage() {
  const navigate = useNavigate();

  return (
    <LevelMap onSelectLevel={(levelId) => navigate(`/setup/${levelId}`)} />
  );
}

function SetupPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(levelId, 10);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const valid = !!getLevelById(id);

  useEffect(() => {
    if (!valid) navigate('/');
  }, [valid, navigate]);

  if (!valid) return null;

  return (
    <ShiftSetup
      levelId={id}
      config={config}
      onConfigChange={setConfig}
      onStart={() => navigate(`/play/${id}`, { state: { config } })}
      onBack={() => navigate('/')}
    />
  );
}

function PlayPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = parseInt(levelId, 10);
  const config = location.state?.config ?? DEFAULT_CONFIG;
  const valid = !!getLevelById(id);

  useEffect(() => {
    if (!valid) navigate('/');
  }, [valid, navigate]);

  if (!valid) return null;

  return (
    <GameBoard
      levelId={id}
      config={config}
      onBack={() => navigate(`/setup/${id}`)}
      onHome={() => navigate('/')}
      onNextLevel={(nextId) => navigate(`/setup/${nextId}`)}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setup/:levelId" element={<SetupPage />} />
          <Route path="/play/:levelId" element={<PlayPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

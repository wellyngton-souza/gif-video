import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import VideoEditor from './VideoEditor.tsx';
import "./tailwind/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoEditor />
  </StrictMode>,
)

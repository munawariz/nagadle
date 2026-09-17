import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/roboto';
// Design-system tokens, minus tokens/fonts.css: the app sets its own font (Roboto) in app.css.
import '@ds/tokens/colors.css';
import '@ds/tokens/typography.css';
import '@ds/tokens/spacing.css';
import '@ds/tokens/shape.css';
import '@ds/tokens/motion.css';
import '@ds/tokens/base.css';
import './app.css';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

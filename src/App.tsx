import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './layouts/MainLayout';
import { PersonProvider } from './contexts/PersonContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PlanYearProvider } from './contexts/PlanYearContext';

function App() {
  return (
    <HelmetProvider>
      <Router basename="/app">
        <NotificationProvider>
          <PlanYearProvider>
            <PersonProvider>
              <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PersonProvider>
          </PlanYearProvider>
        </NotificationProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

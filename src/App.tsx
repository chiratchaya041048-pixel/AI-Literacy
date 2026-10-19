/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext.tsx';
import { Navbar, AppView } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { LandingView } from './views/LandingView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { ModulesView } from './views/ModulesView.tsx';
import { LessonDetailView } from './views/LessonDetailView.tsx';
import { QuizView } from './views/QuizView.tsx';
import { InteractiveLabView } from './views/InteractiveLabView.tsx';
import { AnalyticsView } from './views/AnalyticsView.tsx';
import { SettingsView } from './views/SettingsView.tsx';

function MainApp() {
  const { progress } = useLearning();

  // Initial view: if learner has started or taken pre-test, default to dashboard, else landing
  const [currentView, setCurrentView] = useState<AppView>(() => {
    return progress.completedModules.length > 0 || progress.preTestScore !== null
      ? 'dashboard'
      : 'landing';
  });

  const [selectedModuleId, setSelectedModuleId] = useState<number>(progress.currentModuleId || 1);

  const handleNavigate = (view: AppView, moduleId?: number) => {
    if (moduleId !== undefined) {
      setSelectedModuleId(moduleId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#F1EDFF] selection:text-[#5B3FD6]">
      {/* Sticky Navigation Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentView === 'landing' && (
          <LandingView onNavigate={handleNavigate} />
        )}

        {currentView === 'dashboard' && (
          <DashboardView onNavigate={handleNavigate} />
        )}

        {currentView === 'modules' && (
          <ModulesView onNavigate={handleNavigate} />
        )}

        {currentView === 'module-detail' && (
          <LessonDetailView moduleId={selectedModuleId} onNavigate={handleNavigate} />
        )}

        {currentView === 'pre-test' && (
          <QuizView testType="pre" onNavigate={handleNavigate} />
        )}

        {currentView === 'post-test' && (
          <QuizView testType="post" onNavigate={handleNavigate} />
        )}

        {currentView === 'lab' && (
          <InteractiveLabView onNavigate={handleNavigate} />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView onNavigate={handleNavigate} />
        )}

        {currentView === 'settings' && (
          <SettingsView />
        )}
      </main>

      {/* Educational Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <MainApp />
    </LearningProvider>
  );
}

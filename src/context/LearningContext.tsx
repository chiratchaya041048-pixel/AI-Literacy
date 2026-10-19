import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, LearningPersona, QuizResult } from '../types/index.ts';

interface LearningContextType {
  progress: UserProgress;
  setNickname: (name: string) => void;
  setPersona: (persona: LearningPersona) => void;
  completeModule: (moduleId: number) => void;
  setCurrentModuleId: (moduleId: number) => void;
  recordQuizResult: (result: QuizResult) => void;
  completeLab: (labKey: 'promptChallenge' | 'factChecker' | 'ethicsScenario') => void;
  updateSettings: (newSettings: Partial<UserProgress['settings']>) => void;
  resetProgress: () => void;
  progressPercentage: number;
  isPostTestUnlocked: boolean;
  scoreDelta: number | null;
}

const STORAGE_KEY = 'ai_literacy_app_progress_v2';

const DEFAULT_PROGRESS: UserProgress = {
  nickname: 'ผู้เรียนรู้ AI',
  persona: 'beginner',
  completedModules: [],
  currentModuleId: 1,
  preTestScore: null,
  postTestScore: null,
  testHistory: [],
  completedLabs: {
    promptChallenge: false,
    factChecker: false,
    ethicsScenario: false
  },
  settings: {
    fontSize: 'normal',
    animations: true,
    highContrast: false
  }
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          settings: {
            ...DEFAULT_PROGRESS.settings,
            ...(parsed.settings || {})
          },
          completedLabs: {
            ...DEFAULT_PROGRESS.completedLabs,
            ...(parsed.completedLabs || {})
          }
        };
      }
    } catch (e) {
      console.warn('Failed to parse stored AI Literacy progress', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Save to LocalStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save AI Literacy progress to LocalStorage', e);
    }

    // Apply font size class to body
    const body = document.body;
    body.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    if (progress.settings.fontSize === 'large') {
      body.classList.add('font-size-large');
    } else if (progress.settings.fontSize === 'xlarge') {
      body.classList.add('font-size-xlarge');
    } else {
      body.classList.add('font-size-normal');
    }

    // High contrast class
    if (progress.settings.highContrast) {
      body.classList.add('high-contrast-mode');
    } else {
      body.classList.remove('high-contrast-mode');
    }
  }, [progress]);

  const setNickname = (name: string) => {
    const cleanName = name.trim() || 'ผู้เรียนรู้ AI';
    setProgress((prev) => ({ ...prev, nickname: cleanName }));
  };

  const setPersona = (persona: LearningPersona) => {
    setProgress((prev) => ({ ...prev, persona }));
  };

  const completeModule = (moduleId: number) => {
    setProgress((prev) => {
      const exists = prev.completedModules.includes(moduleId);
      const nextCompleted = exists ? prev.completedModules : [...prev.completedModules, moduleId];
      return {
        ...prev,
        completedModules: nextCompleted,
        currentModuleId: moduleId < 6 ? moduleId + 1 : moduleId
      };
    });
  };

  const setCurrentModuleId = (moduleId: number) => {
    setProgress((prev) => ({ ...prev, currentModuleId: moduleId }));
  };

  const recordQuizResult = (result: QuizResult) => {
    setProgress((prev) => {
      const isPre = result.testType === 'pre';
      return {
        ...prev,
        preTestScore: isPre ? result.score : prev.preTestScore,
        postTestScore: !isPre ? result.score : prev.postTestScore,
        testHistory: [result, ...prev.testHistory]
      };
    });
  };

  const completeLab = (labKey: 'promptChallenge' | 'factChecker' | 'ethicsScenario') => {
    setProgress((prev) => ({
      ...prev,
      completedLabs: {
        ...prev.completedLabs,
        [labKey]: true
      }
    }));
  };

  const updateSettings = (newSettings: Partial<UserProgress['settings']>) => {
    setProgress((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Calculate overall learning progress
  // Total components = 6 modules (weight 60%) + 3 labs (weight 20%) + Pre-test (10%) + Post-test (10%)
  const modulePoints = (progress.completedModules.length / 6) * 60;
  const labCount = Object.values(progress.completedLabs).filter(Boolean).length;
  const labPoints = (labCount / 3) * 20;
  const preTestPoints = progress.preTestScore !== null ? 10 : 0;
  const postTestPoints = progress.postTestScore !== null ? 10 : 0;
  const progressPercentage = Math.min(100, Math.round(modulePoints + labPoints + preTestPoints + postTestPoints));

  // Condition to unlock Post-test:
  // Must complete all 6 modules OR at least 4 modules and 1 lab, or if pre-test is done and learner has engaged thoroughly
  const isPostTestUnlocked = progress.completedModules.length >= 6 || (progress.completedModules.length >= 3 && labCount >= 1);

  // Score delta: Post-test - Pre-test
  const scoreDelta =
    progress.postTestScore !== null && progress.preTestScore !== null
      ? progress.postTestScore - progress.preTestScore
      : null;

  return (
    <LearningContext.Provider
      value={{
        progress,
        setNickname,
        setPersona,
        completeModule,
        setCurrentModuleId,
        recordQuizResult,
        completeLab,
        updateSettings,
        resetProgress,
        progressPercentage,
        isPostTestUnlocked,
        scoreDelta
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

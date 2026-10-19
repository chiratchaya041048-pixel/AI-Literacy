export type LearningPersona = 'beginner' | 'student' | 'professional' | 'everyday';

export interface PersonaInfo {
  id: LearningPersona;
  label: string;
  badge: string;
  description: string;
  iconName: string;
  targetAudience: string;
  recommendedFocus: string;
  recommendedModuleId: number;
}

export interface ContentSection {
  id: string;
  title: string;
  body: string[];
  bulletPoints?: string[];
  lifeExample?: {
    title: string;
    description: string;
  };
  keyTakeaway?: string;
  caution?: string;
  infographicBadge?: {
    label: string;
    details: string;
  };
}

export interface CheckpointQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleItem {
  id: number;
  moduleNumber: number;
  title: string;
  titleEn: string;
  durationMinutes: number;
  bdiPillar: 'Foundations' | 'Engage with AI' | 'Create with AI' | 'Manage AI' | 'Design AI';
  iconName: string;
  summary: string;
  objectives: string[];
  sections: ContentSection[];
  checkpoint: CheckpointQuestion;
  keyTakeawaysList: string[];
}

export interface QuizQuestion {
  id: number;
  moduleCategory: number;
  categoryName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bdiDomain: 'Engage' | 'Create' | 'Manage' | 'Design' | 'Foundations';
}

export interface QuizResult {
  id: string;
  testType: 'pre' | 'post';
  score: number; // 0-100
  correctCount: number;
  totalQuestions: number;
  timestamp: string;
  answers: Record<number, number>;
}

export interface LabPromptOption {
  id: string;
  promptText: string;
  rating: 'poor' | 'fair' | 'great';
  score: number;
  feedback: string;
  breakdown: {
    hasGoal: boolean;
    hasPersona: boolean;
    hasContext: boolean;
    hasOutputFormat: boolean;
  };
}

export interface LabPromptCase {
  id: string;
  title: string;
  scenario: string;
  userGoal: string;
  targetAudience: string;
  options: LabPromptOption[];
  proTip: string;
}

export interface LabFactCheckCase {
  id: string;
  title: string;
  promptSent: string;
  aiResponse: string;
  criticalAnalysis: {
    highlightText: string;
    issueType: 'hallucination' | 'factual_error' | 'accurate';
    explanation: string;
  }[];
  challengeQuestion: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  verificationTip: string;
}

export interface LabEthicsCase {
  id: string;
  title: string;
  category: 'Privacy' | 'Copyright' | 'Bias' | 'Accountability';
  scenarioText: string;
  stakeholders: string[];
  options: {
    id: string;
    actionText: string;
    isBestPractice: boolean;
    consequences: string;
    ethicalRule: string;
  }[];
  bdiPrinciple: string;
}

export interface UserProgress {
  nickname: string;
  persona: LearningPersona;
  completedModules: number[];
  currentModuleId: number;
  preTestScore: number | null;
  postTestScore: number | null;
  testHistory: QuizResult[];
  completedLabs: {
    promptChallenge: boolean;
    factChecker: boolean;
    ethicsScenario: boolean;
  };
  settings: {
    fontSize: 'normal' | 'large' | 'xlarge';
    animations: boolean;
    highContrast: boolean;
  };
}

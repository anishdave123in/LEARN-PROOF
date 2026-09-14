export type Role = 'student' | 'teacher';

export type ProbeType = 'socratic' | 'counterfactual' | 'transfer';

export type ConceptStatus = 'mastered' | 'superficial' | 'misconception' | 'pending';

export interface ConceptNode {
  id: string;
  name: string;
  category: string;
  status: ConceptStatus;
  score: number; // 0-100
  x: number;
  y: number;
  description: string;
  evidenceQuote?: string;
  misconceptionDetails?: {
    title: string;
    explanation: string;
    detectedAtTurn: number;
  };
}

export interface ConceptEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface DefenseTurn {
  id: string;
  turnNumber: number;
  probeType: ProbeType;
  question: string;
  contextHint?: string;
  studentAnswer?: string;
  evaluation?: {
    score: number; // 0-100
    conceptualQuality: 'High' | 'Superficial' | 'Flawed' | 'Corrected';
    detectedMisconception?: string;
    feedback: string;
    scoreDelta: number;
  };
  isComplete: boolean;
}

export interface DemoSubmission {
  id: string;
  title: string;
  course: string;
  studentName: string;
  artifactFileName: string;
  artifactCodeSnippet: string;
  initialArtifactScore: number; // 95%
  demonstratedScore: number; // dynamically drops to 54%, then recovers to 88%
  concepts: ConceptNode[];
  edges: ConceptEdge[];
  turns: DefenseTurn[];
  remediation?: {
    conceptId: string;
    title: string;
    summary: string;
    codeBefore: string;
    codeAfter: string;
    keyTakeaway: string;
  };
  transferChallenge?: {
    id: string;
    scenario: string;
    question: string;
    expectedInsight: string;
    studentAnswer?: string;
    isPassed?: boolean;
  };
}

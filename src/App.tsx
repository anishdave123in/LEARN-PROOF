import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ArtifactUpload } from './components/ArtifactUpload';
import { SocraticDefenseModal } from './components/SocraticDefenseModal';
import { MasteryGraph } from './components/MasteryGraph';
import { MicroRemediationCard } from './components/MicroRemediationCard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PitchModeGuide } from './components/PitchModeGuide';
import { INITIAL_DEMO_SUBMISSION, PRESET_STUDENT_RESPONSES } from './services/mockAiEngine';
import { DemoSubmission, Role } from './types';
import { Layers, ShieldCheck, MessageSquare, BookOpen, BarChart2, Zap } from 'lucide-react';

export function App() {
  const [role, setRole] = useState<Role>('student');
  const [submission, setSubmission] = useState<DemoSubmission>(INITIAL_DEMO_SUBMISSION);
  const [activeTab, setActiveTab] = useState<'upload' | 'defense' | 'graph' | 'remediation'>('upload');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [pitchStep, setPitchStep] = useState(1);

  // Trigger pitch step manually
  const handlePitchStep = (step: number) => {
    setPitchStep(step);

    if (step === 1) {
      // Step 1: Upload tab
      setSubmission(INITIAL_DEMO_SUBMISSION);
      setActiveTab('upload');
    } else if (step === 2) {
      // Step 2: Open Socratic Defense
      setActiveTab('defense');
    } else if (step === 3) {
      // Step 3: Trigger counterfactual probe & graph drop to 54%
      setActiveTab('defense');
      handleTurnSubmit(PRESET_STUDENT_RESPONSES.turn1_superficial);
      setTimeout(() => {
        handleTurnSubmit(PRESET_STUDENT_RESPONSES.turn2_flawed);
        setActiveTab('graph');
      }, 1500);
    } else if (step === 4) {
      // Step 4: Complete transfer challenge -> Emerald 88%
      handleCompleteTransfer(true);
      setActiveTab('graph');
    }
  };

  const handleResetDemo = () => {
    setSubmission(INITIAL_DEMO_SUBMISSION);
    setActiveTab('upload');
    setPitchStep(1);
  };

  // Handle student answering Socratic defense question
  const handleTurnSubmit = (answerText: string) => {
    setIsEvaluating(true);

    setTimeout(() => {
      setSubmission((prev) => {
        const currentTurnIndex = prev.turns.length - 1;
        const currentTurn = prev.turns[currentTurnIndex];

        // Evaluate Turn 1 vs Turn 2
        if (currentTurnIndex === 0) {
          // Turn 1: Student gave superficial textbook answer -> Trigger Counterfactual Probe
          const updatedTurn1 = {
            ...currentTurn,
            studentAnswer: answerText,
            isComplete: true,
            evaluation: {
              score: 65,
              conceptualQuality: 'Superficial' as const,
              feedback: 'Student states what line 13 does mechanically, but fails to explain the statistical consequences of pre-split fit_transform().',
              scoreDelta: -10
            }
          };

          const turn2 = {
            id: 'turn-2',
            turnNumber: 2,
            probeType: 'counterfactual' as const,
            question: 'Counterfactual Probe: If fit_transform() is invoked on the entire dataset first, how does the global mean (μ) and standard deviation (σ) of your test set leak into your training feature matrix?',
            contextHint: 'Think about statistical parameter independence between train and test distributions.',
            isComplete: false
          };

          return {
            ...prev,
            turns: [updatedTurn1, turn2]
          };
        } else {
          // Turn 2: Student failed counterfactual probe -> Drop score to 54% and highlight Misconception on Graph!
          const updatedTurn2 = {
            ...currentTurn,
            studentAnswer: answerText,
            isComplete: true,
            evaluation: {
              score: 35,
              conceptualQuality: 'Flawed' as const,
              detectedMisconception: 'Data Leakage via Pre-Split Feature Scaling',
              feedback: 'CRITICAL REASONING GAP: Student wrongly claims scaling does not leak information. Pre-split scaling incorporates test set values into feature standardization math.',
              scoreDelta: -31
            }
          };

          // Update concepts: mark data leakage node as RED misconception
          const updatedConcepts = prev.concepts.map((c) => {
            if (c.id === 'c-data-leakage') {
              return {
                ...c,
                status: 'misconception' as const,
                score: 42,
                evidenceQuote: answerText
              };
            }
            return c;
          });

          return {
            ...prev,
            demonstratedScore: 54, // The WOW Drop!
            concepts: updatedConcepts,
            turns: [prev.turns[0], updatedTurn2]
          };
        }
      });

      setIsEvaluating(false);
    }, 1000);
  };

  // Handle transfer challenge completion
  const handleCompleteTransfer = (isPassed: boolean) => {
    if (isPassed) {
      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmission((prev) => {
        const updatedConcepts = prev.concepts.map((c) => {
          if (c.id === 'c-data-leakage') {
            return {
              ...c,
              status: 'mastered' as const,
              score: 88,
              description: 'Mastered via Time-Series Stock Transfer Probe!'
            };
          }
          return c;
        });

        return {
          ...prev,
          demonstratedScore: 88, // Emerald Recovery!
          concepts: updatedConcepts,
          transferChallenge: {
            ...prev.transferChallenge!,
            isPassed: true
          }
        };
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-obsidian-900 text-slate-100">
      {/* Header Bar */}
      <Header
        role={role}
        setRole={setRole}
        onResetDemo={handleResetDemo}
        onRunPitchPreset={() => handlePitchStep(3)}
        evidenceScore={submission.demonstratedScore}
        initialScore={submission.initialArtifactScore}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Pitch Mode Controller Bar */}
        <PitchModeGuide onRunStep={handlePitchStep} currentStep={pitchStep} />

        {role === 'student' ? (
          <>
            {/* Student View Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  activeTab === 'upload'
                    ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>1. Artifact & AST Code</span>
              </button>

              <button
                onClick={() => setActiveTab('defense')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 relative ${
                  activeTab === 'defense'
                    ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>2. Socratic AI Defense</span>
                {submission.turns.length > 1 && (
                  <span className="w-2 h-2 rounded-full bg-coral-bad animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  activeTab === 'graph'
                    ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>3. Mastery Evidence Graph</span>
                {submission.demonstratedScore < 70 && (
                  <span className="text-[10px] font-mono font-bold bg-coral-bad text-white px-1.5 py-0.2 rounded-full">
                    54%
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('remediation')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  activeTab === 'remediation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>4. Micro-Remediation & Retest</span>
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'upload' && (
              <ArtifactUpload
                submission={submission}
                onStartDefense={() => setActiveTab('defense')}
              />
            )}

            {activeTab === 'defense' && (
              <SocraticDefenseModal
                submission={submission}
                onTurnSubmit={handleTurnSubmit}
                onClose={() => setActiveTab('graph')}
                isEvaluating={isEvaluating}
              />
            )}

            {activeTab === 'graph' && (
              <MasteryGraph submission={submission} />
            )}

            {activeTab === 'remediation' && (
              <MicroRemediationCard
                submission={submission}
                onCompleteTransfer={handleCompleteTransfer}
              />
            )}
          </>
        ) : (
          /* Professor Audit View */
          <TeacherDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500 font-mono">
        LearnProof © 2026 • Cognitive Verification & Mastery Engine • Built for Horizon Hoollow Hackathon
      </footer>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Send, HelpCircle, AlertCircle, Sparkles, CheckCircle2, ArrowRight, ShieldAlert, FastForward, Volume2 } from 'lucide-react';
import { DemoSubmission, DefenseTurn } from '../types';
import { PRESET_STUDENT_RESPONSES } from '../services/mockAiEngine';

interface SocraticDefenseModalProps {
  submission: DemoSubmission;
  onTurnSubmit: (answerText: string) => void;
  onClose: () => void;
  isEvaluating: boolean;
}

export const SocraticDefenseModal: React.FC<SocraticDefenseModalProps> = ({
  submission,
  onTurnSubmit,
  onClose,
  isEvaluating
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeTurn = submission.turns[submission.turns.length - 1];

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [submission.turns, isEvaluating]);

  const handleSubmit = (text: string) => {
    if (!text.trim() || isEvaluating) return;
    onTurnSubmit(text.trim());
    setInputText('');
  };

  const handleUsePreset = (presetText: string) => {
    setInputText(presetText);
  };

  const toggleMic = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice input transcription
      setTimeout(() => {
        if (submission.turns.length === 1) {
          setInputText(PRESET_STUDENT_RESPONSES.turn1_superficial);
        } else {
          setInputText(PRESET_STUDENT_RESPONSES.turn2_flawed);
        }
        setIsRecording(false);
      }, 1800);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6 flex flex-col h-[650px] shadow-2xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">
                Socratic Defense & Counterfactual Probe
              </h3>
              <span className="text-[10px] font-mono uppercase bg-cyan-accent/10 text-cyan-accent px-2 py-0.5 rounded border border-cyan-accent/20">
                Turn {submission.turns.length} / 2
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI Defense is testing your conceptual depth regarding code lines 13–19.
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {isEvaluating ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/40 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> Evaluating Reasoning...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Defense Active
            </span>
          )}
        </div>
      </div>

      {/* Chat Conversation Body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {submission.turns.map((turn, index) => (
          <div key={turn.id} className="space-y-4">
            {/* AI Probe Question */}
            <div className="flex items-start gap-3 max-w-[88%]">
              <div className="w-8 h-8 rounded-lg bg-navy-800 border border-cyan-accent/40 flex items-center justify-center text-cyan-glow shrink-0 mt-0.5">
                <BrainIcon className="w-4 h-4" />
              </div>
              <div className="glass-panel-glow rounded-2xl rounded-tl-sm p-4 space-y-2 text-xs text-slate-200">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-accent border-b border-cyan-accent/20 pb-1">
                  <span className="uppercase font-semibold tracking-wider flex items-center gap-1">
                    {turn.probeType === 'counterfactual' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-coral-bad" />
                    ) : (
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-accent" />
                    )}
                    {turn.probeType} Probe Probe #{turn.turnNumber}
                  </span>
                  <span>System Assessment</span>
                </div>
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  {turn.question}
                </p>
                {turn.contextHint && (
                  <div className="text-[11px] font-mono text-slate-400 bg-obsidian-900/60 p-2 rounded border border-slate-800">
                    💡 Context: {turn.contextHint}
                  </div>
                )}
              </div>
            </div>

            {/* Student Answer if submitted */}
            {turn.studentAnswer && (
              <div className="flex items-start justify-end gap-3 ml-auto max-w-[88%]">
                <div className="bg-gradient-to-r from-navy-800 to-navy-700 border border-slate-700 rounded-2xl rounded-tr-sm p-4 space-y-2 text-xs text-slate-100 shadow-md">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-700 pb-1">
                    <span>Student Response ({submission.studentName})</span>
                    <span>Verified Oral / Text</span>
                  </div>
                  <p className="text-sm font-sans leading-relaxed">
                    "{turn.studentAnswer}"
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <UserAvatar className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Evaluation Callout Box if turn is evaluated */}
            {turn.evaluation && (
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                turn.evaluation.detectedMisconception
                  ? 'glass-panel-danger border-coral-bad/40 text-coral-bad'
                  : 'glass-panel-success border-emerald-500/40 text-emerald-400'
              }`}>
                <div className="flex items-center justify-between font-mono font-bold uppercase text-[11px]">
                  <span className="flex items-center gap-1.5">
                    {turn.evaluation.detectedMisconception ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Evaluation: {turn.evaluation.conceptualQuality} Reasoning
                  </span>
                  <span className="px-2 py-0.5 rounded bg-obsidian-900 font-mono">
                    Score Delta: {turn.evaluation.scoreDelta}%
                  </span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed font-sans">
                  {turn.evaluation.feedback}
                </p>
                {turn.evaluation.detectedMisconception && (
                  <div className="mt-2 text-[11px] font-mono bg-coral-bad/10 p-2 rounded border border-coral-bad/30 text-coral-bad">
                    ⚠ Detected Misconception: <strong>{turn.evaluation.detectedMisconception}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Judge Demo Presets Toolbar */}
      {!activeTurn.isComplete && (
        <div className="bg-obsidian-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <FastForward className="w-3.5 h-3.5 text-cyan-accent" /> Demo Quick-Select Answers:
            </span>
            <span>Click to populate response</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {submission.turns.length === 1 ? (
              <button
                onClick={() => handleUsePreset(PRESET_STUDENT_RESPONSES.turn1_superficial)}
                className="text-left text-xs bg-navy-800 hover:bg-navy-700 text-slate-300 p-2 rounded-lg border border-slate-700 transition-all font-mono line-clamp-1 hover:text-white"
              >
                1. "I normalized the dataset first using StandardScaler on line 13..."
              </button>
            ) : (
              <button
                onClick={() => handleUsePreset(PRESET_STUDENT_RESPONSES.turn2_flawed)}
                className="text-left text-xs bg-coral-bad/10 hover:bg-coral-bad/20 text-coral-bad p-2 rounded-lg border border-coral-bad/30 transition-all font-mono line-clamp-1"
              >
                2. "It doesn't leak anything because StandardScaler only scales numbers..."
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input Box Controls */}
      {!activeTurn.isComplete && (
        <div className="flex items-center gap-3 pt-2">
          {/* Simulated Speech Mic */}
          <button
            onClick={toggleMic}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
              isRecording
                ? 'bg-coral-bad text-white border-coral-bad animate-pulse'
                : 'bg-navy-800 text-slate-300 border-slate-700 hover:text-cyan-accent hover:border-cyan-accent'
            }`}
            title="Simulate Voice-to-Text Oral Viva"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(inputText)}
            placeholder={
              isRecording
                ? 'Listening to student spoken answer...'
                : 'Type your conceptual explanation or choose a demo preset above...'
            }
            className="flex-1 bg-obsidian-900 border border-slate-800 focus:border-cyan-accent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
          />

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit(inputText)}
            disabled={!inputText.trim() || isEvaluating}
            className="px-5 py-3 rounded-xl bg-cyan-accent hover:bg-cyan-glow text-obsidian-900 font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-cyan-accent/20 active:scale-95 disabled:opacity-40"
          >
            <span>Submit</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 5.562 5.562A4 4 0 0 0 12 20a4 4 0 0 0 3.961-3.543 4 4 0 0 0 5.562-5.562 4 4 0 0 0-2.526-5.77A3 3 0 0 0 12 5z" />
    </svg>
  );
}

function UserAvatar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

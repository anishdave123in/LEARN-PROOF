import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ArrowRight, Zap, Code, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { DemoSubmission } from '../types';
import { PRESET_STUDENT_RESPONSES } from '../services/mockAiEngine';

interface MicroRemediationCardProps {
  submission: DemoSubmission;
  onCompleteTransfer: (isPassed: boolean) => void;
}

export const MicroRemediationCard: React.FC<MicroRemediationCardProps> = ({
  submission,
  onCompleteTransfer
}) => {
  const [transferInput, setTransferInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  const remediation = submission.remediation;
  const challenge = submission.transferChallenge;

  if (!remediation || !challenge) return null;

  const handleUsePreset = () => {
    setTransferInput(PRESET_STUDENT_RESPONSES.transfer_correct);
  };

  const handlePassTransfer = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasPassed(true);
      onCompleteTransfer(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 1. Micro-Intervention Explanation Card */}
      <div className="glass-panel-glow rounded-2xl border border-slate-700 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-accent" />
            <h3 className="text-base font-bold text-white">
              Targeted Micro-Intervention: {remediation.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase bg-cyan-accent/10 text-cyan-accent px-2.5 py-1 rounded border border-cyan-accent/30 font-semibold">
            Smallest Remediation Required
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-sans">
          {remediation.summary}
        </p>

        {/* Code Before / After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-coral-bad/10 border border-coral-bad/30 rounded-xl p-3.5 space-y-2">
            <div className="text-coral-bad font-bold text-[11px] uppercase flex items-center gap-1">
              <span>❌ Flawed Implementation (Your Code)</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto text-[11px]">
              {remediation.codeBefore}
            </pre>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 space-y-2">
            <div className="text-emerald-400 font-bold text-[11px] uppercase flex items-center gap-1">
              <span>✓ Correct Validation Boundary</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto text-[11px]">
              {remediation.codeAfter}
            </pre>
          </div>
        </div>

        <div className="bg-obsidian-900/90 p-3.5 rounded-xl border border-slate-800 text-xs text-cyan-glow flex items-start gap-2">
          <Zap className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
          <span><strong>Key Takeaway:</strong> {remediation.keyTakeaway}</span>
        </div>
      </div>

      {/* 2. Transfer Scenario Challenge Box */}
      <div className={`rounded-2xl p-6 border transition-all space-y-4 ${
        hasPassed
          ? 'glass-panel-success border-emerald-500/50'
          : 'glass-panel border-slate-800'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-bright" />
            <h3 className="text-base font-bold text-white">
              Transfer Challenge: {challenge.scenario}
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
            {hasPassed ? 'Passed ✓' : 'Conceptual Retest'}
          </span>
        </div>

        <p className="text-sm font-medium text-slate-100 leading-relaxed">
          "{challenge.question}"
        </p>

        {!hasPassed ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={transferInput}
                onChange={(e) => setTransferInput(e.target.value)}
                placeholder="Explain why pre-split scaling breaks time-series chronological validation..."
                className="flex-1 bg-obsidian-900 border border-slate-800 focus:border-emerald-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handlePassTransfer}
                disabled={!transferInput.trim() || isSubmitting}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-bright text-obsidian-900 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Evaluating Transfer...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Transfer Proof</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Fill Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUsePreset}
                className="text-[11px] font-mono text-slate-400 hover:text-cyan-accent underline"
              >
                ⚡ Use correct preset response for fast judging demo
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-400 space-y-2">
            <div className="font-bold flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-bright" />
              Transfer Challenge Passed! Demonstrated Understanding Restored to 88%.
            </div>
            <p className="text-slate-200">
              The student successfully reasoned that future price distributions leak into past trading windows, proving true structural comprehension of statistical validation boundaries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, Play, Award, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface PitchModeGuideProps {
  onRunStep: (step: number) => void;
  currentStep: number;
}

export const PitchModeGuide: React.FC<PitchModeGuideProps> = ({
  onRunStep,
  currentStep
}) => {
  return (
    <div className="glass-panel-glow rounded-2xl border border-cyan-accent/40 p-4 space-y-3 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-accent/20 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-accent/20 flex items-center justify-center text-cyan-accent">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Judge Pitch Mode — 60-Second WOW Flow Controller
            </h4>
            <p className="text-[11px] text-slate-300">
              Click through the 4 steps below to trigger the live Socratic defense, counterfactual probe, and graph shift.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-cyan-accent/10 text-cyan-accent px-2.5 py-1 rounded border border-cyan-accent/30 font-semibold self-start sm:self-auto">
          Active Pitch Step: {currentStep} / 4
        </span>
      </div>

      {/* 4 Pitch Flow Step Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
        <button
          onClick={() => onRunStep(1)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            currentStep === 1
              ? 'bg-cyan-accent/20 border-cyan-accent text-white font-bold'
              : 'bg-navy-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-cyan-accent uppercase font-bold">Step 1</div>
          <div className="truncate">Upload Artifact (95%)</div>
        </button>

        <button
          onClick={() => onRunStep(2)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            currentStep === 2
              ? 'bg-cyan-accent/20 border-cyan-accent text-white font-bold'
              : 'bg-navy-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-cyan-accent uppercase font-bold">Step 2</div>
          <div className="truncate">Socratic Probe (Lines 13-19)</div>
        </button>

        <button
          onClick={() => onRunStep(3)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            currentStep === 3
              ? 'bg-coral-bad/20 border-coral-bad text-coral-bad font-bold'
              : 'bg-navy-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-coral-bad uppercase font-bold">Step 3 (WOW)</div>
          <div className="truncate">Counterfactual Probe → Graph 54%</div>
        </button>

        <button
          onClick={() => onRunStep(4)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            currentStep === 4
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
              : 'bg-navy-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-emerald-400 uppercase font-bold">Step 4</div>
          <div className="truncate">Transfer Retest → Emerald 88%</div>
        </button>
      </div>
    </div>
  );
};

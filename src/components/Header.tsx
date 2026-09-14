import React from 'react';
import { ShieldCheck, Brain, UserCheck, Play, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
  onResetDemo: () => void;
  onRunPitchPreset: () => void;
  evidenceScore: number;
  initialScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  setRole,
  onResetDemo,
  onRunPitchPreset,
  evidenceScore,
  initialScore
}) => {
  // Score color helper
  const getScoreBadgeColor = () => {
    if (evidenceScore >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    if (evidenceScore >= 70) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
    return 'bg-coral-bad/20 text-coral-bad border-coral-bad/40';
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-accent to-emerald-bright p-0.5 shadow-lg shadow-cyan-accent/20">
          <div className="w-full h-full bg-obsidian-900 rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-cyan-accent" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              LearnProof
            </h1>
            <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/30">
              Cognitive Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Don't just submit the answer. Prove you learned it.
          </p>
        </div>
      </div>

      {/* Center Evidence Score Meter */}
      <div className="flex items-center gap-4 bg-obsidian-800/80 px-4 py-2 rounded-xl border border-slate-800">
        <div className="text-right">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Artifact vs Demonstrated
          </div>
          <div className="flex items-center justify-end gap-2 text-xs font-semibold">
            <span className="text-slate-400 line-through">Code: {initialScore}%</span>
            <span className="text-slate-500">→</span>
            <span className={`px-2 py-0.5 rounded border text-xs font-mono font-bold transition-all duration-500 ${getScoreBadgeColor()}`}>
              Proof: {evidenceScore}%
            </span>
          </div>
        </div>

        <div className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center border border-slate-700">
          <Brain className="w-5 h-5 text-cyan-glow animate-pulse" />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Quick Pitch Run Preset Button */}
        <button
          onClick={onRunPitchPreset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-accent to-emerald-500 hover:from-cyan-glow hover:to-emerald-bright text-obsidian-900 font-semibold text-xs transition-all shadow-md shadow-cyan-accent/20 active:scale-95"
          title="Automate the 60-second WOW demo flow"
        >
          <Play className="w-3.5 h-3.5 fill-obsidian-900" />
          <span>Pitch Auto-Demo</span>
        </button>

        {/* Reset Demo State */}
        <button
          onClick={onResetDemo}
          className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
          title="Reset Demo State"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Role Toggle Switch */}
        <div className="flex items-center p-1 bg-obsidian-800 rounded-lg border border-slate-800">
          <button
            onClick={() => setRole('student')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              role === 'student'
                ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            onClick={() => setRole('teacher')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              role === 'teacher'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Professor</span>
          </button>
        </div>
      </div>
    </header>
  );
};

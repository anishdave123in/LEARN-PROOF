import React, { useState } from 'react';
import { Upload, FileCode, CheckCircle2, Cpu, AlertTriangle, Code, ArrowRight, Zap } from 'lucide-react';
import { DemoSubmission } from '../types';

interface ArtifactUploadProps {
  submission: DemoSubmission;
  onStartDefense: () => void;
}

export const ArtifactUpload: React.FC<ArtifactUploadProps> = ({
  submission,
  onStartDefense
}) => {
  const [isParsing, setIsParsing] = useState(false);

  const handleSimulatedParsing = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      onStartDefense();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Upload & AST Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: File Card & Metadata */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-cyan-accent uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-accent/10 border border-cyan-accent/20">
                {submission.course}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Artifact ID: {submission.id}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {submission.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submitted by <span className="text-slate-200 font-semibold">{submission.studentName}</span>. Artifact code compiles successfully with high raw performance metrics (95.8% Accuracy).
            </p>

            {/* Upload Box Dropzone Simulation */}
            <div className="border-2 border-dashed border-cyan-accent/40 rounded-xl p-6 bg-navy-900/60 flex flex-col items-center justify-center text-center space-y-3 hover:border-cyan-accent transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 flex items-center justify-center text-cyan-accent group-hover:scale-110 transition-transform">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {submission.artifactFileName}
                </div>
                <div className="text-xs text-slate-400">
                  Python 3.11 Script • 1.4 KB • AST Parsed
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Code Runs Cleanly (95% Accuracy)
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleSimulatedParsing}
              disabled={isParsing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-accent to-emerald-500 hover:from-cyan-glow hover:to-emerald-bright text-obsidian-900 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-accent/20 active:scale-[0.99] disabled:opacity-50"
            >
              {isParsing ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Extracting Reasoning Nodes...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Launch Socratic Defense</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Key Insight Callout */}
          <div className="glass-panel-danger rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-coral-bad shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-coral-bad uppercase tracking-wider">
                Reasoning Check Alert
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Raw accuracy metrics can be deceiving. LearnProof will now question the student about their exact scaling sequence to verify structural understanding versus memorized copy-paste patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Code Viewer & AST Extracted Nodes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-accent" />
                <h3 className="text-sm font-semibold text-white font-mono">
                  {submission.artifactFileName}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Syntax Verified • AST Tree Active
              </span>
            </div>

            {/* Code Block Window */}
            <div className="bg-obsidian-900 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[340px]">
              <pre>
                {submission.artifactCodeSnippet.split('\n').map((line, idx) => {
                  const lineNum = idx + 1;
                  const isCriticalLine = lineNum === 13 || lineNum === 17;
                  return (
                    <div
                      key={idx}
                      className={`flex gap-4 px-2 py-0.5 rounded transition-colors ${
                        isCriticalLine ? 'bg-coral-bad/15 text-coral-bad border-l-2 border-coral-bad' : 'hover:bg-navy-800/60'
                      }`}
                    >
                      <span className="text-slate-600 select-none w-6 text-right font-mono">
                        {lineNum}
                      </span>
                      <span>{line}</span>
                    </div>
                  );
                })}
              </pre>
            </div>

            {/* Extracted Concept Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                AST Discovered Conceptual Dependencies ({submission.concepts.length} Nodes)
              </h4>
              <div className="flex flex-wrap gap-2">
                {submission.concepts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700/80 text-xs font-medium text-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-obsidian-900 px-1.5 py-0.5 rounded">
                      {c.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

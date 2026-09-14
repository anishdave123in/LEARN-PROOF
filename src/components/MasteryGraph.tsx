import React, { useState } from 'react';
import { GitCommit, AlertCircle, CheckCircle2, HelpCircle, Layers, RefreshCw, Award, ArrowUpRight } from 'lucide-react';
import { ConceptNode, ConceptEdge, DemoSubmission } from '../types';

interface MasteryGraphProps {
  submission: DemoSubmission;
  onSelectConcept?: (concept: ConceptNode) => void;
}

export const MasteryGraph: React.FC<MasteryGraphProps> = ({
  submission,
  onSelectConcept
}) => {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(submission.concepts[2]); // Default to data leakage node

  const getNodeColorClass = (status: string, score: number) => {
    if (status === 'misconception' || score < 60) {
      return 'bg-coral-bad/20 border-coral-bad text-coral-bad shadow-lg shadow-coral-bad/20 node-pulse-red';
    }
    if (status === 'mastered' || score >= 80) {
      return 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20 node-pulse-green';
    }
    return 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/20';
  };

  const getStatusBadge = (status: string, score: number) => {
    if (status === 'misconception' || score < 60) {
      return (
        <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-coral-bad bg-coral-bad/10 px-2 py-0.5 rounded border border-coral-bad/30">
          <AlertCircle className="w-3 h-3" /> Misconception
        </span>
      );
    }
    if (status === 'mastered' || score >= 80) {
      return (
        <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" /> Mastered
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30">
        <HelpCircle className="w-3 h-3" /> Superficial
      </span>
    );
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-accent" /> Dynamic Mastery Evidence Graph
            </h3>
            <span className="text-[10px] font-mono uppercase bg-navy-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Live State Tracing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Nodes shift state in real-time as the Socratic Defense evaluates student responses.
          </p>
        </div>

        {/* Global Evidence Metric Card */}
        <div className="flex items-center gap-3 bg-obsidian-900 px-4 py-2 rounded-xl border border-slate-800">
          <Award className="w-5 h-5 text-cyan-glow" />
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">
              Demonstrated Learning Score
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {submission.demonstratedScore}%{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">
                (Code Artifact: {submission.initialArtifactScore}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Node Graph Canvas */}
        <div className="lg:col-span-8 bg-obsidian-900/90 rounded-2xl border border-slate-800/80 p-4 min-h-[380px] relative overflow-hidden flex items-center justify-center">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          <svg className="w-full h-full min-h-[360px] relative z-10">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>

            {/* Render Connecting Edges */}
            {submission.edges.map((edge) => {
              const sourceNode = submission.concepts.find((c) => c.id === edge.source);
              const targetNode = submission.concepts.find((c) => c.id === edge.target);

              if (!sourceNode || !targetNode) return null;

              return (
                <g key={edge.id}>
                  <line
                    x1={sourceNode.x + 80}
                    y1={sourceNode.y + 30}
                    x2={targetNode.x + 80}
                    y2={targetNode.y + 30}
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    markerEnd="url(#arrowhead)"
                  />
                  {edge.label && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2 + 60}
                      y={(sourceNode.y + targetNode.y) / 2 + 25}
                      fill="#64748B"
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Render Nodes */}
            {submission.concepts.map((concept) => {
              const isSelected = selectedNode?.id === concept.id;
              const isDanger = concept.status === 'misconception' || concept.score < 60;
              const isSuccess = concept.status === 'mastered' || concept.score >= 80;

              return (
                <g
                  key={concept.id}
                  transform={`translate(${concept.x}, ${concept.y})`}
                  onClick={() => {
                    setSelectedNode(concept);
                    if (onSelectConcept) onSelectConcept(concept);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Node Outer Container */}
                  <rect
                    width="170"
                    height="65"
                    rx="12"
                    className={`transition-all duration-500 stroke-2 ${
                      isDanger
                        ? 'fill-navy-900 stroke-coral-bad shadow-coral-bad/40'
                        : isSuccess
                        ? 'fill-navy-900 stroke-emerald-500 shadow-emerald-500/40'
                        : 'fill-navy-900 stroke-yellow-500 shadow-yellow-500/40'
                    } ${isSelected ? 'stroke-cyan-glow stroke-[3px]' : ''}`}
                  />

                  {/* Category Pill */}
                  <text
                    x="12"
                    y="20"
                    fill="#94A3B8"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    {concept.category.toUpperCase()}
                  </text>

                  {/* Concept Name */}
                  <text
                    x="12"
                    y="38"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontFamily="Inter"
                    fontWeight="bold"
                  >
                    {concept.name.length > 20 ? concept.name.substring(0, 18) + '...' : concept.name}
                  </text>

                  {/* Score Indicator */}
                  <text
                    x="12"
                    y="54"
                    fill={isDanger ? '#F43F5E' : isSuccess ? '#34D399' : '#FBBF24'}
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    Score: {concept.score}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Detail Inspector Sidebar */}
        <div className="lg:col-span-4">
          {selectedNode ? (
            <div className="glass-panel-glow rounded-xl p-5 space-y-4 border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-wider">
                  Node Inspector
                </span>
                {getStatusBadge(selectedNode.status, selectedNode.score)}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  {selectedNode.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Score Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Concept Mastery</span>
                  <span className="font-bold text-white">{selectedNode.score}%</span>
                </div>
                <div className="w-full h-2 bg-obsidian-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-700 ${
                      selectedNode.score < 60
                        ? 'bg-coral-bad'
                        : selectedNode.score >= 80
                        ? 'bg-emerald-bright'
                        : 'bg-yellow-400'
                    }`}
                    style={{ width: `${selectedNode.score}%` }}
                  />
                </div>
              </div>

              {/* Detected Misconception Alert if applicable */}
              {(selectedNode.status === 'misconception' || selectedNode.score < 60) && (
                <div className="bg-coral-bad/10 border border-coral-bad/30 p-3 rounded-lg text-xs text-coral-bad space-y-1">
                  <div className="font-mono font-bold uppercase text-[10px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Isolated Misconception
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    Student assumes StandardScaler pre-split scaling does not distort statistical test set boundaries.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel rounded-xl p-6 text-center text-xs text-slate-400 border border-slate-800">
              Click any graph node to inspect conceptual evidence metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

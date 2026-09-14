import React from 'react';
import { Users, AlertTriangle, TrendingUp, CheckCircle, BarChart3, ArrowUpRight, GraduationCap, ShieldAlert } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>TOTAL STUDENTS AUDITED</span>
            <Users className="w-4 h-4 text-cyan-accent" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">48</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> +12 this week
          </div>
        </div>

        <div className="glass-panel-danger rounded-2xl p-5 border border-coral-bad/40 space-y-2">
          <div className="flex items-center justify-between text-coral-bad text-xs font-mono">
            <span>ISOLATED MISCONCEPTIONS</span>
            <AlertTriangle className="w-4 h-4 text-coral-bad" />
          </div>
          <div className="text-2xl font-mono font-bold text-coral-bad">34%</div>
          <div className="text-[11px] text-coral-bad font-mono">
            Top Gap: Pre-Split Scaling Leakage
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>AVG CODE ACCURACY</span>
            <BarChart3 className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-yellow-400">92.4%</div>
          <div className="text-[11px] text-slate-400 font-mono">
            Artifact submission score
          </div>
        </div>

        <div className="glass-panel-success rounded-2xl p-5 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-mono">
            <span>RECOVERED POST-TRANSFER</span>
            <CheckCircle className="w-4 h-4 text-emerald-bright" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-bright">89.2%</div>
          <div className="text-[11px] text-emerald-400 font-mono">
            After micro-remediation
          </div>
        </div>
      </div>

      {/* Main Heatmap & Misconception Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Class Misconception Frequency Audit */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-coral-bad" /> Class-Wide Misconception Heatmap
            </h3>
            <span className="text-[10px] font-mono text-slate-400">CS 401 Section A</span>
          </div>

          <div className="space-y-3">
            <div className="bg-obsidian-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white font-bold">1. Data Leakage via Feature Scaling</span>
                <span className="text-coral-bad font-bold">38% of class</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-coral-bad w-[38%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                Students invoke scaler.fit_transform() before train_test_split(), causing optimistic metric distortion.
              </p>
            </div>

            <div className="bg-obsidian-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white font-bold">2. Conflating Precision vs Recall in Imbalanced Datasets</span>
                <span className="text-yellow-400 font-bold">24% of class</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 w-[24%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                Students default to raw accuracy on churn datasets with 90/10 class imbalance.
              </p>
            </div>

            <div className="bg-obsidian-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white font-bold">3. Overfitting via Unlimited Tree Depth</span>
                <span className="text-emerald-400 font-bold">12% of class</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[12%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                Students leave max_depth=None on deep Random Forests without pruning.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Confidence vs Demonstrated Audit Table */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-accent" /> Student Evidence Audit
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Recent Vivas</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              { name: 'Alex Chen', codeScore: 95, proofScore: 54, status: 'Needs Transfer', gap: 'Data Leakage' },
              { name: 'Maya Patel', codeScore: 98, proofScore: 92, status: 'Verified Mastered', gap: 'None' },
              { name: 'Jordan Smith', codeScore: 88, proofScore: 62, status: 'Superficial', gap: 'Metric Selection' },
              { name: 'David Kim', codeScore: 91, proofScore: 88, status: 'Verified Mastered', gap: 'None' },
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">{st.name}</div>
                  <div className="text-[10px] text-slate-400">Gap: {st.gap}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px]">
                    <span className="text-slate-500 line-through">{st.codeScore}%</span> →{' '}
                    <span className={`font-bold ${st.proofScore < 70 ? 'text-coral-bad' : 'text-emerald-400'}`}>
                      {st.proofScore}%
                    </span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    st.proofScore < 70 ? 'bg-coral-bad/10 text-coral-bad' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

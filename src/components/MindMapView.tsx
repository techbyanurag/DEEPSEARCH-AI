import React, { useState } from 'react';
import { Network, Sparkles, ChevronRight, Info, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { MindMapNode } from '../types';

interface MindMapViewProps {
  mindMap: MindMapNode | null;
  topic: string;
}

export const MindMapView: React.FC<MindMapViewProps> = ({ mindMap, topic }) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  const defaultTree: MindMapNode = mindMap || {
    id: 'root',
    label: topic || 'Artificial Intelligence',
    category: 'core',
    details: 'Primary domain encompassing cognitive algorithms, machine learning, and multi-modal neural reasoning.',
    children: [
      {
        id: 'n-1',
        label: 'Architectures & Models',
        category: 'subtopic',
        details: 'Core model paradigms powering modern intelligence.',
        children: [
          { id: 'n-1-1', label: 'Transformers & MoE', category: 'fact', details: 'Attention mechanism and Mixture-of-Experts routing.' },
          { id: 'n-1-2', label: 'State Space Models (Mamba)', category: 'fact', details: 'Linear time complexity sequence modeling.' },
        ],
      },
      {
        id: 'n-2',
        label: 'Key Applications',
        category: 'subtopic',
        details: 'Sectoral deployments in production environments.',
        children: [
          { id: 'n-2-1', label: 'Autonomous Coding', category: 'application', details: 'AI coding agents and automatic refactoring.' },
          { id: 'n-2-2', label: 'Drug Discovery', category: 'application', details: 'Protein binding prediction and chemical synthesis.' },
        ],
      },
      {
        id: 'n-3',
        label: 'Future Horizons',
        category: 'subtopic',
        details: 'Next-generation technological frontiers.',
        children: [
          { id: 'n-3-1', label: 'Quantum AI Systems', category: 'fact', details: 'Quantum circuit acceleration for neural training.' },
        ],
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-2 backdrop-blur-md">
            <Network className="h-4 w-4 text-cyan-400" />
            <span>Interactive AI Mind Map Visualizer</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Structural Mind Map: {defaultTree.label}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Click any node in the hierarchy to inspect detailed empirical insights and subtopic relations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MIND MAP TREE CANVAS */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl space-y-6 overflow-x-auto">
          {/* Root Node */}
          <div className="flex justify-center">
            <button
              onClick={() => setSelectedNode(defaultTree)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all text-center border border-white/10"
            >
              🧠 {defaultTree.label}
            </button>
          </div>

          <div className="h-8 w-0.5 bg-indigo-500/40 mx-auto" />

          {/* Subtopic Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {defaultTree.children?.map((subNode) => (
              <div key={subNode.id} className="space-y-4">
                <button
                  onClick={() => setSelectedNode(subNode)}
                  className="w-full p-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-bold text-xs shadow-md text-center transition-all backdrop-blur-md"
                >
                  📌 {subNode.label}
                </button>

                {subNode.children && subNode.children.length > 0 && (
                  <div className="space-y-2 pl-3 border-l-2 border-indigo-500/20">
                    {subNode.children.map((leaf) => (
                      <button
                        key={leaf.id}
                        onClick={() => setSelectedNode(leaf)}
                        className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/20 text-zinc-300 text-[11px] text-left transition-all block truncate"
                      >
                        • {leaf.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* NODE INSPECTOR PANEL */}
        <div className="glass-card rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Info className="h-4 w-4 text-cyan-400" /> Node Inspector
          </h3>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider border border-cyan-500/20">
                  Category: {selectedNode.category || 'general'}
                </span>
                <h4 className="text-sm font-extrabold text-white">{selectedNode.label}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedNode.details || 'Detailed research note synthesized for this mind map node.'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic p-6 text-center">
              Click any node in the mind map canvas to display details here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

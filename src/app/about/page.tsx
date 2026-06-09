'use client';

import React from 'react';
import { 
  User, 
  Code, 
  Mail, 
  Sparkles, 
  Cpu, 
  ShieldCheck,
  Users
} from 'lucide-react';

const DEVELOPERS = [
  {
    name: 'Nitish Kumar Yadav',
    role: 'Full Stack Developer & AI Architect',
    linkedin: 'https://www.linkedin.com/in/nitishyadav866/',
    github: 'https://github.com/nitishya',
    email: 'nitishya143@gmail.com',
  },
  {
    name: 'Saurabh Gupta',
    role: 'Frontend Developer & UI Engineer',
    linkedin: 'https://www.linkedin.com/in/',
    github: 'https://github.com/',
    email: '',
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1 w-full bg-zinc-950 grid-bg min-h-screen py-16 px-4 sm:px-6 md:px-8 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Title / Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            About Shop Negotiator AI
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            An advanced, autonomous voice AI negotiator built to redefine e-commerce by finding and locking the best possible prices live.
          </p>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass-panel border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Autonomous Price Engine</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Shop Negotiator AI orchestrates multi-agent negotiations by scanning major retail stores (Amazon, Flipkart, Croma) in real-time, executing vendor-matching checks, and generating unique discount contracts.
              </p>
            </div>
          </div>

          <div className="glass-panel border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Secure E-Commerce Integrations</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                By injecting direct API clearance codes to simulate private vendor contracts, our system bridges the gap between merchant stock clearances and buyer requirements with total security and transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div className="glass-panel border border-brand-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />

          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-500">Developer Profiles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEVELOPERS.map((dev) => (
              <div key={dev.name} className="flex flex-col gap-4">
                {/* Dev header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-extrabold text-lg">
                    {dev.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white leading-tight">{dev.name}</h2>
                    <p className="text-xs text-zinc-500 font-medium">{dev.role}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-2">
                  {/* LinkedIn */}
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-indigo-500/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">LinkedIn</span>
                      <span className="text-xs font-semibold truncate">{dev.linkedin.replace('https://www.linkedin.com/in/', '').replace('/', '')}</span>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">GitHub</span>
                      <span className="text-xs font-semibold">{dev.github.replace('https://github.com/', '') || 'GitHub Profile'}</span>
                    </div>
                  </a>

                  {/* Email */}
                  {dev.email && (
                    <a
                      href={`mailto:${dev.email}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 flex-shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">Email</span>
                        <span className="text-xs font-semibold">{dev.email}</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Repository link */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <a
              href="https://github.com/nitishya/shop-negotiator-ai#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all group active:scale-[0.98] w-full sm:w-auto inline-flex"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 flex-shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">Project Repository</span>
                <span className="text-xs font-semibold">github.com/nitishya/shop-negotiator-ai</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

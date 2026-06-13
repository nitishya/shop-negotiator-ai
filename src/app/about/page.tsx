'use client';

import React from 'react';
import { 
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

function DeveloperCard({ dev }: { dev: typeof DEVELOPERS[0] }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div 
      className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer group shadow-sm hover:shadow-md"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Dev header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-extrabold text-lg group-hover:scale-105 transition-transform">
          {dev.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">{dev.name}</h2>
          <p className="text-xs text-slate-500 font-medium">{dev.role}</p>
        </div>
      </div>

      {/* Expandable Social Links */}
      <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0 m-0'}`}>
        {/* LinkedIn */}
        {dev.linkedin && dev.linkedin !== 'https://www.linkedin.com/in/' && (
          <a
            href={dev.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-slate-600 hover:text-indigo-700 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex-shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">LinkedIn</span>
              <span className="text-xs font-semibold truncate text-slate-700">{dev.linkedin.replace('https://www.linkedin.com/in/', '').replace('/', '')}</span>
            </div>
          </a>
        )}

        {/* GitHub */}
        {dev.github && dev.github !== 'https://github.com/' && (
          <a
            href={dev.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex-shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">GitHub</span>
              <span className="text-xs font-semibold text-slate-700">{dev.github.replace('https://github.com/', '') || 'GitHub Profile'}</span>
            </div>
          </a>
        )}

        {/* Email */}
        {dev.email && (
          <a
            href={`mailto:${dev.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex-shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Email</span>
              <span className="text-xs font-semibold text-slate-700">{dev.email}</span>
            </div>
          </a>
        )}
      </div>
      
      {!isExpanded && (
        <div className="text-center w-full pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase font-bold text-slate-400">Click to view details</span>
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex-1 w-full bg-slate-50 grid-bg min-h-screen py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Title / Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            About Shop Negotiator AI
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg">
            An advanced, autonomous voice AI negotiator built to redefine e-commerce by finding and locking the best possible prices live.
          </p>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Autonomous Price Engine</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Shop Negotiator AI orchestrates multi-agent negotiations by scanning major retail stores (Amazon, Flipkart, Croma) in real-time, executing vendor-matching checks, and generating unique discount contracts.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Secure E-Commerce Integrations</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                By injecting direct API clearance codes to simulate private vendor contracts, our system bridges the gap between merchant stock clearances and buyer requirements with total security and transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500" />

          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-8 mt-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Developer Profiles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEVELOPERS.map((dev) => (
              <DeveloperCard key={dev.name} dev={dev} />
            ))}
          </div>

          {/* Repository link */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <a
              href="https://github.com/nitishya/shop-negotiator-ai#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all group active:scale-[0.98] w-full sm:w-auto inline-flex"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-200 text-slate-600 group-hover:bg-slate-300 flex-shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Project Repository</span>
                <span className="text-xs font-semibold">github.com/nitishya/shop-negotiator-ai</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

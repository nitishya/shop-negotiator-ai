import React from 'react';
import { Bot, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-zinc-950/60 mt-auto py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} AI Shopping Negotiator Agent. Developed by <a href="/about" className="hover:text-indigo-400 font-medium transition-colors">Nitish Kumar Yadav &amp; Saurabh Gupta</a>.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href="https://www.linkedin.com/in/nitishyadav866/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors text-zinc-500"
            title="LinkedIn Profile"
          >
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/nitishya/shop-negotiator-ai#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

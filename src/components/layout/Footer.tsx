import React from 'react';
import Link from 'next/link';
import { Bot, Github, Linkedin, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="font-bold text-slate-900">Shop Negotiator AI</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Autonomous AI agent that negotiates real-time deals across Amazon, Flipkart, Croma, Zepto, and more.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Compare Deals', href: '/compare' },
                { name: 'Video Negotiator', href: '/video-call' },
                { name: 'About', href: '/about' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Platforms Covered</h4>
            <div className="flex flex-wrap gap-2">
              {['Amazon', 'Flipkart', 'Croma', 'Myntra', 'Zepto', 'Blinkit', 'Instamart'].map(p => (
                <span key={p} className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AI Shopping Negotiator Agent. Built with{' '}
            <Sparkles className="inline w-3.5 h-3.5 text-indigo-500 mx-0.5" />
            by{' '}
            <Link href="/about" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Nitish Kumar Yadav &amp; Saurabh Gupta
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/nitishyadav866/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/nitishya/shop-negotiator-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

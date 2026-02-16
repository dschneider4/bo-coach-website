'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setHeaderSolid(currentScroll > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bright-cyan via-primary-blue to-soft-pink z-[9999]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center transition-all duration-500 ${
        headerSolid ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-dark-bg/50' : 'bg-transparent'
      }`}>
        <div className="text-2xl font-bold font-mono text-bright-cyan tracking-tight">
          Bo<span className="animate-pulse">_</span>
        </div>

        <nav className="hidden md:flex gap-10">
          {['Home', 'About', 'How it Works'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative group text-sm text-light-cream/70 hover:text-light-cream transition-colors duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bright-cyan to-primary-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          {session ? (
            <>
              <Link
                href="/coach"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white text-sm hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Open Coach
              </Link>
              <div className="flex items-center gap-2 ml-1">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-bright-cyan/30"
                  />
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-light-cream/40 hover:text-soft-pink text-xs transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 rounded-full border border-bright-cyan/50 text-bright-cyan text-sm hover:bg-bright-cyan/10 transition-all duration-300"
              >
                Let&apos;s Get Started
              </Link>
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white text-sm hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      <div className={`fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {['Home', 'About', 'How it Works'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-2xl text-light-cream/80 hover:text-bright-cyan transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        {session ? (
          <>
            <Link
              href="/coach"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white"
              onClick={() => setMenuOpen(false)}
            >
              Open Coach
            </Link>
            <button
              onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }); }}
              className="text-light-cream/40 hover:text-soft-pink transition-colors"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/auth/signin"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        )}
      </div>
    </>
  );
}

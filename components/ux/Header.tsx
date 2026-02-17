import Link from 'next/link';
import Menu from './Menu';
// Ensure this path is correct based on your folder structure
import GlobalAudioToggle from '../try/GlobalAudio';

export default function Header() {
  return (
    // OPTIMIZATION: 'fixed' is often better than 'sticky' for headers to prevent layout shift during scroll, 
    // but 'sticky' is fine if that is your design intent. 
    // Added 'pointer-events-none' to wrapper so the header bar doesn't block clicks, 
    // then 'pointer-events-auto' on children.
    <header className='fixed top-0 left-0 w-full z-[50] mix-blend-difference pointer-events-none'>
      <nav
        className="w-full flex justify-between items-center px-4 lg:px-10 py-4"
        aria-label="Main Navigation"
      >
        {/* LOGO: Must be a Link, and pointer-events-auto to be clickable */}
        <Link
          href="/"
          className="text-md tracking-tighter text-sm font-semibold z-[51] pointer-events-auto hover:opacity-70 transition-opacity"
          aria-label="MickeyLabs Home"
        >
          MickeyLabs.
        </Link>

        {/* DESKTOP NAV */}
        <div
          className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] items-center pointer-events-auto"
        >
          <Link href="/strategy" className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href="/contact" className="hover:opacity-50 transition-opacity">Connect</Link>
        </div>

        {/* UTILITIES / MOBILE MENU */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <GlobalAudioToggle />
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  )
}
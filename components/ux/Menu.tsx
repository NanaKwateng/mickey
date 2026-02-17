"use client";

import {
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FaGripLines } from "react-icons/fa";

// ─── Data ────────────────────────────────────────────
const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/strategy", label: "About" },
    { path: "/strategy", label: "Work" },
    { path: "/lab", label: "Lab" },
    { path: "/contact", label: "Contact" },
] as const;

const socialLinks = [
    { href: "https://instagram.com/mickeylabs", label: "Instagram" },
    { href: "https://youtube.com/@mickeylabs", label: "YouTube" },
    { href: "https://tiktok.com/@mickeylabs", label: "TikTok" },
] as const;

// ─── Component ───────────────────────────────────────
const Menu = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // ─── Toggle ──────────────────────────────────────
    const openMenu = useCallback(() => setIsMenuOpen(true), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    // ─── Close on route change ───────────────────────
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // ─── GSAP Setup ──────────────────────────────────
    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            gsap.set(".menu-link-item-holder", { y: 85 });

            timelineRef.current = gsap
                .timeline({ paused: true })
                .to(".menu-overlay", {
                    duration: prefersReducedMotion ? 0 : 1.25,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                })
                .to(".menu-link-item-holder", {
                    y: 0,
                    duration: prefersReducedMotion ? 0 : 1,
                    stagger: prefersReducedMotion ? 0 : 0.1,
                    ease: "power4.inOut",
                    delay: prefersReducedMotion ? 0 : -0.75,
                });
        },
        { scope: containerRef }
    );

    // ─── Play / Reverse Animation ────────────────────
    useEffect(() => {
        if (!timelineRef.current) return;

        if (isMenuOpen) {
            timelineRef.current.play();
        } else {
            timelineRef.current.reverse();
        }
    }, [isMenuOpen]);

    // ─── Focus Management ────────────────────────────
    useEffect(() => {
        if (isMenuOpen) {
            // Move focus to close button when menu opens
            // Small delay to wait for animation
            const timer = setTimeout(() => {
                closeRef.current?.focus();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // Return focus to trigger button when menu closes
            triggerRef.current?.focus();
        }
    }, [isMenuOpen]);

    // ─── Escape Key ──────────────────────────────────
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                closeMenu();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen, closeMenu]);

    // ─── Focus Trap ──────────────────────────────────
    useEffect(() => {
        if (!isMenuOpen || !overlayRef.current) return;

        const overlay = overlayRef.current;
        const focusableSelectors =
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

        const handleTabTrap = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const focusableElements =
                overlay.querySelectorAll<HTMLElement>(focusableSelectors);
            const firstEl = focusableElements[0];
            const lastEl = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl?.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl?.focus();
            }
        };

        document.addEventListener("keydown", handleTabTrap);
        return () => document.removeEventListener("keydown", handleTabTrap);
    }, [isMenuOpen]);

    // ─── Lock Body Scroll ────────────────────────────
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <div ref={containerRef}>
            {/* ─── Trigger Button ─────────────────────── */}
            <Button
                ref={triggerRef}
                variant="secondary"
                size="icon"
                className="
          px-4 rounded-full cursor-pointer
          text-sm font-semibold
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-white flex items-center gap-2 justify-center 
        "
                onClick={openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="main-menu-overlay"
                aria-haspopup="dialog"
                aria-label="Open navigation menu"
            >
                {/* <span aria-hidden="true">menu</span> */}

                <FaGripLines className="w-4 h-4" aria-hidden="true" />
            </Button>

            {/* ─── Fullscreen Overlay ─────────────────── */}
            <div
                ref={overlayRef}
                id="main-menu-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation menu"
                className="
          menu-overlay fixed top-0 left-0
          w-full h-screen
          bg-white text-black
          flex flex-col p-8
          z-[800]
        "
                style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                }}
                // Prevent clicks bleeding through when hidden
                inert={!isMenuOpen ? true : undefined}
            >
                {/* Overlay Header */}
                <div className="flex justify-between items-center w-full">
                    <Link
                        href="/"
                        className="
              text-sm font-bold tracking-tighter
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-black
            "
                        onClick={closeMenu}
                        aria-label="MickeyLabs — Go to homepage"
                        tabIndex={isMenuOpen ? 0 : -1}
                    >
                        MickeyLabs.
                    </Link>

                    <Button
                        ref={closeRef}
                        variant="ghost"
                        className="
              cursor-pointer text-md font-medium
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-black
            "
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        tabIndex={isMenuOpen ? 0 : -1}
                    >
                        <span aria-hidden="true">Close</span>
                        <X className="w-5 h-5" aria-hidden="true" />
                    </Button>
                </div>

                {/* Menu Links */}
                <nav
                    aria-label="Menu navigation"
                    className="flex-1 flex flex-col justify-center py-5"
                >
                    <ul className="flex flex-col gap-1" role="list">
                        {menuLinks.map((link) => (
                            <li
                                key={link.label}
                                className="overflow-hidden h-[90px] md:h-[90px]"
                            >
                                <div className="menu-link-item-holder flex items-center h-full">
                                    <Link
                                        href={link.path}
                                        className={`
                      text-[12vw] md:text-[5vw]
                      font-bold leading-none
                      -tracking-[0.05em] uppercase
                      transition-colors duration-200
                      hover:text-red-400
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-black
                      ${pathname === link.path
                                                ? "text-red-500"
                                                : "text-black"
                                            }
                    `}
                                        onClick={closeMenu}
                                        tabIndex={isMenuOpen ? 0 : -1}
                                        aria-current={
                                            pathname === link.path ? "page" : undefined
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <footer className="space-y-3" role="contentinfo">
                    <ul
                        className="flex gap-8"
                        aria-label="Social media links"
                        role="list"
                    >
                        {socialLinks.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    className="
                    text-sm underline underline-offset-4
                    hover:text-red-400
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-black
                    transition-colors duration-200
                  "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-label={`Follow us on ${social.label} (opens in new tab)`}
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-gray-600">
                        <small>
                            © {new Date().getFullYear()} MickeyLabs. All rights
                            reserved.
                        </small>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Menu;
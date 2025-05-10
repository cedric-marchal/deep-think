"use client";

import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "@/src/components/mode-toggle";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

export const MobileMenu = ({ navLinks }: { navLinks: NavLink[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 30);
      document.body.classList.remove("overflow-hidden");

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <Menu className="h-8 w-8" />
      </Button>

      {isVisible && (
        <div className="bg-background/80 fixed inset-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-sm md:hidden">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "bg-card text-foreground relative flex w-11/12 max-w-sm flex-col items-center rounded-2xl px-8 py-8 shadow-2xl transition-all duration-100 ease-out",
              isOpen
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-8 w-8" />
            </Button>

            <nav className="mt-6 w-full" aria-label="Mobile menu">
              <ul className="flex flex-col items-center gap-3">
                {navLinks.map((link: NavLink, index: number) => (
                  <li
                    key={link.href}
                    className="relative flex w-full justify-center"
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground group relative w-full px-2 py-2 text-center text-sm font-medium transition-colors"
                      style={{ animationDelay: `${100 + index * 75}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      <span className="bg-primary absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";
import { cn } from "../lib/utils.js";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Cool geometric logo component
const LogoSymbol = () => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          d="M16 2 L28 10 L28 22 L16 30 L4 22 L4 10 Z"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle
          cx="16"
          cy="16"
          r="6"
          fill="url(#logoGradient)"
          opacity="0.6"
        />
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="#f1f5f9"
          opacity="0.9"
        />
      </svg>
    </motion.div>
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
    </motion.div>
  </div>
);

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <motion.div
                  layout
                  className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50 bg-white/80 backdrop-blur-md shadow-lg flex justify-center space-x-8 px-8 py-4">
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  children,
  to,
  ...rest
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      {...rest}
      className={`block px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-cyan-400 bg-slate-800/50' 
          : 'text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:bg-slate-800/30'
      }`}>
      {children}
    </Link>
  );
};

export const Navbar = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "blur(10px)",
        boxShadow: visible
          ? "0 0 24px rgba(6, 182, 212, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(51, 65, 85, 0.3)"
          : "0 0 24px rgba(0, 0, 0, 0.1)",
        width: visible ? "50%" : "90%",
        y: visible ? 20 : 10,
        borderRadius: visible ? "2rem" : "3rem",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      style={{
        minWidth: visible ? "600px" : "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between self-start px-6 py-3",
        visible 
          ? "bg-slate-900/90 border border-slate-700/50" 
          : "bg-slate-900/70 border border-slate-700/30",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick
}) => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item, idx) => {
    if (onItemClick) onItemClick();

    if (item.name === 'Work') {
      // If already on home page, smooth scroll
      if (location.pathname === '/') {
        document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate home first then scroll after small delay
        navigate('/');
        setTimeout(() => {
          document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return;
    }

    if (item.link.startsWith('/')) {
      navigate(item.link);
    } else {
      window.open(item.link, '_blank');
    }
  };

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200",
        className
      )}>
      {items.map((item, idx) => {
        const isActive = location.pathname === item.link && item.name !== 'Work';
        return (
          <button
            key={`link-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            onClick={() => handleClick(item, idx)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-colors",
              isActive 
                ? "text-cyan-400" 
                : "text-slate-300 hover:text-white"
            )}>
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-slate-800/50 border border-slate-600/50" />
            )}
            <span className="relative z-20">{item.name}</span>
          </button>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "blur(10px)",
        boxShadow: visible
          ? "0 0 24px rgba(6, 182, 212, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2)"
          : "0 0 24px rgba(0, 0, 0, 0.1)",
        width: visible ? "95%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "1rem" : "2rem",
        y: visible ? 10 : 5,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-3 lg:hidden",
        visible 
          ? "bg-slate-900/90 border border-slate-700/50" 
          : "bg-slate-900/70 border border-slate-700/30",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className
}) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-slate-900/95 backdrop-blur-md border border-slate-700/50 px-4 py-6 shadow-xl",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return (
    <button onClick={onClick} className="p-2">
      {isOpen ? (
        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-3 px-2 py-1 hover:scale-105 transition-transform duration-300">
      <LogoSymbol />
      <span className="font-semibold text-slate-200 hidden sm:block">Portfolio</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-medium relative cursor-pointer transition-all duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 hover:scale-105 shadow-lg hover:shadow-cyan-500/25",
    secondary: "bg-transparent text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500",
    dark: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700",
  };

  if (href && href.startsWith('/')) {
    return (
      <Link
        to={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};

// Main Navbar component that puts it all together
function NavbarComponent() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Work", link: "/" },
    { name: "About", link: "/about" },
  ];

  const mobileNavItems = [
    { name: "Work", link: "/" },
    { name: "About", link: "/about" },
    { name: "Email", link: "mailto:nub38bn@gmail.com" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/benniu04/" },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className="hidden lg:flex">
        <NavbarLogo />
        <div className="flex flex-1 justify-end">
          <NavItems items={navItems} className="justify-end" />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="lg:hidden">
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)}>
          {mobileNavItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link.startsWith('/') ? item.link : '#'}
              onClick={(e) => {
                if (!item.link.startsWith('/')) {
                  e.preventDefault();
                  window.open(item.link, '_blank');
                }
                setIsMobileOpen(false);
              }}
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2 w-full">
              {item.name}
            </Link>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export default NavbarComponent;

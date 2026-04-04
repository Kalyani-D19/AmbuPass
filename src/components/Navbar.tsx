import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Siren } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Emergency" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/form", label: "Form Filling" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg emergency-gradient">
            <Siren className="h-5 w-5 text-emergency-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            AmbuPass
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-emergency/10 text-emergency"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-emergency/10 text-emergency"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

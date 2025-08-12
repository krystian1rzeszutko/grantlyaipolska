import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block size-6 rounded-sm bg-primary" aria-hidden />
          <span className="text-base font-semibold tracking-tight">GrantFinder Polska</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/grants" className="text-sm text-muted-foreground hover:text-foreground">Wyszukiwarka</NavLink>
          <NavLink to="/eligibility" className="text-sm text-muted-foreground hover:text-foreground">Ocena</NavLink>
          <NavLink to="/chatbot" className="text-sm text-muted-foreground hover:text-foreground">Chatbot</NavLink>
          <NavLink to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Panel</NavLink>
          <NavLink to="/admin" className="text-sm text-muted-foreground hover:text-foreground">Admin</NavLink>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost"><Link to="/auth">Zaloguj</Link></Button>
          <Button asChild variant="hero"><Link to="/auth">Wypróbuj PRO</Link></Button>
        </div>
        <button className="md:hidden" aria-label="Menu">
          <Menu className="text-muted-foreground" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Grantly Polska</p>
          <nav className="flex items-center gap-6">
            <a href="#pricing" className="hover:text-foreground">Cennik</a>
            <a href="/admin" className="hover:text-foreground">Panel Admina</a>
            <a href="/dashboard" className="hover:text-foreground">Panel użytkownika</a>
            <a href="/regulamin" className="hover:text-foreground">Regulamin</a>
            <a href="/polityka-prywatnosci" className="hover:text-foreground">Polityka prywatności</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

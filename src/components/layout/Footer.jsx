const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-light">
          © {new Date().getFullYear()} Anfernee Pichardo. Built with Next.js.
        </p>
        <div className="text-sm text-muted-foreground font-light">
          Designed & Engineered with intent.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

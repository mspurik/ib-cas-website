export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center text-sm text-muted-foreground">
        <p>© {currentYear} Maria Purik. All rights reserved.</p>
      </div>
    </footer>
  );
}

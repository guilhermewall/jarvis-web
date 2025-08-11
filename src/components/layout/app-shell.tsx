import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Sun, Moon } from "lucide-react";
import { useThemeToggle } from "@/hooks/ui/theme";
import { navigationItems } from "@/lib/navigation";
import type { NavKey } from "@/types/common";

export interface AppShellProps {
  active: NavKey;
  onChange: (key: NavKey) => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

export function AppShell({
  active,
  onChange,
  onLogout,
  children,
}: AppShellProps) {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useThemeToggle();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
            <div className="font-semibold tracking-tight">J.A.R.V.I.S</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDark((v) => !v)}
              aria-label={
                dark ? "Mudar para tema claro" : "Mudar para tema escuro"
              }
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl grid md:grid-cols-[240px_1fr] gap-4 px-4 py-4">
        <aside className="hidden md:block">
          <nav className="rounded-[var(--radius)] border border-border bg-card">
            <ul className="p-2">
              {navigationItems.map((it) => (
                <li key={it.key}>
                  <button
                    onClick={() => onChange(it.key)}
                    className={[
                      "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-left",
                      active === it.key ? "bg-muted" : "hover:bg-muted",
                    ].join(" ")}
                  >
                    {it.icon}
                    <span>{it.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <div className="absolute left-0 top-0 h-full w-[76%] max-w-[280px] bg-card border-r border-border p-3 shadow-xl">
            <div className="mb-3 font-semibold">Navegação</div>
            <ul className="space-y-1">
              {navigationItems.map((it) => (
                <li key={it.key}>
                  <button
                    onClick={() => {
                      onChange(it.key);
                      setOpen(false);
                    }}
                    className={[
                      "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-left",
                      active === it.key ? "bg-muted" : "hover:bg-muted",
                    ].join(" ")}
                  >
                    {it.icon}
                    <span>{it.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

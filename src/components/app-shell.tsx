import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, ChevronRight, Menu, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type AppShellProps = {
  children: React.ReactNode;
  navigation: NavigationItem[];
  title: string;
  subtitle?: string;
  tenantName?: string;
  activePath?: string;
};

function Navigation({ items, activePath, compact = false }: { items: NavigationItem[]; activePath?: string; compact?: boolean }) {
  return (
    <nav className={cn("flex gap-1", compact ? "flex-row justify-around" : "flex-col")}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = activePath === item.href;
        return (
          <Link
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              compact && "flex-1 flex-col gap-1 px-1 py-2 text-[10px]",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            href={item.href}
            key={item.href}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children, navigation, title, subtitle, tenantName, activePath }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 hidden w-64 border-r bg-card p-4 lg:block">
        <Link className="mb-8 flex items-center gap-3 px-2" href="/">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Scissors className="size-4" /></span>
          <span><span className="block text-sm font-semibold">App Barber</span><span className="block text-xs text-muted-foreground">Pichilemu</span></span>
        </Link>
        {tenantName && <div className="mb-5 rounded-lg border bg-muted/40 p-3"><p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Barbería activa</p><p className="mt-1 text-sm font-semibold">{tenantName}</p></div>}
        <Navigation activePath={activePath} items={navigation} />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild><Button aria-label="Abrir navegación" size="icon" variant="ghost"><Menu className="size-5" /></Button></SheetTrigger>
              <SheetContent side="left" className="w-72 p-4"><SheetHeader><SheetTitle>App Barber</SheetTitle></SheetHeader><div className="mt-6"><Navigation activePath={activePath} items={navigation} /></div></SheetContent>
            </Sheet>
            <span className="text-sm font-semibold">App Barber</span>
          </div>
          <div className="hidden lg:block"><p className="text-sm font-semibold">{title}</p>{subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}</div>
          <div className="flex items-center gap-1"><Button aria-label="Notificaciones" size="icon" variant="ghost"><Bell className="size-4" /></Button><Button asChild className="hidden sm:inline-flex" size="sm" variant="outline"><Link href="/select-barbershop">Cambiar vista <ChevronRight className="size-3" /></Link></Button></div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-1 backdrop-blur lg:hidden"><Navigation activePath={activePath} compact items={navigation.slice(0, 5)} /></div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>}<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}</div>{action}</div>;
}

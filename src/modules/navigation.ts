import { BarChart3, Building2, CalendarDays, CircleDollarSign, ContactRound, CreditCard, LayoutDashboard, ReceiptText, Scissors, Settings2, Store, UsersRound } from "lucide-react";
import type { NavigationItem } from "@/components/app-shell";

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Agenda", href: "/admin/agenda", icon: CalendarDays },
  { label: "Barberos", href: "/admin/barbers", icon: Scissors },
  { label: "Clientes", href: "/admin/clients", icon: ContactRound },
  { label: "Reservas", href: "/admin/bookings", icon: UsersRound },
  { label: "Servicios", href: "/admin/services", icon: Store },
  { label: "Gastos", href: "/admin/expenses", icon: ReceiptText },
  { label: "Arriendos", href: "/admin/rents", icon: CreditCard },
  { label: "Configuración", href: "/admin/settings", icon: Settings2 },
];

export const barberNavigation: NavigationItem[] = [
  { label: "Hoy", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agenda", href: "/dashboard/agenda", icon: CalendarDays },
  { label: "Reservas", href: "/dashboard/bookings", icon: UsersRound },
  { label: "Clientes", href: "/dashboard/clients", icon: ContactRound },
  { label: "Ingresos", href: "/dashboard/income", icon: CircleDollarSign },
  { label: "Gastos", href: "/dashboard/expenses", icon: ReceiptText },
  { label: "Servicios", href: "/dashboard/services", icon: Scissors },
  { label: "Perfil", href: "/dashboard/profile", icon: Settings2 },
];

export const superAdminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
  { label: "Barberías", href: "/super-admin/barbershops", icon: Building2 },
  { label: "Usuarios", href: "/super-admin/users", icon: UsersRound },
  { label: "Planes", href: "/super-admin/plans", icon: BarChart3 },
  { label: "Configuración", href: "/super-admin/settings", icon: Settings2 },
];

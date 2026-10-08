import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Building2,
  LayoutDashboard,
  Radio,
  TriangleAlert,
} from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="app-sidebar">
      <Link href="/" className="sidebar-brand">
        <span className="brand-symbol" aria-hidden="true">
          <Activity className="h-5 w-5" />
        </span>

        <span>
          <span className="brand-name">NOAH</span>
          <span className="brand-caption">ENERGY OPERATIONS</span>
        </span>
      </Link>

      <div className="sidebar-workspace">
        <span className="workspace-avatar">NE</span>

        <div>
          <p>Nova Energy Systems</p>
          <span>Operational workspace</span>
        </div>
      </div>

      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav" aria-label="Workspace">
        <Link href="/" className="nav-overview">
          <LayoutDashboard className="h-4 w-4" />
          Portfolio overview
        </Link>

        <Link href="/#facilities" className="nav-facilities">
          <Building2 className="h-4 w-4" />
          Facilities
          <ArrowUpRight className="nav-arrow h-3.5 w-3.5" />
        </Link>

        <Link href="/#alerts" className="nav-alerts">
          <TriangleAlert className="h-4 w-4" />
          Operational attention
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Activity className="h-7 w-7" />

        <p>
          TOTAL INSIGHT.
          <br />
          TOTAL CONTROL.
        </p>

        <span>Built for the energy transition.</span>

        <div className="sidebar-demo">
          <Radio className="h-3.5 w-3.5" />
          Interactive concept prototype
        </div>
      </div>
    </aside>
  );
}
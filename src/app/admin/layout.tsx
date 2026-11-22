"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Layers,
  Package,
  Briefcase,
  MessageSquare,
  Users,
  HelpCircle,
  FileText,
  Sliders,
  Image as ImageIcon,
  Search,
  Settings,
  Shield,
  Menu,
  X,
  LogOut,
  Bell,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Leads CRM", href: "/admin/leads", icon: Users2 },
    ],
  },
  {
    title: "Catalog & Pricing",
    items: [
      { name: "Services", href: "/admin/services", icon: Layers },
      { name: "Packages & Matrix", href: "/admin/packages", icon: Package },
      { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    ],
  },
  {
    title: "Content & Proof",
    items: [
      { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
      { name: "Team & Founder", href: "/admin/team", icon: Users },
      { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      { name: "Blog Posts", href: "/admin/blog", icon: FileText },
      { name: "Page Content", href: "/admin/content", icon: Sliders },
      { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "Growth & Config",
    items: [
      { name: "SEO Center", href: "/admin/seo", icon: Search },
      { name: "Site Settings", href: "/admin/settings", icon: Settings },
      { name: "Users & Roles", href: "/admin/users", icon: Shield },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // If on login page, don't show admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#07060D] text-[#B8B3CC] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-[#0D0B16] border-r border-white/[0.08] transition-all duration-300 z-30 sticky top-0 h-screen ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08]">
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-2">
                <span className="font-heading font-black text-lg tracking-wider text-white">
                  SARDYX<span className="text-[#8A2BEF]">.ADMIN</span>
                </span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center mx-auto"
              aria-label="Toggle sidebar collapse"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Nav Items */}
          <div className="py-4 px-3 overflow-y-auto max-h-[calc(100vh-120px)] space-y-6">
            {navSections.map((sec, sIdx) => (
              <div key={sIdx}>
                {!collapsed && (
                  <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-[#8A849F] mb-2 font-bold">
                    {sec.title}
                  </p>
                )}
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.name : undefined}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                          isActive
                            ? "bg-[#8A2BEF] text-white shadow-[0_0_15px_rgba(138,43,239,0.4)]"
                            : "text-[#B8B3CC] hover:text-white hover:bg-white/[0.04]"
                        } ${collapsed ? "justify-center px-0" : ""}`}
                      >
                        <Icon size={18} className="shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Public Link */}
        <div className="p-3 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-2 text-xs text-[#8A849F] hover:text-white p-2 rounded-xl hover:bg-white/[0.04] w-full min-h-[44px] ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ExternalLink size={16} />
            {!collapsed && <span>Live Public Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[#0D0B16]/80 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl border border-white/[0.1] bg-white/[0.04] text-white min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Open navigation drawer"
            >
              <Menu size={20} />
            </button>

            <span className="text-xs font-mono text-[#8A849F] hidden sm:inline-block">
              Workspace: Production CMS & CRM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#00C0FF] hover:bg-white/[0.08] relative min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              title="New Leads Notifications"
            >
              <Bell size={16} />
              <span className="w-2 h-2 rounded-full bg-[#32CD32] absolute top-2 right-2 animate-pulse" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="btn-glass-pill text-xs py-1.5 px-3 hidden sm:inline-flex items-center gap-1.5 min-h-[36px]"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-72 bg-[#0D0B16] h-full p-4 overflow-y-auto border-r border-white/[0.1] z-10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <span className="font-heading font-black text-lg text-white">
                  SARDYX<span className="text-[#8A2BEF]">.ADMIN</span>
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {navSections.map((sec, sIdx) => (
                  <div key={sIdx}>
                    <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-[#8A849F] mb-1 font-bold">
                      {sec.title}
                    </p>
                    <div className="space-y-1">
                      {sec.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileDrawerOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[44px] ${
                              isActive
                                ? "bg-[#8A2BEF] text-white"
                                : "text-[#B8B3CC] hover:bg-white/[0.04]"
                            }`}
                          >
                            <Icon size={18} />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-2 text-xs text-[#8A849F] hover:text-white p-2 min-h-[44px]"
              >
                <ExternalLink size={16} />
                <span>Live Public Site</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

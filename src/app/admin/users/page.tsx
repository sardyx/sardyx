"use client";

import { useState } from "react";
import {
  Shield,
  UserCheck,
  UserX,
  History,
  Key,
  Mail,
  CheckCircle2,
  AlertCircle,
  Plus,
  Lock
} from "lucide-react";

interface StaffProfile {
  id: string;
  email: string;
  full_name: string;
  role: "owner" | "admin" | "editor";
  is_active: boolean;
  last_sign_in: string;
}

interface AuditLogEntry {
  id: string;
  action: string;
  actor_email: string;
  target_table: string;
  created_at: string;
  ip_address: string;
}

const initialProfiles: StaffProfile[] = [
  {
    id: "user-1",
    email: "sardyxai@gmail.com",
    full_name: "Sardar M. Abdullah",
    role: "owner",
    is_active: true,
    last_sign_in: "Just now",
  },
  {
    id: "user-2",
    email: "huzaifa@sardyxai.com",
    full_name: "Muhammad Huzaifa",
    role: "admin",
    is_active: true,
    last_sign_in: "Yesterday at 18:22",
  },
  {
    id: "user-3",
    email: "bilal@sardyxai.com",
    full_name: "Muhammad Bilal",
    role: "editor",
    is_active: true,
    last_sign_in: "3 days ago",
  },
];

const initialLogs: AuditLogEntry[] = [
  {
    id: "log-1",
    action: "UPDATE_STATUS",
    actor_email: "sardyxai@gmail.com",
    target_table: "leads (lead-001 -> contacted)",
    created_at: "Today, 14:15",
    ip_address: "182.180.xxx.xxx",
  },
  {
    id: "log-2",
    action: "INDEXNOW_PING",
    actor_email: "sardyxai@gmail.com",
    target_table: "sitemap.xml",
    created_at: "Today, 11:30",
    ip_address: "182.180.xxx.xxx",
  },
  {
    id: "log-3",
    action: "PUBLISH_POST",
    actor_email: "sardyxai@gmail.com",
    target_table: "blog_posts (offline-pos)",
    created_at: "Yesterday, 16:40",
    ip_address: "182.180.xxx.xxx",
  },
];

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<StaffProfile[]>(initialProfiles);
  const [logs, setLogs] = useState<AuditLogEntry[]>(initialLogs);
  const [activeTab, setActiveTab] = useState<"users" | "audit">("users");

  const toggleActive = (id: string) => {
    setProfiles((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          if (u.role === "owner") {
            alert("Cannot deactivate primary agency owner account.");
            return u;
          }
          return { ...u, is_active: !u.is_active };
        }
        return u;
      })
    );
  };

  const changeRole = (id: string, newRole: StaffProfile["role"]) => {
    setProfiles((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Shield className="text-[#8A2BEF]" size={28} />
            Users, Roles & Security Audit
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Control dashboard authorization levels, staff activation gates, and review immutable audit logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08]">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "users"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <UserCheck size={14} />
          Authorized Staff ({profiles.length})
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-5 py-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "audit"
              ? "border-[#8A2BEF] text-white"
              : "border-transparent text-[#8A849F] hover:text-white"
          }`}
        >
          <History size={14} />
          Audit Log History
        </button>
      </div>

      {/* Tab: Users */}
      {activeTab === "users" && (
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role Permission</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Gate Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {profiles.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{u.full_name}</div>
                      <div className="text-xs text-[#8A849F]">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.role === "owner" ? (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#8A2BEF]/20 text-[#C4A0FF] border border-[#8A2BEF]/30 font-bold">
                          OWNER (Root)
                        </span>
                      ) : (
                        <select
                          value={u.role}
                          onChange={(e) => changeRole(u.id, e.target.value as any)}
                          className="bg-[#14111F] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-white"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          u.is_active
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {u.is_active ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-[#8A849F]">{u.last_sign_in}</td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== "owner" && (
                        <button
                          onClick={() => toggleActive(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                            u.is_active
                              ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {u.is_active ? "Suspend Access" : "Activate Access"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === "audit" && (
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono text-[#8A849F]">{log.created_at}</td>
                    <td className="py-3 px-4 font-semibold text-white">{log.actor_email}</td>
                    <td className="py-3 px-4 font-mono text-[#00C0FF]">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-[#B8B3CC]">{log.target_table}</td>
                    <td className="py-3 px-4 font-mono text-[#8A849F]">{log.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

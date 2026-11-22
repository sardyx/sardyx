"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingActivation, setPendingActivation] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setPendingActivation(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Check profile activation
        const { data: profile, error: pErr } = await supabase
          .from("profiles")
          .select("is_active, role")
          .eq("id", data.user.id)
          .single();

        if (profile && !profile.is_active) {
          setPendingActivation(true);
          await supabase.auth.signOut();
          return;
        }

        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07060D] text-[#B8B3CC] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#8A2BEF]/15 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00C0FF] mb-3">
            <Sparkles size={12} />
            <span>OPERATING SYSTEM</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
            SARDYX<span className="text-[#8A2BEF]">.ADMIN</span>
          </h1>
          <p className="text-xs text-[#8A849F] mt-1 font-mono">
            Secure Portal & Control Center
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.1] shadow-2xl">
          {pendingActivation ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[#FFB020] flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={24} />
              </div>
              <h2 className="font-heading font-bold text-base text-white mb-2">
                Account Pending Activation
              </h2>
              <p className="text-xs text-[#B8B3CC] leading-relaxed mb-6">
                Your sign-up was received. In accordance with security protocol, new staff accounts must be activated by an owner before accessing the CRM and CMS.
              </p>
              <button
                onClick={() => setPendingActivation(false)}
                className="btn-glass-pill text-xs py-2 px-5 cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                  Staff Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Mail size={15} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@sardyxai.com"
                    className="w-full bg-[#0D0B16] border border-white/[0.1] focus:border-[#00C0FF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8A849F] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Lock size={15} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0D0B16] border border-white/[0.1] focus:border-[#00C0FF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary-pill w-full py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer min-h-[44px]"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-center text-[#8A849F] font-mono mt-6">
          Staff Authentication · Row-Level Security Protected
        </p>
      </div>
    </div>
  );
}

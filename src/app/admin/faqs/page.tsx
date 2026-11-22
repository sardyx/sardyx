"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do your POS systems work if our store loses internet connectivity?",
    answer: "Yes, 100%. Our retail and pharmacy POS systems are architected with local SQLite and IndexedDB caching. Cashiers can continue barcode scanning, ringing up sales, and printing receipts uninterrupted. When connectivity returns, the local engine automatically performs transactional sync with your cloud database with conflict resolution.",
    category: "Services",
    display_order: 1,
    is_active: true,
  },
  {
    id: "faq-2",
    question: "Who owns the intellectual property and source code once the project is finished?",
    answer: "You do. Upon final payment milestone, all proprietary source code, repository access, and database credentials are fully transferred to your company. We do not lock you into proprietary hosting or vendor subscriptions.",
    category: "General",
    display_order: 2,
    is_active: true,
  },
  {
    id: "faq-3",
    question: "What currencies and payment terms do you accept?",
    answer: "We invoice internationally in USD, EUR, and GBP via Wire Transfer, Wise, or Stripe, and regionally within Pakistan in PKR via direct corporate bank transfer. Standard terms are milestone-based (typically 40% discovery/architecture, 40% development deployment, 20% final acceptance & handover).",
    category: "Pricing",
    display_order: 3,
    is_active: true,
  },
  {
    id: "faq-4",
    question: "Can you train our in-house team to manage our new software and AI pipelines?",
    answer: "Yes. Every enterprise delivery includes comprehensive screen-recorded video walkthroughs, API documentation, and interactive live Zoom training sessions for your operational staff.",
    category: "Process",
    display_order: 4,
    is_active: true,
  },
  {
    id: "faq-5",
    question: "How do your AI chatbots prevent hallucinations and false information?",
    answer: "Our AI customer support agents strictly employ Retrieval-Augmented Generation (RAG). They query your validated internal documentation, inventory catalogs, and company policies as an isolated vector knowledge base, with strict guardrails preventing speculative answers.",
    category: "Services",
    display_order: 5,
    is_active: true,
  },
];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<FAQItem>>({
    question: "",
    answer: "",
    category: "General",
    display_order: 1,
    is_active: true,
  });

  useEffect(() => {
    async function loadFaqs() {
      try {
        const { data, error } = await supabase
          .from("faqs")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          setFaqs(data as any);
        }
      } catch (e) {
        console.warn("Using offline mock FAQs:", e);
      }
    }
    loadFaqs();
  }, []);

  const openAdd = () => {
    setEditingFAQ(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      display_order: faqs.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (item: FAQItem) => {
    setEditingFAQ(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      const updated = faqs.map((f) =>
        f.id === editingFAQ.id ? ({ ...f, ...formData } as FAQItem) : f
      );
      setFaqs(updated);
      try {
        await supabase.from("faqs").update(formData as any).eq("id", editingFAQ.id);
      } catch (err) {
        console.warn("Supabase update error:", err);
      }
    } else {
      const newItem: FAQItem = {
        id: `faq-${Date.now()}`,
        question: formData.question || "",
        answer: formData.answer || "",
        category: formData.category || "General",
        display_order: Number(formData.display_order) || faqs.length + 1,
        is_active: Boolean(formData.is_active),
      };
      setFaqs([...faqs, newItem]);
      try {
        await supabase.from("faqs").insert(newItem as any);
      } catch (err) {
        console.warn("Supabase insert error:", err);
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ item?")) return;
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    try {
      await supabase.from("faqs").delete().eq("id", id);
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const categories = ["all", "General", "Services", "Pricing", "Process"];

  const filtered = faqs.filter((f) => {
    const matchesCat = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <HelpCircle className="text-[#8A2BEF]" size={28} />
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Maintain authoritative answers for customer objections and Google FAQPage structured data markup.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
        >
          <Plus size={16} />
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#8A849F] focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize cursor-pointer transition-colors ${
                selectedCategory === c
                  ? "bg-[#8A2BEF] text-white"
                  : "bg-white/[0.04] text-[#8A849F] hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items Accordion list */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-4 transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="flex items-center justify-between cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#8A2BEF] font-bold">
                    #{item.display_order}
                  </span>
                  <h3 className="text-sm font-semibold text-white">{item.question}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[#8A849F]">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 text-[#8A849F] hover:text-white hover:bg-white/[0.05] rounded-lg"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1.5 text-[#8A849F] hover:text-white"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs text-[#B8B3CC] leading-relaxed bg-[#14111F] p-3.5 rounded-xl">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.1] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <h3 className="text-base font-heading font-bold text-white">
                {editingFAQ ? "Edit FAQ Item" : "Add FAQ Item"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8A849F] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question || ""}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Do your POS systems work offline?"
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="General">General</option>
                    <option value="Services">Services</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Process">Process</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8A849F] mb-1 font-medium">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order || 1}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer || ""}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed, accurate answer..."
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faq-active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded accent-[#8A2BEF]"
                />
                <label htmlFor="faq-active" className="text-white cursor-pointer">
                  Published on public site
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-white bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8A2BEF] text-white font-semibold flex items-center gap-1.5"
                >
                  <Save size={14} />
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

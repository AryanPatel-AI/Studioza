"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Save,
  Globe,
  Eye,
  Edit3,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Settings,
  Sparkles,
  Layers,
  Layout,
  FileText,
  Image as ImageIcon,
  Share2,
  AlertCircle,
  Copy,
} from "lucide-react";
import { saveProjectContent } from "@/app/actions/workspace";
import { publishProject, unpublishProject } from "@/app/actions/publishing";

interface BlockItem {
  id: string;
  type: "hero" | "text" | "features" | "gallery" | "cta";
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: any[];
}

interface WorkspaceEditorProps {
  project: {
    id: string;
    name: string;
    slug: string;
    status: string;
    content: string;
    settings: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
  };
}

export default function WorkspaceEditor({ project }: WorkspaceEditorProps) {
  const router = useRouter();

  // Initial Content Parse
  const [blocks, setBlocks] = useState<BlockItem[]>(() => {
    try {
      return JSON.parse(project.content || "[]");
    } catch {
      return [];
    }
  });

  const [activeBlockId, setActiveBlockId] = useState<string | null>(
    blocks[0]?.id || null
  );
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");
  const [status, setStatus] = useState(project.status);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Save handler
  const handleSave = useCallback(async () => {
    setSaveStatus("saving");
    try {
      const res = await saveProjectContent(project.id, JSON.stringify(blocks));
      if (res.error) {
        setNotification({ message: res.error, type: "error" });
        setSaveStatus("unsaved");
      } else {
        setSaveStatus("saved");
        setNotification({ message: "Changes saved successfully", type: "success" });
      }
    } catch {
      setNotification({ message: "Failed to save changes", type: "error" });
      setSaveStatus("unsaved");
    }
  }, [project.id, blocks]);

  // Keyboard shortcut: Cmd+S or Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  // Auto-clear notification after 4s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Block Mutations
  const updateBlock = (id: string, updates: Partial<BlockItem>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    setSaveStatus("unsaved");
  };

  const addBlock = (type: BlockItem["type"]) => {
    const newId = `block-${Date.now()}`;
    let newBlock: BlockItem = { id: newId, type };

    if (type === "hero") {
      newBlock = {
        ...newBlock,
        title: "Headline that captures your vision",
        subtitle: "A compelling subheadline explaining what makes this unique.",
        ctaText: "Explore More",
        ctaUrl: "#",
        badge: "New Release",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      };
    } else if (type === "text") {
      newBlock = {
        ...newBlock,
        title: "Section Heading",
        content: "Write your project narrative, background, and insights here.",
      };
    } else if (type === "features") {
      newBlock = {
        ...newBlock,
        title: "Key Highlights",
        subtitle: "Distinctive capabilities of this work",
        items: [
          { title: "Precision Design", description: "Meticulously crafted proportions and typographic rigor." },
          { title: "Tactile Finish", description: "Balanced contrast, subtle borders, and harmonious surfaces." },
          { title: "Direct Impact", description: "Focused presentation that communicates value instantly." },
        ],
      };
    } else if (type === "gallery") {
      newBlock = {
        ...newBlock,
        title: "Gallery Anthology",
        subtitle: "Selected visual highlights",
        items: [
          { title: "Atmosphere I", category: "Spatial", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
          { title: "Atmosphere II", category: "Light & Tone", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
        ],
      };
    } else if (type === "cta") {
      newBlock = {
        ...newBlock,
        title: "Take the next step",
        subtitle: "Get in touch or request a personalized commission.",
        buttonText: "Contact Us",
        buttonUrl: "mailto:hello@example.com",
      };
    }

    setBlocks((prev) => [...prev, newBlock]);
    setActiveBlockId(newId);
    setSaveStatus("unsaved");
  };

  const removeBlock = (id: string) => {
    if (blocks.length <= 1) {
      alert("A project must contain at least one block.");
      return;
    }
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (activeBlockId === id) {
      setActiveBlockId(blocks[0]?.id || null);
    }
    setSaveStatus("unsaved");
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIndex, 0, moved);
    setBlocks(newBlocks);
    setSaveStatus("unsaved");
  };

  // Publish / Unpublish Actions
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // First ensure current state is saved
      await saveProjectContent(project.id, JSON.stringify(blocks));

      const res = await publishProject(project.id);
      if (res.error) {
        setNotification({ message: res.error, type: "error" });
      } else {
        setStatus("published");
        setNotification({ message: "Project published live!", type: "success" });
        router.refresh();
      }
    } catch {
      setNotification({ message: "Publishing failed.", type: "error" });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setIsPublishing(true);
    try {
      const res = await unpublishProject(project.id);
      if (res.error) {
        setNotification({ message: res.error, type: "error" });
      } else {
        setStatus("draft");
        setNotification({ message: "Project returned to draft.", type: "success" });
        router.refresh();
      }
    } catch {
      setNotification({ message: "Unpublish failed.", type: "error" });
    } finally {
      setIsPublishing(false);
    }
  };

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Toast Notification Banner */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl text-xs font-medium shadow-2xl flex items-center gap-2 border animate-in slide-in-from-bottom-2 duration-150 ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/40 text-rose-200"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Workspace Bar */}
      <header className="h-14 px-4 border-b border-white/[0.08] bg-[#0d0d11] flex items-center justify-between sticky top-0 z-40">
        {/* Left: Navigation & Project Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            title="Return to Projects"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-white tracking-tight">
              {project.name}
            </span>
            <span
              className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                status === "published"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              {status}
            </span>
          </div>

          <Link
            href={`/projects/${project.id}/settings`}
            className="p-1 text-zinc-500 hover:text-zinc-300"
            title="Project Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Center: Device Mode & View Mode Switcher */}
        <div className="hidden md:flex items-center gap-2">
          {/* Device Frames */}
          <div className="flex items-center p-1 bg-white/[0.04] border border-white/[0.06] rounded-xl text-xs">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === "desktop" ? "bg-white/[0.1] text-amber-400 shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
              title="Desktop Viewport"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === "tablet" ? "bg-white/[0.1] text-amber-400 shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
              title="Tablet Viewport (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === "mobile" ? "bg-white/[0.1] text-amber-400 shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
              title="Mobile Viewport (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Edit / Preview Toggle */}
          <div className="flex items-center p-1 bg-white/[0.04] border border-white/[0.06] rounded-xl text-xs">
            <button
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === "edit" ? "bg-white/[0.1] text-amber-400 shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === "preview" ? "bg-white/[0.1] text-amber-400 shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Right: Save Status, Save Button, Publish Action */}
        <div className="flex items-center gap-2.5">
          {/* Save Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono">
            {saveStatus === "saved" && (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Saved</span>
              </span>
            )}
            {saveStatus === "unsaved" && (
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Unsaved changes</span>
              </span>
            )}
            {saveStatus === "saving" && (
              <span className="text-zinc-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-ping" />
                <span>Saving...</span>
              </span>
            )}
          </div>

          {/* Manual Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all cursor-pointer"
            title="Save Project (Cmd+S)"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>

          {/* Publish / Live Action */}
          {status === "published" ? (
            <div className="flex items-center gap-1.5">
              <Link
                href={`/p/${project.slug}`}
                target="_blank"
                className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleUnpublish}
                disabled={isPublishing}
                className="py-1.5 px-2.5 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
                title="Revert to Draft"
              >
                Unpublish
              </button>
            </div>
          ) : (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{isPublishing ? "Publishing..." : "Publish"}</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Blocks Manager (Only in Edit Mode) */}
        {viewMode === "edit" && (
          <aside className="w-64 border-r border-white/[0.08] bg-[#0d0d11] flex flex-col justify-between shrink-0 overflow-y-auto hidden sm:flex">
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] uppercase font-mono font-semibold text-zinc-400">
                  Sections ({blocks.length})
                </span>
              </div>

              {/* Blocks Tree */}
              <div className="space-y-1">
                {blocks.map((b, idx) => {
                  const isActive = b.id === activeBlockId;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setActiveBlockId(b.id)}
                      className={`group p-2 rounded-xl text-xs cursor-pointer border transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-amber-500/10 border-amber-500/40 text-white"
                          : "bg-white/[0.02] border-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-zinc-500">#{idx + 1}</span>
                        <span className="font-medium capitalize truncate">{b.type} Block</span>
                      </div>

                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(idx, "up");
                          }}
                          disabled={idx === 0}
                          className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(idx, "down");
                          }}
                          disabled={idx === blocks.length - 1}
                          className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlock(b.id);
                          }}
                          className="p-1 rounded text-zinc-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Block Menu */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1">
                <p className="text-[10px] font-mono uppercase text-zinc-500 px-1">Add Block</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => addBlock("hero")}
                    className="p-2 rounded-lg text-left bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 text-zinc-300 text-xs flex items-center gap-1.5"
                  >
                    <Layout className="w-3 h-3 text-amber-400" />
                    <span>Hero</span>
                  </button>
                  <button
                    onClick={() => addBlock("text")}
                    className="p-2 rounded-lg text-left bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 text-zinc-300 text-xs flex items-center gap-1.5"
                  >
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>Story</span>
                  </button>
                  <button
                    onClick={() => addBlock("features")}
                    className="p-2 rounded-lg text-left bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 text-zinc-300 text-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Features</span>
                  </button>
                  <button
                    onClick={() => addBlock("gallery")}
                    className="p-2 rounded-lg text-left bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 text-zinc-300 text-xs flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    <span>Gallery</span>
                  </button>
                  <button
                    onClick={() => addBlock("cta")}
                    className="col-span-2 p-2 rounded-lg text-left bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 text-zinc-300 text-xs flex items-center gap-1.5"
                  >
                    <Share2 className="w-3 h-3 text-amber-400" />
                    <span>Call to Action</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Block Inspector Properties */}
            {activeBlock && (
              <div className="p-3 border-t border-white/[0.08] bg-[#101014] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-mono font-semibold text-amber-400">
                    Edit {activeBlock.type}
                  </span>
                  <button
                    onClick={() => removeBlock(activeBlock.id)}
                    className="text-zinc-500 hover:text-rose-400 p-1"
                    title="Delete block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {activeBlock.badge !== undefined && (
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Badge / Tag</label>
                      <input
                        type="text"
                        value={activeBlock.badge || ""}
                        onChange={(e) => updateBlock(activeBlock.id, { badge: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                      />
                    </div>
                  )}

                  {activeBlock.title !== undefined && (
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Title</label>
                      <input
                        type="text"
                        value={activeBlock.title || ""}
                        onChange={(e) => updateBlock(activeBlock.id, { title: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                      />
                    </div>
                  )}

                  {activeBlock.subtitle !== undefined && (
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Subtitle</label>
                      <textarea
                        rows={2}
                        value={activeBlock.subtitle || ""}
                        onChange={(e) => updateBlock(activeBlock.id, { subtitle: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs resize-none"
                      />
                    </div>
                  )}

                  {activeBlock.content !== undefined && (
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Story Text</label>
                      <textarea
                        rows={4}
                        value={activeBlock.content || ""}
                        onChange={(e) => updateBlock(activeBlock.id, { content: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                      />
                    </div>
                  )}

                  {activeBlock.imageUrl !== undefined && (
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Image URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={activeBlock.imageUrl || ""}
                        onChange={(e) => updateBlock(activeBlock.id, { imageUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                      />
                    </div>
                  )}

                  {activeBlock.ctaText !== undefined && (
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Button Text</label>
                        <input
                          type="text"
                          value={activeBlock.ctaText || ""}
                          onChange={(e) => updateBlock(activeBlock.id, { ctaText: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Button Link</label>
                        <input
                          type="text"
                          value={activeBlock.ctaUrl || ""}
                          onChange={(e) => updateBlock(activeBlock.id, { ctaUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {activeBlock.buttonText !== undefined && (
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Button Text</label>
                        <input
                          type="text"
                          value={activeBlock.buttonText || ""}
                          onChange={(e) => updateBlock(activeBlock.id, { buttonText: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Button Link</label>
                        <input
                          type="text"
                          value={activeBlock.buttonUrl || ""}
                          onChange={(e) => updateBlock(activeBlock.id, { buttonUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-white text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Center Canvas Area: Device Frame Rendering */}
        <main className="flex-1 bg-[#050507] p-4 md:p-8 overflow-y-auto flex items-start justify-center">
          <div
            className={`transition-all duration-300 bg-[#08080a] min-h-[85vh] rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden ${
              deviceMode === "desktop"
                ? "w-full max-w-5xl"
                : deviceMode === "tablet"
                ? "w-[768px] max-w-full"
                : "w-[375px] max-w-full"
            }`}
          >
            {/* Project Blocks Render */}
            <div className="space-y-16 py-12 px-6 sm:px-10">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  onClick={() => setActiveBlockId(block.id)}
                  className={`relative transition-all rounded-2xl ${
                    viewMode === "edit"
                      ? block.id === activeBlockId
                        ? "ring-2 ring-amber-400/50 p-4 -m-4 bg-white/[0.01]"
                        : "hover:ring-1 hover:ring-white/20 p-4 -m-4 cursor-pointer"
                      : ""
                  }`}
                >
                  {/* Hero Block Render */}
                  {block.type === "hero" && (
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                      {block.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {block.badge}
                        </div>
                      )}
                      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                        {block.title}
                      </h1>
                      {block.subtitle && (
                        <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
                          {block.subtitle}
                        </p>
                      )}
                      {block.ctaText && (
                        <div className="pt-2">
                          <a
                            href={block.ctaUrl || "#"}
                            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm text-black bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 transition-all"
                          >
                            <span>{block.ctaText}</span>
                          </a>
                        </div>
                      )}
                      {block.imageUrl && (
                        <div className="mt-8 rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl aspect-video max-w-2xl mx-auto">
                          <img
                            src={block.imageUrl}
                            alt={block.title || "Hero banner"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Story / Text Block Render */}
                  {block.type === "text" && (
                    <div className="max-w-2xl mx-auto space-y-4">
                      {block.title && (
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {block.title}
                        </h2>
                      )}
                      <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-light whitespace-pre-line">
                        {block.content}
                      </p>
                    </div>
                  )}

                  {/* Feature Cards Block Render */}
                  {block.type === "features" && (
                    <div className="space-y-8">
                      <div className="text-center max-w-xl mx-auto space-y-2">
                        {block.title && (
                          <h2 className="text-2xl font-bold text-white tracking-tight">
                            {block.title}
                          </h2>
                        )}
                        {block.subtitle && (
                          <p className="text-xs sm:text-sm text-zinc-400">{block.subtitle}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(block.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-2"
                          >
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                              0{idx + 1}
                            </div>
                            <h3 className="font-semibold text-white text-sm tracking-tight">
                              {item.title}
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Block Render */}
                  {block.type === "gallery" && (
                    <div className="space-y-8">
                      <div className="text-center max-w-xl mx-auto space-y-2">
                        {block.title && (
                          <h2 className="text-2xl font-bold text-white tracking-tight">
                            {block.title}
                          </h2>
                        )}
                        {block.subtitle && (
                          <p className="text-xs sm:text-sm text-zinc-400">{block.subtitle}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {(block.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className="group rounded-2xl overflow-hidden border border-white/[0.08] bg-[#101014] shadow-sm"
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                              <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                              <span className="text-[10px] uppercase font-mono text-amber-400">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action Block Render */}
                  {block.type === "cta" && (
                    <div className="p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[#101014] to-[#101014] text-center space-y-4 max-w-2xl mx-auto">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {block.title}
                      </h2>
                      {block.subtitle && (
                        <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                          {block.subtitle}
                        </p>
                      )}
                      {block.buttonText && (
                        <div className="pt-3">
                          <a
                            href={block.buttonUrl || "#"}
                            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-semibold text-xs text-black bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/20 transition-all"
                          >
                            <span>{block.buttonText}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

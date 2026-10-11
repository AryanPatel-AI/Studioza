"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderLock,
  Plus,
  Search,
  KeyRound,
  ExternalLink,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import { VAULT_PROJECTS, VaultProject } from "@/lib/data/studioData";

interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectSlug: string;
  projectName: string;
  passcode: string;
  status: "PROOFING_OPEN" | "IN_PRINT_REVIEW" | "FINALIZED";
  selectionsMade: number;
  selectionTarget: number;
  platesCount: number;
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: "cl-1",
    name: "Private Heritage Patron",
    email: "patron@studioza.com",
    phone: "+91 98123 45678",
    projectSlug: "jaipur-royal-citadels",
    projectName: "Royal Heritage Celebration",
    passcode: "PATRON2026",
    status: "PROOFING_OPEN",
    selectionsMade: 36,
    selectionTarget: 50,
    platesCount: 428,
  },
  {
    id: "cl-2",
    name: "Private Estate Patron",
    email: "estate.patron@domain.in",
    phone: "+91 98765 43210",
    projectSlug: "bareilly-monograph-series",
    projectName: "Ancestral Estate Monograph",
    passcode: "ESTATE2026",
    status: "IN_PRINT_REVIEW",
    selectionsMade: 25,
    selectionTarget: 25,
    platesCount: 84,
  },
  {
    id: "cl-3",
    name: "Maison Jaipur Couture",
    email: "press@maisonjaipur.com",
    phone: "+91 98299 44332",
    projectSlug: "amber-couture",
    projectName: "Raw Silk & Sandstone Campaign",
    passcode: "MAISON2026",
    status: "PROOFING_OPEN",
    selectionsMade: 18,
    selectionTarget: 30,
    platesCount: 120,
  },
];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [showPasscodes, setShowPasscodes] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Client Form State
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
    projectSlug: "jaipur-royal-citadels",
    passcode: "STZ" + Math.floor(1000 + Math.random() * 9000),
    selectionTarget: 40,
  });

  const togglePasscode = (id: string) => {
    setShowPasscodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyPasscode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) return;

    const record: ClientRecord = {
      id: `cl-${Date.now()}`,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone || "+91 98000 00000",
      projectSlug: newClient.projectSlug,
      projectName: newClient.projectName || "Private Commission Monograph",
      passcode: newClient.passcode,
      status: "PROOFING_OPEN",
      selectionsMade: 0,
      selectionTarget: Number(newClient.selectionTarget) || 40,
      platesCount: 150,
    };

    setClients([record, ...clients]);
    setShowAddModal(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      projectName: "",
      projectSlug: "jaipur-royal-citadels",
      passcode: "STZ" + Math.floor(1000 + Math.random() * 9000),
      selectionTarget: 40,
    });
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.projectName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">
            PATRON ACCESS &amp; VAULT DIRECTORY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Clients &amp; Archival Vaults
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Manage private client proofing accounts, monitor monograph plate selections, and issue vault credentials.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#151515] text-[#F4F1EB] px-5 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision Client Vault</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D] block">ACTIVE VAULT PATRONS</span>
          <p className="font-serif text-4xl text-[#151515]">{clients.length}</p>
          <span className="type-micro text-emerald-700">100% Authenticated</span>
        </div>
        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D] block">PROOFING IN PROGRESS</span>
          <p className="font-serif text-4xl text-[#CC5500]">
            {clients.filter((c) => c.status === "PROOFING_OPEN").length}
          </p>
          <span className="type-micro text-[#77736D]">Open for Selections</span>
        </div>
        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D] block">IN PRINT REVIEW</span>
          <p className="font-serif text-4xl text-[#151515]">
            {clients.filter((c) => c.status === "IN_PRINT_REVIEW").length}
          </p>
          <span className="type-micro text-[#77736D]">Darkroom Production</span>
        </div>
        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D] block">ALBUM DISPATCH RATE</span>
          <p className="font-serif text-4xl text-[#151515]">100%</p>
          <span className="type-micro text-emerald-700">On-Time Monograph Delivery</span>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white p-4 border border-[#D9D5CE] flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#77736D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron by name, email, or commission..."
            className="w-full pl-9 pr-4 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
          />
        </div>

        <span className="type-meta text-xs text-[#77736D]">
          SHOWING {filteredClients.length} PATRON VAULTS
        </span>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {filteredClients.map((client) => {
          const isOpen = client.status === "PROOFING_OPEN";
          const isRevealed = !!showPasscodes[client.id];

          return (
            <div
              key={client.id}
              className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#F4F1EB]/40 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-2xl text-[#151515]">
                    {client.name}
                  </h3>
                  <span
                    className={`type-meta text-[10px] px-2.5 py-0.5 font-bold ${
                      isOpen
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {isOpen ? "PROOFING OPEN" : "IN PRINT REVIEW"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs type-meta text-[#77736D]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-[#151515]">{client.email}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{client.phone}</span>
                  </span>
                  <span>•</span>
                  <span>COMMISSION: <strong>{client.projectName}</strong></span>
                </div>

                {/* Progress bar for album target */}
                <div className="pt-2 max-w-md space-y-1">
                  <div className="flex justify-between type-meta text-[11px] text-[#77736D]">
                    <span>Monograph Selections: {client.selectionsMade} / {client.selectionTarget}</span>
                    <span>{Math.round((client.selectionsMade / client.selectionTarget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#EAE6DE] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#CC5500] h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (client.selectionsMade / client.selectionTarget) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Passcode & Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                {/* Passcode Chip */}
                <div className="bg-[#F4F1EB] border border-[#D9D5CE] px-3 py-2 flex items-center gap-2 type-meta text-xs">
                  <KeyRound className="w-3.5 h-3.5 text-[#CC5500]" />
                  <span className="text-[#77736D]">PASSCODE:</span>
                  <span className="font-mono text-[#151515] font-bold">
                    {isRevealed ? client.passcode : "••••••••"}
                  </span>
                  <button
                    onClick={() => togglePasscode(client.id)}
                    className="text-[#77736D] hover:text-[#151515] p-0.5 ml-1"
                    title={isRevealed ? "Hide code" : "Reveal code"}
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => copyPasscode(client.id, client.passcode)}
                    className="text-[#77736D] hover:text-[#151515] p-0.5"
                    title="Copy passcode"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedId === client.id && (
                    <span className="text-[10px] text-emerald-600 font-semibold">COPIED</span>
                  )}
                </div>

                {/* Inspect Link */}
                <Link
                  href={`/vault/project/${client.projectSlug}`}
                  target="_blank"
                  className="bg-[#151515] text-[#F4F1EB] px-4 py-2 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-1.5"
                >
                  <span>Inspect Vault</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROVISION NEW CLIENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6">
          <div className="bg-white border border-[#151515] max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
            <div className="border-b border-[#D9D5CE] pb-4">
              <span className="type-meta text-xs text-[#77736D] block">
                ATELIER CLIENT PROVISIONING
              </span>
              <h2 className="font-serif text-3xl text-[#151515]">
                Provision Client Proofing Vault
              </h2>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                  PATRON FULL NAME(S)
                </label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="e.g. Private Heritage Patron"
                  className="w-full px-3 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                    CONTACT EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full px-3 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
                  />
                </div>
                <div>
                  <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                    CONTACT PHONE
                  </label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+91 98123 45678"
                    className="w-full px-3 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
                  />
                </div>
              </div>

              <div>
                <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                  COMMISSION PROJECT NAME
                </label>
                <input
                  type="text"
                  value={newClient.projectName}
                  onChange={(e) => setNewClient({ ...newClient, projectName: e.target.value })}
                  placeholder="e.g. Udaipur Lake Monograph"
                  className="w-full px-3 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                    INITIAL ARCHIVAL PASSCODE
                  </label>
                  <input
                    type="text"
                    required
                    value={newClient.passcode}
                    onChange={(e) => setNewClient({ ...newClient, passcode: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D9D5CE] font-mono text-sm focus:outline-none focus:border-[#151515]"
                  />
                </div>
                <div>
                  <label className="block type-meta text-[11px] text-[#77736D] mb-1">
                    ALBUM TARGET SELECTIONS
                  </label>
                  <input
                    type="number"
                    value={newClient.selectionTarget}
                    onChange={(e) => setNewClient({ ...newClient, selectionTarget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#D9D5CE] text-sm focus:outline-none focus:border-[#151515]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-[#D9D5CE]">
                <button
                  type="submit"
                  className="flex-1 bg-[#151515] text-[#F4F1EB] py-3 type-meta text-xs hover:bg-[#333333] transition-colors"
                >
                  Create &amp; Issue Vault Credentials
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="border border-[#D9D5CE] px-5 py-3 type-meta text-xs hover:bg-[#F4F1EB] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

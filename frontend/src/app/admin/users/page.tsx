"use client";

import React, { useState } from "react";
import { Plus, Shield, Trash2, UserPlus } from "lucide-react";

interface StudioUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "PHOTOGRAPHER";
  assignedMonographs: number;
}

const INITIAL_USERS: StudioUser[] = [
  { id: "usr-1", name: "Aryan Patel", email: "aryan@studioza.atelier", role: "ADMIN", assignedMonographs: 12 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<StudioUser[]>(INITIAL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"ADMIN" | "EDITOR" | "PHOTOGRAPHER">("PHOTOGRAPHER");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StudioUser = {
      id: `usr-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      assignedMonographs: 0,
    };
    setUsers([...users, created]);
    setNewName("");
    setNewEmail("");
    setShowAdd(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">TEAM &amp; ROLES</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Atelier Users &amp; Permissions
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Manage authenticated creators with role-based access control (Admin, Editor, Photographer).
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAdd(!showAdd)}
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{showAdd ? "Cancel" : "Add Team Member"}</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white p-8 border border-[#D9D5CE] space-y-4 animate-in fade-in duration-300">
          <h3 className="font-serif text-2xl text-[#151515]">Invite Collaborator</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-white"
            >
              <option value="PHOTOGRAPHER">Role: Photographer</option>
              <option value="EDITOR">Role: Editor</option>
              <option value="ADMIN">Role: Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors"
          >
            Send Invite &amp; Grant Access
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#151515] text-[#F4F1EB] font-serif text-lg flex items-center justify-center">
                {u.name[0]}
              </div>
              <div>
                <span className="font-serif text-2xl text-[#151515] block">{u.name}</span>
                <span className="type-small text-[#77736D]">{u.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="type-meta text-xs text-[#77736D]">
                {u.assignedMonographs} Monographs Active
              </span>

              <span
                className={`type-meta text-[10px] px-3 py-1 font-bold ${
                  u.role === "ADMIN"
                    ? "bg-[#CC5500] text-white"
                    : u.role === "EDITOR"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-[#F4F1EB] text-[#151515] border border-[#D9D5CE]"
                }`}
              >
                {u.role}
              </span>

              {u.role !== "ADMIN" && (
                <button
                  type="button"
                  onClick={() => setUsers(users.filter((item) => item.id !== u.id))}
                  className="text-rose-700 hover:text-rose-900 p-1"
                  title="Remove user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

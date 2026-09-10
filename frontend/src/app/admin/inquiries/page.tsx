"use client";

import { useEffect, useState } from "react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setInquiries(data);
      });
  }, []);

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "NEW" ? "CONTACTED" : "NEW";
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    
    if (res.ok) {
      setInquiries(inquiries.map((inq) => inq.id === id ? { ...inq, status: newStatus } : inq));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Inquiries</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((inq) => (
              <tr key={inq.id} className={inq.status === "NEW" ? "bg-blue-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{inq.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inq.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{inq.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => updateStatus(inq.id, inq.status)}
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${inq.status === "NEW" ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {inq.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-gray-500">No inquiries found.</div>
        )}
      </div>
    </div>
  );
}

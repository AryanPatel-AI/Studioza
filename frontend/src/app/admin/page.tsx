import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const totalInquiries = await prisma.inquiry.count();
  const newInquiries = await prisma.inquiry.count({ where: { status: "NEW" } });
  const totalServices = await prisma.service.count();
  const totalPortfolioItems = await prisma.portfolioItem.count();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Inquiries</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalInquiries}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">New Inquiries</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{newInquiries}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Services</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalServices}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Portfolio Items</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalPortfolioItems}</p>
        </div>
      </div>
    </div>
  );
}

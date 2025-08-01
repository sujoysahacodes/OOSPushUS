"use client";

import React from "react";
import { useABCOOSStore } from "@/stores/oosStore";
import Card from "@/components/dashboard/Card";
import { FaExchangeAlt, FaBoxOpen, FaWarehouse, FaTruck } from "react-icons/fa";

const ABCDashboard: React.FC = () => {

  const { products, warehouses, wholesalers, changeRequests, shipmentPlans, setShipmentPlans } = useABCOOSStore();

  // Local state for request status
  const [requestStatus, setRequestStatus] = React.useState<Record<string, 'pending' | 'approved' | 'rejected'>>({});
  const [showNewRequest, setShowNewRequest] = React.useState(false);

  // Approve/Reject handlers
  const handleApprove = (id: string) => setRequestStatus((s) => ({ ...s, [id]: 'approved' }));
  const handleReject = (id: string) => setRequestStatus((s) => ({ ...s, [id]: 'rejected' }));

  // Simple shipment optimization: allocate from warehouses in order until request is fulfilled or inventory runs out
  React.useEffect(() => {
    const plans: any[] = [];
    changeRequests.forEach((req) => {
      let qtyNeeded = req.requestedQty;
      for (const wh of warehouses) {
        const whQty = wh.inventory[req.productId] ?? 0;
        if (whQty > 0 && qtyNeeded > 0) {
          const allocated = Math.min(whQty, qtyNeeded);
          plans.push({
            requestId: req.id,
            warehouseId: wh.id,
            wholesalerId: req.wholesalerId,
            productId: req.productId,
            allocatedQty: allocated,
          });
          qtyNeeded -= allocated;
        }
      }
    });
    setShipmentPlans(plans);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeRequests, warehouses]);

  // Summary values
  const totalRequests = changeRequests.length;
  const totalProducts = products.length;
  const totalWarehouses = warehouses.length;
  const totalAllocated = shipmentPlans.reduce((sum, s) => sum + s.allocatedQty, 0);

  return (
    <div className="p-4 md:p-8 space-y-10 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-900 tracking-tight">ABC OOS Scenario Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card title="Change Requests" value={totalRequests} icon={<FaExchangeAlt />} />
        <Card title="Products" value={totalProducts} icon={<FaBoxOpen />} />
        <Card title="Warehouses" value={totalWarehouses} icon={<FaWarehouse />} />
        <Card title="Total Allocated" value={totalAllocated} icon={<FaTruck />} />
      </div>

      {/* Change Requests Table with Actions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-blue-800">Incoming Change Requests</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => setShowNewRequest(true)}
          >
            + New Request
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full border text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-3 py-2">Wholesaler</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Requested Qty</th>
                <th className="border px-3 py-2">Source</th>
                <th className="border px-3 py-2">Received At</th>
                <th className="border px-3 py-2">Actions</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {changeRequests.map((req) => {
                const wholesaler = wholesalers.find((h) => h.id === req.wholesalerId)?.name || req.wholesalerId;
                const product = products.find((p) => p.id === req.productId)?.name || req.productId;
                const status = requestStatus[req.id] || 'pending';
                return (
                  <tr key={req.id} className="hover:bg-blue-50 transition">
                    <td className="border px-3 py-2">{wholesaler}</td>
                    <td className="border px-3 py-2">{product}</td>
                    <td className="border px-3 py-2">{req.requestedQty}</td>
                    <td className="border px-3 py-2">{req.source}</td>
                    <td className="border px-3 py-2">{new Date(req.receivedAt).toLocaleString()}</td>
                    <td className="border px-3 py-2 space-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold disabled:opacity-50"
                        onClick={() => handleApprove(req.id)}
                        disabled={status !== 'pending'}
                      >Approve</button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold disabled:opacity-50"
                        onClick={() => handleReject(req.id)}
                        disabled={status !== 'pending'}
                      >Reject</button>
                    </td>
                    <td className="border px-3 py-2">
                      {status === 'pending' && <span className="text-yellow-600 font-medium">Pending</span>}
                      {status === 'approved' && <span className="text-green-700 font-bold">Approved</span>}
                      {status === 'rejected' && <span className="text-red-700 font-bold">Rejected</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* New Request Modal Placeholder */}
        {showNewRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Create New Change Request</h3>
              <div className="text-gray-500 mb-4">(Form coming soon...)</div>
              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setShowNewRequest(false)}
              >Close</button>
            </div>
          </div>
        )}
      </section>

      {/* Inventory by Warehouse Table */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-blue-800 mt-10">Warehouse Inventory</h2>
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full border text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-3 py-2">Warehouse</th>
                {products.map((p) => (
                  <th key={p.id} className="border px-3 py-2">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w) => (
                <tr key={w.id} className="hover:bg-blue-50 transition">
                  <td className="border px-3 py-2 font-medium">{w.name}</td>
                  {products.map((p) => (
                    <td key={p.id} className="border px-3 py-2">{w.inventory[p.id] ?? 0}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipment Plan Table */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-blue-800 mt-10">Shipment Plan</h2>
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full border text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-3 py-2">Request</th>
                <th className="border px-3 py-2">Wholesaler</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Warehouse</th>
                <th className="border px-3 py-2">Allocated Qty</th>
              </tr>
            </thead>
            <tbody>
              {shipmentPlans.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-2 text-gray-500">No shipment plan available</td></tr>
              ) : (
                shipmentPlans.map((plan, idx) => {
                  const wholesaler = wholesalers.find((h) => h.id === plan.wholesalerId)?.name || plan.wholesalerId;
                  const product = products.find((p) => p.id === plan.productId)?.name || plan.productId;
                  const warehouse = warehouses.find((w) => w.id === plan.warehouseId)?.name || plan.warehouseId;
                  return (
                    <tr key={idx} className="hover:bg-blue-50 transition">
                      <td className="border px-3 py-2">{plan.requestId}</td>
                      <td className="border px-3 py-2">{wholesaler}</td>
                      <td className="border px-3 py-2">{product}</td>
                      <td className="border px-3 py-2">{warehouse}</td>
                      <td className="border px-3 py-2">{plan.allocatedQty}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ABCDashboard;

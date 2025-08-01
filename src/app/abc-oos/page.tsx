import dynamic from "next/dynamic";

const ABCDashboard = dynamic(() => import("@/components/ABCDashboard"), { ssr: false });

export default function ABCOOSPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ABCDashboard />
    </main>
  );
}

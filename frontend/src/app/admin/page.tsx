

import SideBar from "./LayoutAdmin";

export default function AdminDashboard() {
  return (
    <SideBar>
      <h2 className="text-xl font-semibold mb-4">Admin Rules</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Jangan membagikan informasi sensitif ke pihak luar.</li>
        <li>Patuhi protokol keamanan sistem.</li>
        <li>Backup data secara rutin.</li>
        <li>Jaga kerahasiaan password.</li>
        <li>Laporan segala aktivitas mencurigakan.</li>
      </ul>
    </SideBar>
  );
}

import AdminLayout from '../LayoutAdmin';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="bg-dark-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Application Settings</h3>
        <p className="mt-2">Modify application configurations.</p>
      </div>
    </AdminLayout>
  );
}
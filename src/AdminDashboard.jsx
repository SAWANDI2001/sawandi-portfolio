import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    skills: 0,
  });

  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
          return;
        }

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStats(data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">
              Portfolio <span className="text-cyan-400">Admin</span>
            </h1>

            <p className="text-sm text-slate-400">Admin Dashboard</p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <p className="text-cyan-400">Welcome back</p>

          <h2 className="mt-2 text-4xl font-bold">Dashboard</h2>

          <p className="mt-3 text-slate-400">
            Manage your portfolio content from here.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Projects</p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              {loading ? "..." : stats.projects}
            </h3>

            <p className="mt-2 text-sm text-slate-500">Portfolio projects</p>
          </div>

          {/* Messages */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Messages</p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              {loading ? "..." : stats.messages}
            </h3>

            <p className="mt-2 text-sm text-slate-500">Contact messages</p>
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Skills</p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              {loading ? "..." : stats.skills}
            </h3>

            <p className="mt-2 text-sm text-slate-500">Technical skills</p>
          </div>
        </div>

        {/* Management */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">Projects</h3>

            <p className="mt-3 leading-7 text-slate-400">
              Add, edit and delete projects displayed on your portfolio.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/admin/projects";
              }}
              className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Manage Projects
            </button>
          </div>

          {/* Messages */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">Messages</h3>

            <p className="mt-3 leading-7 text-slate-400">
              View messages submitted through your portfolio contact form.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/admin/messages";
              }}
              className="mt-6 rounded-lg border border-cyan-400 px-5 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              View Messages
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

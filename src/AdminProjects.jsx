import { useEffect, useState } from "react";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    github: "",
    liveDemo: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        setProjects(data);
      } catch (error) {
        console.error("Projects error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    setFormLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to add project");
      }

      setProjects((prevProjects) => [...prevProjects, data]);

      setFormData({
        title: "",
        description: "",
        technologies: "",
        image: "",
        github: "",
        liveDemo: "",
      });

      setShowForm(false);

      alert("Project added successfully!");
    } catch (error) {
      console.error("Add project error:", error);
      alert(error.message || "Failed to add project");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      image: project.image || "",
      github: project.github || "",
      liveDemo: project.liveDemo || "",
    });

    setShowForm(false);
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
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
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId),
      );

      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Delete project error:", error);
      alert(error.message || "Failed to delete project");
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (!editingProject) return;

    setEditLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${editingProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            ...formData,
            technologies: formData.technologies
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== ""),
          }),
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === data._id ? data : project,
        ),
      );

      setEditingProject(null);

      setFormData({
        title: "",
        description: "",
        technologies: "",
        image: "",
        github: "",
        liveDemo: "",
      });

      alert("Project updated successfully!");
    } catch (error) {
      console.error("Update project error:", error);
      alert(error.message || "Failed to update project");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">
              Portfolio <span className="text-cyan-400">Admin</span>
            </h1>

            <p className="text-sm text-slate-400">Project Management</p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/admin/dashboard";
            }}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            ← Dashboard
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-cyan-400">Portfolio Content</p>

            <h2 className="mt-2 text-4xl font-bold">Manage Projects</h2>

            <p className="mt-3 text-slate-400">
              View and manage your portfolio projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {showForm ? "Close Form" : "+ Add Project"}
          </button>
        </div>

        {editingProject && (
          <div className="mb-10 rounded-2xl border border-cyan-500/30 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400">Project Management</p>

                <h3 className="mt-1 text-2xl font-bold">Edit Project</h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-sm text-slate-400 hover:text-red-400"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleUpdateProject} className="mt-6 grid gap-5">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project title"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description"
                rows="4"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Technologies (React, Node.js, MongoDB)"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image path"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="url"
                name="liveDemo"
                value={formData.liveDemo}
                onChange={handleChange}
                placeholder="Live Demo URL"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={editLoading}
                className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {editLoading ? "Updating..." : "Update Project"}
              </button>
            </form>
          </div>
        )}

        {showForm && (
          <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">Add New Project</h3>

            <form onSubmit={handleAddProject} className="mt-6 grid gap-5">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project title"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description"
                rows="4"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Technologies (HTML, CSS, React)"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image path (/projects/example.jpeg)"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="url"
                name="liveDemo"
                value={formData.liveDemo}
                onChange={handleChange}
                placeholder="Live Demo URL"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={formLoading}
                className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {formLoading ? "Adding..." : "Add Project"}
              </button>
            </form>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        )}

        {/* No projects */}
        {!loading && projects.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">No projects available.</p>
          </div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-slate-800">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-4xl font-bold text-cyan-400">
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((technology, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-slate-400 hover:text-cyan-400"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-slate-400 hover:text-cyan-400"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditClick(project)}
                      className="flex-1 rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project._id)}
                      className="flex-1 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminProjects;

import { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // Invalid or expired token
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch messages");
        }

        setMessages(data);
      } catch (error) {
        console.error("Messages error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      // Invalid or expired token
      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId),
      );

      alert("Message deleted successfully!");
    } catch (error) {
      console.error("Delete message error:", error);
      alert(error.message || "Failed to delete message");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString();
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

            <p className="text-sm text-slate-400">Message Management</p>
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
        <div className="mb-10">
          <p className="text-cyan-400">Portfolio Communication</p>

          <h2 className="mt-2 text-4xl font-bold">Messages</h2>

          <p className="mt-3 text-slate-400">
            View and manage messages received from your portfolio contact form.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">Loading messages...</p>
          </div>
        )}

        {/* No messages */}
        {!loading && messages.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <div className="text-5xl">✉️</div>

            <h3 className="mt-4 text-xl font-semibold">No messages yet</h3>

            <p className="mt-2 text-slate-400">
              Messages submitted through your contact form will appear here.
            </p>
          </div>
        )}

        {/* Messages */}
        {!loading && messages.length > 0 && (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  {/* Message Details */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {message.name}
                        </h3>

                        <p className="mt-1 text-sm text-cyan-400">
                          {message.email}
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>

                    {/* Message */}
                    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(message._id)}
                    className="rounded-lg border border-red-500 px-5 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminMessages;

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle2,
  Clock3,
  CircleDot,
  ListTodo,
  CalendarClock,
  LayoutDashboard,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/home/HomeNavbar";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/taskModal";
import EditTaskModal from "../components/EditTaskModal";

/* =========================================================
   CIRCULAR PROGRESS
========================================================= */

const CircularProgress = ({ percentage, size = 160, stroke = 12 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const safePercentage = Math.min(100, Math.max(0, percentage));

  const offset = circumference - (safePercentage / 100) * circumference;

  return (
    <div
      className="
                relative
                flex
                items-center
                justify-center
                shrink-0
            "
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="
                        text-slate-200
                        dark:text-slate-800
                    "
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="
                        text-indigo-600
                        dark:text-indigo-400
                    "
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      </svg>

      <div
        className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                "
      >
        <span
          className="
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                    "
        >
          {safePercentage}%
        </span>

        <span
          className="
                        mt-0.5
                        text-xs
                        font-medium
                        text-slate-500
                        dark:text-slate-400
                    "
        >
          Complete
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   MONITORING ITEM
========================================================= */

const MonitoringItem = ({
  icon: Icon,
  title,
  value,
  percentage,
  iconClass,
  barClass,
}) => {
  return (
    <div
      className="
                rounded-2xl
                border
                border-slate-100
                dark:border-slate-800
                bg-slate-50/70
                dark:bg-slate-950/50
                p-4
            "
    >
      <div
        className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
      >
        <div className="flex items-center gap-3">
          <div
            className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${iconClass}
                        `}
          >
            <Icon size={18} />
          </div>

          <div>
            <p
              className="
                                text-sm
                                font-semibold
                                text-slate-700
                                dark:text-slate-300
                            "
            >
              {title}
            </p>

            <p
              className="
                                mt-0.5
                                text-xs
                                text-slate-400
                            "
            >
              {percentage}% of total
            </p>
          </div>
        </div>

        <span
          className="
                        text-xl
                        font-extrabold
                        text-slate-900
                        dark:text-white
                    "
        >
          {value}
        </span>
      </div>

      <div
        className="
                    mt-3
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-800
                "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 0.8,
          }}
          className={`
                        h-full
                        rounded-full
                        ${barClass}
                    `}
        />
      </div>
    </div>
  );
};

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [showFilters, setShowFilters] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [deletingTaskId, setDeletingTaskId] = useState(null);

  /* =====================================================
       FETCH TASKS
    ===================================================== */

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      console.log("TASK API RESPONSE:", response.data);

      /*
       * IMPORTANT:
       * Backend returns:
       * response.data.tasks
       */
      setTasks(Array.isArray(response.data?.tasks) ? response.data.tasks : []);
    } catch (err) {
      console.error("Fetch Tasks Error:", err);

      setTasks([]);

      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* =====================================================
       CLOSE PROFILE MENU
    ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =====================================================
       STATISTICS
    ===================================================== */

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  const productivity =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const pendingPercentage =
    totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;

  const progressPercentage =
    totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;

  const completedPercentage = productivity;

  const highPriorityPercentage =
    totalTasks > 0 ? Math.round((highPriorityTasks / totalTasks) * 100) : 0;

  /* =====================================================
       DUE SOON
    ===================================================== */

  const dueSoonTasks = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      if (!task.due_date || task.status === "Completed") {
        return false;
      }

      const dueDate = new Date(task.due_date);

      dueDate.setHours(0, 0, 0, 0);

      const difference = dueDate.getTime() - today.getTime();

      const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

      return daysRemaining >= 0 && daysRemaining <= 7;
    });
  }, [tasks]);

  /* =====================================================
       FILTER + SEARCH + SORT
    ===================================================== */

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.status?.toLowerCase().includes(query) ||
        task.priority?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      if (sortBy === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      }

      if (sortBy === "dueSoon") {
        if (!a.due_date) return 1;

        if (!b.due_date) return -1;

        return new Date(a.due_date) - new Date(b.due_date);
      }

      if (sortBy === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  /* =====================================================
       CLEAR FILTERS
    ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("newest");
  };

  const filtersActive =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    sortBy !== "newest";

  /* =====================================================
       EDIT
    ===================================================== */

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  /* =====================================================
       DELETE
    ===================================================== */

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingTaskId(taskId);

      await api.delete(`/tasks/${taskId}`);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
    } catch (err) {
      console.error("Delete Task Error:", err);

      alert(err.response?.data?.message || "Failed to delete task.");
    } finally {
      setDeletingTaskId(null);
    }
  };

  /* =====================================================
       LOGOUT
    ===================================================== */

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  /* =====================================================
       RENDER
    ===================================================== */

  return (
    <div
      className="
                min-h-screen
                bg-slate-50
                dark:bg-slate-950
                text-slate-900
                dark:text-white
                transition-colors
                duration-300
            "
    >
      <Navbar />

      {/* =================================================
                MAIN
            ================================================= */}

      <main
        className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-8
                    sm:px-8
                    lg:py-10
                "
      >
        {/* =================================================
                    WELCOME
                ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
                        mb-8
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
        >
          <div>
            <div
              className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.15em]
                                text-indigo-600
                                dark:text-indigo-400
                            "
            >
              <LayoutDashboard size={14} />
              Your Workspace
            </div>

            <h1
              className="
        text-3xl
        font-extrabold
        tracking-tight
        text-slate-900
        dark:text-white
        sm:text-4xl
    "
            >
              {(() => {
                const hour = new Date().getHours();

                let greeting = "Good morning";

                if (hour >= 12 && hour < 17) {
                  greeting = "Good afternoon";
                } else if (hour >= 17 && hour < 21) {
                  greeting = "Good evening";
                } else if (hour >= 21 || hour < 5) {
                  greeting = "Good night";
                }

                return greeting;
              })()}
              , {user?.name?.split(" ")[0] || "there"} 👋
            </h1>

            <p
              className="
                                mt-2
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                                sm:text-base
                            "
            >
              Monitor your work, track progress and stay organized.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTaskModalOpen(true)}
            className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            py-3
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-indigo-500/20
                            transition
                            hover:bg-indigo-700
                            hover:shadow-xl
                            active:scale-95
                        "
          >
            <Plus size={18} />
            New Task
          </button>
        </motion.div>

        {/* =================================================
                    MONITORING PANEL
                ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
                        mb-6
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-900
                        shadow-sm
                    "
        >
          <div
            className="
                            grid
                            lg:grid-cols-[270px_1fr]
                        "
          >
            {/* PROGRESS */}

            <div
              className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                border-b
                                border-slate-100
                                dark:border-slate-800
                                p-7
                                lg:border-b-0
                                lg:border-r
                            "
            >
              <div
                className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    text-slate-400
                                "
              >
                <TrendingUp size={14} />
                Productivity
              </div>

              <CircularProgress percentage={productivity} />

              <p
                className="
                                    mt-4
                                    text-center
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
              >
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>

            {/* MONITORING DATA */}

            <div
              className="
                                p-5
                                sm:p-6
                            "
            >
              <div
                className="
                                    mb-5
                                    flex
                                    items-center
                                    justify-between
                                "
              >
                <div>
                  <h2
                    className="
                                            text-lg
                                            font-bold
                                            text-slate-900
                                            dark:text-white
                                        "
                  >
                    Task Monitoring
                  </h2>

                  <p
                    className="
                                            mt-1
                                            text-xs
                                            text-slate-400
                                        "
                  >
                    Live overview of your current workload
                  </p>
                </div>

                <div
                  className="
                                        hidden
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-emerald-50
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-semibold
                                        text-emerald-600
                                        dark:bg-emerald-950/30
                                        dark:text-emerald-400
                                        sm:flex
                                    "
                >
                  <span
                    className="
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-emerald-500
                                        "
                  />
                  Live
                </div>
              </div>

              <div
                className="
                                    grid
                                    gap-3
                                    sm:grid-cols-2
                                    xl:grid-cols-3
                                "
              >
                <MonitoringItem
                  icon={CircleDot}
                  title="Pending"
                  value={pendingTasks}
                  percentage={pendingPercentage}
                  iconClass="
                                        bg-amber-50
                                        text-amber-600
                                        dark:bg-amber-950/40
                                        dark:text-amber-400
                                    "
                  barClass="
                                        bg-amber-500
                                    "
                />

                <MonitoringItem
                  icon={Clock3}
                  title="In Progress"
                  value={inProgressTasks}
                  percentage={progressPercentage}
                  iconClass="
                                        bg-blue-50
                                        text-blue-600
                                        dark:bg-blue-950/40
                                        dark:text-blue-400
                                    "
                  barClass="
                                        bg-blue-500
                                    "
                />

                <MonitoringItem
                  icon={CheckCircle2}
                  title="Completed"
                  value={completedTasks}
                  percentage={completedPercentage}
                  iconClass="
                                        bg-emerald-50
                                        text-emerald-600
                                        dark:bg-emerald-950/40
                                        dark:text-emerald-400
                                    "
                  barClass="
                                        bg-emerald-500
                                    "
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* =================================================
                    QUICK METRICS
                ================================================= */}

        <div
          className="
                        mb-8
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
        >
          {/* Total */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="
                            rounded-2xl
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-slate-900
                            p-5
                            shadow-sm
                            transition
                            hover:shadow-lg
                        "
          >
            <div
              className="
                                flex
                                items-center
                                justify-between
                            "
            >
              <div>
                <p
                  className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                >
                  Total Tasks
                </p>

                <p
                  className="
                                        mt-1
                                        text-3xl
                                        font-extrabold
                                        text-slate-900
                                        dark:text-white
                                    "
                >
                  {totalTasks}
                </p>
              </div>

              <div
                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-indigo-50
                                    text-indigo-600
                                    dark:bg-indigo-950/40
                                    dark:text-indigo-400
                                "
              >
                <ListTodo size={20} />
              </div>
            </div>

            <p
              className="
                                mt-4
                                text-xs
                                text-slate-400
                            "
            >
              All tasks in your workspace
            </p>
          </motion.div>

          {/* High Priority */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="
                            rounded-2xl
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-slate-900
                            p-5
                            shadow-sm
                            transition
                            hover:shadow-lg
                        "
          >
            <div
              className="
                                flex
                                items-center
                                justify-between
                            "
            >
              <div>
                <p
                  className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                >
                  High Priority
                </p>

                <p
                  className="
                                        mt-1
                                        text-3xl
                                        font-extrabold
                                        text-slate-900
                                        dark:text-white
                                    "
                >
                  {highPriorityTasks}
                </p>
              </div>

              <div
                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-50
                                    text-red-600
                                    dark:bg-red-950/40
                                    dark:text-red-400
                                "
              >
                <AlertCircle size={20} />
              </div>
            </div>

            <p
              className="
                                mt-4
                                text-xs
                                text-slate-400
                            "
            >
              {highPriorityPercentage}% of your tasks
            </p>
          </motion.div>

          {/* Due Soon */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="
                            rounded-2xl
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-slate-900
                            p-5
                            shadow-sm
                            transition
                            hover:shadow-lg
                        "
          >
            <div
              className="
                                flex
                                items-center
                                justify-between
                            "
            >
              <div>
                <p
                  className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                >
                  Due Soon
                </p>

                <p
                  className="
                                        mt-1
                                        text-3xl
                                        font-extrabold
                                        text-slate-900
                                        dark:text-white
                                    "
                >
                  {dueSoonTasks.length}
                </p>
              </div>

              <div
                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-orange-50
                                    text-orange-600
                                    dark:bg-orange-950/40
                                    dark:text-orange-400
                                "
              >
                <CalendarClock size={20} />
              </div>
            </div>

            <p
              className="
                                mt-4
                                text-xs
                                text-slate-400
                            "
            >
              Due within the next 7 days
            </p>
          </motion.div>
        </div>

        {/* =================================================
                    TASK HEADER
                ================================================= */}

        <section
          className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-900
                        shadow-sm
                    "
        >
          <div
            className="
                            border-b
                            border-slate-100
                            dark:border-slate-800
                            p-5
                            sm:p-6
                        "
          >
            <div
              className="
                                flex
                                flex-col
                                gap-4
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
            >
              <div>
                <h2
                  className="
                                        text-xl
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                >
                  My Tasks
                </h2>

                <p
                  className="
                                        mt-1
                                        text-sm
                                        text-slate-400
                                    "
                >
                  Manage and track your work
                </p>
              </div>

              <div
                className="
                                    relative
                                    w-full
                                    lg:w-80
                                "
              >
                <Search
                  size={18}
                  className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-200
                                        dark:border-slate-700
                                        bg-slate-50
                                        dark:bg-slate-950
                                        pl-10
                                        pr-4
                                        text-sm
                                        text-slate-900
                                        dark:text-white
                                        placeholder:text-slate-400
                                        outline-none
                                        transition
                                        focus:border-indigo-500
                                        focus:ring-4
                                        focus:ring-indigo-500/10
                                    "
                />
              </div>
            </div>

            {/* FILTER BAR */}

            <div
              className="
                                mt-5
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            "
            >
              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-900
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    dark:text-slate-300
                                    transition
                                    hover:border-indigo-300
                                    hover:text-indigo-600
                                    dark:hover:border-indigo-700
                                "
              >
                <SlidersHorizontal size={16} />
                Filters
                {filtersActive && (
                  <span
                    className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-indigo-600
                                        "
                  />
                )}
              </button>

              {/* SORT */}

              <div className="relative">
                <ArrowUpDown
                  size={16}
                  className="
                                        pointer-events-none
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                                        appearance-none
                                        rounded-xl
                                        border
                                        border-slate-200
                                        dark:border-slate-700
                                        bg-white
                                        dark:bg-slate-900
                                        py-2.5
                                        pl-9
                                        pr-9
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        dark:text-slate-300
                                        outline-none
                                    "
                >
                  <option value="newest">Newest</option>

                  <option value="oldest">Oldest</option>

                  <option value="dueSoon">Due Soon</option>

                  <option value="priority">Priority</option>
                </select>
              </div>

              {/* FILTERS */}

              {showFilters && (
                <>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-slate-900
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                            dark:text-slate-300
                                            outline-none
                                        "
                  >
                    <option value="All">All Status</option>

                    <option value="Pending">Pending</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Completed">Completed</option>
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="
                                            rounded-xl
                                            border
                                            border-slate-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-slate-900
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                            dark:text-slate-300
                                            outline-none
                                        "
                  >
                    <option value="All">All Priority</option>

                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>
                  </select>

                  {filtersActive && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                text-xs
                                                font-semibold
                                                text-indigo-600
                                                dark:text-indigo-400
                                                hover:bg-indigo-50
                                                dark:hover:bg-indigo-950/30
                                            "
                    >
                      Clear
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* =================================================
                        TASK CONTENT
                    ================================================= */}

          <div className="p-5 sm:p-6">
            {/* ERROR */}

            {error && (
              <div
                className="
                                    mb-5
                                    rounded-xl
                                    border
                                    border-red-200
                                    dark:border-red-900/60
                                    bg-red-50
                                    dark:bg-red-950/30
                                    px-4
                                    py-3
                                "
              >
                <div
                  className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                >
                  <AlertCircle
                    size={17}
                    className="
                                            text-red-500
                                        "
                  />

                  <p
                    className="
                                            text-sm
                                            font-medium
                                            text-red-600
                                            dark:text-red-400
                                        "
                  >
                    {error}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchTasks}
                  className="
                                        mt-3
                                        text-xs
                                        font-bold
                                        text-red-600
                                        underline
                                        dark:text-red-400
                                    "
                >
                  Try again
                </button>
              </div>
            )}

            {/* LOADING */}

            {loading ? (
              <div
                className="
                                    flex
                                    min-h-[280px]
                                    flex-col
                                    items-center
                                    justify-center
                                "
              >
                <div
                  className="
                                        h-8
                                        w-8
                                        animate-spin
                                        rounded-full
                                        border-2
                                        border-slate-200
                                        border-t-indigo-600
                                        dark:border-slate-700
                                        dark:border-t-indigo-400
                                    "
                />

                <p
                  className="
                                        mt-4
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                >
                  Loading your tasks...
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              /* EMPTY */

              <div
                className="
                                    flex
                                    min-h-[300px]
                                    flex-col
                                    items-center
                                    justify-center
                                    text-center
                                "
              >
                <div
                  className="
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-slate-100
                                        dark:bg-slate-800
                                        text-slate-400
                                    "
                >
                  <ListTodo size={28} />
                </div>

                <h3
                  className="
                                        mt-5
                                        text-lg
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                >
                  {filtersActive ? "No matching tasks" : "No tasks yet"}
                </h3>

                <p
                  className="
                                        mt-2
                                        max-w-sm
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                >
                  {filtersActive
                    ? "Try changing your search or filters."
                    : "Create your first task to get started."}
                </p>

                {!filtersActive && (
                  <button
                    type="button"
                    onClick={() => setIsTaskModalOpen(true)}
                    className="
                                            mt-5
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-indigo-600
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            hover:bg-indigo-700
                                        "
                  >
                    <Plus size={17} />
                    Create Task
                  </button>
                )}
              </div>
            ) : (
              /* TASK GRID */

              <div
                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    md:grid-cols-2
                                    xl:grid-cols-3
                                "
              >
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.04,
                    }}
                    className={
                      deletingTaskId === task.id
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    <TaskCard
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onTaskUpdated={fetchTasks}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* =================================================
                CREATE TASK MODAL
            ================================================= */}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskCreated={fetchTasks}
      />

      {/* =================================================
                EDIT TASK MODAL
            ================================================= */}

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        task={selectedTask}
        onTaskUpdated={fetchTasks}
      />
    </div>
  );
};

export default Dashboard;

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    AlertCircle,
    Camera,
    CheckCircle2,
    Loader2,
    Pencil,
    Save,
    Trash2,
    UserCircle2,
    X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileView from "../components/profile/ProfileView";
import ProfileForm from "../components/profile/ProfileForm";
import Navbar from "../components/home/HomeNavbar";

const EMPTY_PROFILE = {
    id: "",
    name: "",
    email: "",
    bio: "",
    job_title: "",
    location: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    skills: "",
    experience_level: "",
    company: "",
    department: "",
    employment_type: "",
    work_mode: "",
    preferred_location: "",
    availability: "",
    profile_image: "",
    created_at: "",
};

const Profile = () => {
    const navigate = useNavigate();

    const {
        user,
        setUser,
    } = useAuth();

    const fileInputRef = useRef(null);

    const [editing, setEditing] = useState(false);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [photoMenu, setPhotoMenu] = useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deleteEmail, setDeleteEmail] =
        useState("");

    const [deleteConfirmation, setDeleteConfirmation] =
        useState("");

    const [formData, setFormData] =
        useState(EMPTY_PROFILE);

    // ==========================================
    // GET PROFILE
    // ==========================================

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await api.get("/users/profile");

            const profile =
                response.data?.user;

            if (!profile) {
                throw new Error(
                    "Profile data not found."
                );
            }

            setFormData({
                ...EMPTY_PROFILE,
                ...profile,
            });

            if (setUser) {
                setUser(profile);
            }
        } catch (err) {
            console.error(
                "Profile Fetch Error:",
                err
            );

            if (
                err.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                navigate("/login", {
                    replace: true,
                });

                return;
            }

            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // IMAGE UPLOAD
    // ==========================================

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError(
                "Please select a valid image."
            );

            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError(
                "Image size should be less than 5MB."
            );

            e.target.value = "";
            return;
        }

        setError("");

        const reader = new FileReader();

        reader.onload = (event) => {
            const originalImage =
                event.target?.result;

            if (!originalImage) {
                setError(
                    "Failed to read image."
                );

                return;
            }

            setFormData((prev) => ({
                ...prev,
                profile_image: originalImage,
            }));

            setPhotoMenu(false);

            const image = new Image();

            image.onload = () => {
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;

                let width =
                    image.naturalWidth ||
                    image.width;

                let height =
                    image.naturalHeight ||
                    image.height;

                if (!width || !height) {
                    setError(
                        "Invalid image dimensions."
                    );

                    return;
                }

                if (
                    width > MAX_WIDTH ||
                    height > MAX_HEIGHT
                ) {
                    const ratio = Math.min(
                        MAX_WIDTH / width,
                        MAX_HEIGHT / height
                    );

                    width = Math.round(
                        width * ratio
                    );

                    height = Math.round(
                        height * ratio
                    );
                }

                const canvas =
                    document.createElement(
                        "canvas"
                    );

                canvas.width = width;
                canvas.height = height;

                const ctx =
                    canvas.getContext("2d");

                if (!ctx) {
                    setError(
                        "Unable to process image."
                    );

                    return;
                }

                ctx.fillStyle = "#ffffff";

                ctx.fillRect(
                    0,
                    0,
                    width,
                    height
                );

                ctx.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                let compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.78
                    );

                if (
                    compressedImage.length >
                    2200000
                ) {
                    compressedImage =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.65
                        );
                }

                if (
                    compressedImage.length >
                    3000000
                ) {
                    compressedImage =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.55
                        );
                }

                if (
                    compressedImage.length >
                    4000000
                ) {
                    setError(
                        "Image is too large after compression. Please choose a smaller image."
                    );

                    return;
                }

                setFormData((prev) => ({
                    ...prev,
                    profile_image:
                        compressedImage,
                }));

                setError("");
            };

            image.onerror = () => {
                setError(
                    "Image preview is available, but this image format could not be optimized. Please use JPG or PNG."
                );
            };

            image.src = originalImage;
        };

        reader.onerror = () => {
            setError(
                "Failed to read image."
            );
        };

        reader.readAsDataURL(file);

        e.target.value = "";
    };

    // ==========================================
    // REMOVE IMAGE
    // ==========================================

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            profile_image: "",
        }));

        setPhotoMenu(false);
        setError("");
    };

    // ==========================================
    // PUT PROFILE
    // ==========================================

    const handleSave = async (e) => {
        e.preventDefault();

        const clean = (value) =>
            typeof value === "string"
                ? value.trim()
                : "";

        if (!clean(formData.name)) {
            setError("Name is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const payload = {
                name: clean(
                    formData.name
                ),

                bio: clean(
                    formData.bio
                ),

                job_title: clean(
                    formData.job_title
                ),

                location: clean(
                    formData.location
                ),

                phone: clean(
                    formData.phone
                ),

                website: clean(
                    formData.website
                ),

                linkedin: clean(
                    formData.linkedin
                ),

                github: clean(
                    formData.github
                ),

                skills: clean(
                    formData.skills
                ),

                experience_level:
                    formData.experience_level ||
                    null,

                company: clean(
                    formData.company
                ),

                department: clean(
                    formData.department
                ),

                employment_type:
                    formData.employment_type ||
                    null,

                work_mode:
                    formData.work_mode ||
                    null,

                preferred_location:
                    clean(
                        formData.preferred_location
                    ),

                availability:
                    formData.availability ||
                    null,

                profile_image:
                    formData.profile_image ||
                    null,
            };

            const response =
                await api.put(
                    "/users/profile",
                    payload
                );

            const updatedUser =
                response.data?.user;

            if (!updatedUser) {
                throw new Error(
                    "Updated profile was not received."
                );
            }

            setFormData({
                ...EMPTY_PROFILE,
                ...updatedUser,
            });

            if (setUser) {
                setUser(updatedUser);
            }

            localStorage.setItem(
                "user",
                JSON.stringify(
                    updatedUser
                )
            );

            setSuccess(
                "Profile updated successfully."
            );

            setEditing(false);
            setPhotoMenu(false);
        } catch (err) {
            console.error(
                "Profile Update Error:",
                err
            );

            if (
                err.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                navigate("/login", {
                    replace: true,
                });

                return;
            }

            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancel = async () => {
        setEditing(false);
        setError("");
        setSuccess("");
        setPhotoMenu(false);

        await fetchProfile();
    };

    // ==========================================
    // OPEN DELETE MODAL
    // ==========================================

    const openDeleteModal = () => {
        setDeleteEmail("");
        setDeleteConfirmation("");
        setError("");
        setShowDeleteModal(true);
    };

    // ==========================================
    // CLOSE DELETE MODAL
    // ==========================================

    const closeDeleteModal = () => {
        if (deleting) return;

        setShowDeleteModal(false);
        setDeleteEmail("");
        setDeleteConfirmation("");
    };

    // ==========================================
    // DELETE ACCOUNT
    // ==========================================

    const handleDeleteAccount =
        async () => {
            const actualEmail =
                String(
                    formData.email ||
                        user?.email ||
                        ""
                )
                    .trim()
                    .toLowerCase();

            const enteredEmail =
                deleteEmail
                    .trim()
                    .toLowerCase();

            const enteredConfirmation =
                deleteConfirmation.trim();

            if (
                enteredEmail !==
                actualEmail
            ) {
                setError(
                    "The email address does not match your account."
                );

                return;
            }

            if (
                enteredConfirmation !==
                "DELETE"
            ) {
                setError(
                    'Please type "DELETE" exactly to confirm.'
                );

                return;
            }

            try {
                setDeleting(true);
                setError("");

                await api.delete(
                    "/users/profile"
                );

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                if (setUser) {
                    setUser(null);
                }

                navigate("/login", {
                    replace: true,
                });
            } catch (err) {
                console.error(
                    "Delete Account Error:",
                    err
                );

                if (
                    err.response?.status ===
                    401
                ) {
                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    navigate("/login", {
                        replace: true,
                    });

                    return;
                }

                setError(
                    err.response?.data
                        ?.message ||
                        "Failed to delete account."
                );
            } finally {
                setDeleting(false);
            }
        };

    // ==========================================
    // DELETE CONFIRMATION VALIDATION
    // ==========================================

    const actualAccountEmail =
        String(
            formData.email ||
                user?.email ||
                ""
        )
            .trim()
            .toLowerCase();

    const isDeleteConfirmed =
        deleteEmail
            .trim()
            .toLowerCase() ===
            actualAccountEmail &&
        deleteConfirmation.trim() ===
            "DELETE";

    // ==========================================
    // PROFILE COMPLETION
    // ==========================================

    const completion =
        useMemo(() => {
            const fields = [
                formData.name,
                formData.bio,
                formData.job_title,
                formData.location,
                formData.phone,
                formData.skills,
                formData.experience_level,
                formData.company,
                formData.work_mode,
                formData.preferred_location,
                formData.availability,
                formData.profile_image,
            ];

            const filled =
                fields.filter(
                    (field) =>
                        field &&
                        String(
                            field
                        ).trim()
                ).length;

            return Math.round(
                (filled /
                    fields.length) *
                    100
            );
        }, [formData]);

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] dark:bg-[#070b16]">
                <div className="flex items-center gap-3">
                    <Loader2
                        size={22}
                        className="animate-spin text-indigo-500"
                    />

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        Loading profile...
                    </span>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-[#070b16] dark:text-white">
            <Navbar />

            <main className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                {/* ALERTS */}

                <AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                        >
                            <AlertCircle
                                size={18}
                            />

                            {error}
                        </motion.div>
                    )}

                </AnimatePresence>

                <AnimatePresence>

                    {success && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                        >
                            <CheckCircle2
                                size={18}
                            />

                            {success}
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* PROFILE HEADER */}

                <ProfileCard className="relative z-20 mb-6 overflow-visible p-6 sm:p-8">

                    <div className="relative flex flex-col gap-7 md:flex-row md:items-center">

                        {/* IMAGE */}

                        <div className="relative z-50 mx-auto md:mx-0">

                            <div className="h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-indigo-50 shadow-xl dark:border-slate-800 dark:bg-indigo-950">

                                {formData.profile_image ? (
                                    <img
                                        src={
                                            formData.profile_image
                                        }
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-indigo-500">
                                        <UserCircle2
                                            size={72}
                                            strokeWidth={
                                                1.3
                                            }
                                        />
                                    </div>
                                )}

                            </div>

                            {/* CAMERA BUTTON + MENU */}

                            {editing && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPhotoMenu(
                                                (prev) =>
                                                    !prev
                                            )
                                        }
                                        className="absolute -bottom-2 -right-2 z-[70] flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-white bg-slate-900 text-white shadow-lg transition hover:scale-105 dark:border-slate-900 dark:bg-white dark:text-slate-900"
                                    >
                                        <Camera
                                            size={18}
                                        />
                                    </button>

                                    <AnimatePresence>

                                        {photoMenu && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: -8,
                                                    scale: 0.96,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: -8,
                                                    scale: 0.96,
                                                }}
                                                className="absolute left-[calc(100%+14px)] top-1/2 z-[80] w-52 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        fileInputRef.current?.click()
                                                    }
                                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <Camera
                                                        size={17}
                                                    />

                                                    Change Photo
                                                </button>

                                                {formData.profile_image && (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleRemoveImage
                                                        }
                                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                                    >
                                                        <Trash2
                                                            size={17}
                                                        />

                                                        Remove Photo
                                                    </button>
                                                )}

                                                <input
                                                    ref={
                                                        fileInputRef
                                                    }
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={
                                                        handleImageChange
                                                    }
                                                />

                                            </motion.div>
                                        )}

                                    </AnimatePresence>
                                </>
                            )}

                        </div>

                        {/* IDENTITY */}

                        <div className="min-w-0 flex-1 text-center md:text-left">

                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                                TaskFlow Profile
                            </div>

                            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                                {formData.name ||
                                    "Your Name"}
                            </h1>

                            <p className="mt-2 text-base font-semibold text-indigo-600 dark:text-indigo-400">
                                {formData.job_title ||
                                    "Add your professional title"}
                            </p>

                            {formData.bio && (
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 md:mx-0">
                                    {formData.bio}
                                </p>
                            )}

                        </div>

                        {/* COMPLETION */}

                        <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:w-48 dark:border-slate-800 dark:bg-slate-950/40">

                            <div className="mb-2 flex justify-between">

                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Completion
                                </span>

                                <span className="text-sm font-black text-indigo-600">
                                    {completion}%
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

                                <motion.div
                                    animate={{
                                        width: `${completion}%`,
                                    }}
                                    className="h-full rounded-full bg-indigo-500"
                                />

                            </div>

                        </div>

                    </div>

                </ProfileCard>

                {/* CONTENT */}

                {!editing ? (
                    <ProfileView
                        formData={formData}
                    />
                ) : (
                    <motion.form
                        id="profile-form"
                        onSubmit={
                            handleSave
                        }
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                    >
                        <ProfileForm
                            formData={
                                formData
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </motion.form>
                )}

                {/* DANGER ZONE - ONLY EDIT MODE */}

                {editing && (
                    <ProfileCard className="mt-6 border-red-200 p-6 dark:border-red-900/50">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <h2 className="text-lg font-black text-red-600 dark:text-red-400">
                                    Delete Account
                                </h2>

                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Permanently delete your TaskFlow account and associated tasks.
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    openDeleteModal
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                            >
                                <Trash2
                                    size={17}
                                />

                                Delete Account
                            </button>

                        </div>

                    </ProfileCard>
                )}

                </div>
            </main>

            {/* DELETE CONFIRMATION MODAL */}

            <AnimatePresence>

                {showDeleteModal && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                        onClick={
                            closeDeleteModal
                        }
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 10,
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                        >

                            <div className="mb-5 flex items-start justify-between">

                                <div>

                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                        <Trash2
                                            size={20}
                                        />
                                    </div>

                                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                        Delete Account?
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        This action cannot be undone. Your account and associated tasks will be permanently deleted.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        closeDeleteModal
                                    }
                                    disabled={
                                        deleting
                                    }
                                    className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <X
                                        size={18}
                                    />
                                </button>

                            </div>

                            <div className="space-y-4">

                                {/* EMAIL */}

                                <div>

                                    <label
                                        htmlFor="delete-account-email"
                                        className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                                    >
                                        Confirm your email
                                    </label>

                                    <input
                                        id="delete-account-email"
                                        type="email"
                                        value={
                                            deleteEmail
                                        }
                                        onChange={(
                                            e
                                        ) => {
                                            setDeleteEmail(
                                                e.target
                                                    .value
                                            );
                                            setError(
                                                ""
                                            );
                                        }}
                                        placeholder={
                                            actualAccountEmail ||
                                            "Enter your email"
                                        }
                                        disabled={
                                            deleting
                                        }
                                        autoComplete="off"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                    />

                                </div>

                                {/* DELETE TEXT */}

                                <div>

                                    <label
                                        htmlFor="delete-account-confirmation"
                                        className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                                    >
                                        Type{" "}
                                        <span className="font-black text-red-600 dark:text-red-400">
                                            DELETE
                                        </span>{" "}
                                        to confirm
                                    </label>

                                    <input
                                        id="delete-account-confirmation"
                                        type="text"
                                        value={
                                            deleteConfirmation
                                        }
                                        onChange={(
                                            e
                                        ) => {
                                            setDeleteConfirmation(
                                                e.target
                                                    .value
                                            );
                                            setError(
                                                ""
                                            );
                                        }}
                                        placeholder="DELETE"
                                        disabled={
                                            deleting
                                        }
                                        autoComplete="off"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                    />

                                </div>

                                {/* VALIDATION MESSAGE */}

                                {deleteEmail &&
                                    deleteEmail
                                        .trim()
                                        .toLowerCase() !==
                                        actualAccountEmail && (
                                        <p className="text-xs font-semibold text-red-500">
                                            Email does not match your account.
                                        </p>
                                    )}

                                {deleteConfirmation &&
                                    deleteConfirmation.trim() !==
                                        "DELETE" && (
                                        <p className="text-xs font-semibold text-red-500">
                                            Please type DELETE exactly.
                                        </p>
                                    )}

                                <div className="flex justify-end gap-3 pt-2">

                                    <button
                                        type="button"
                                        onClick={
                                            closeDeleteModal
                                        }
                                        disabled={
                                            deleting
                                        }
                                        className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleDeleteAccount
                                        }
                                        disabled={
                                            deleting ||
                                            !isDeleteConfirmed
                                        }
                                        className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {deleting ? (
                                            <>
                                                <Loader2
                                                    size={17}
                                                    className="animate-spin"
                                                />

                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2
                                                    size={17}
                                                />

                                                Delete Account
                                            </>
                                        )}
                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    );
};

export default Profile;
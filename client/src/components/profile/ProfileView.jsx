import {
    UserCircle2,
    Mail,
    CalendarDays,
    MapPin,
    Phone,
    BriefcaseBusiness,
    Globe,
    FileText,
    ShieldCheck,
    Building2,
    Monitor,
    Clock3,
} from "lucide-react";

import ProfileCard from "./ProfileCard";

const InfoBox = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Icon size={18} />
            </div>

            <div className="min-w-0">
                <p className="text-xs text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {value || "Not added"}
                </p>
            </div>
        </div>
    );
};

const LinkBox = ({ label, value }) => {
    const href = value
        ? value.startsWith("http")
            ? value
            : `https://${value}`
        : "";

    return (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Globe size={17} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {value || "Not added"}
                    </p>
                </div>
            </div>

            {value && (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-indigo-500 dark:hover:bg-slate-800"
                >
                    ↗
                </a>
            )}
        </div>
    );
};

const ProfileView = ({ formData }) => {
    const skills = formData.skills
        ? formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [];

    return (
        <div className="space-y-6">

            {/* ABOUT */}

            <ProfileCard className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <FileText className="text-indigo-500" size={22} />

                    <div>
                        <h2 className="text-xl font-black">
                            About
                        </h2>

                        <p className="text-sm text-slate-400">
                            Professional introduction
                        </p>
                    </div>
                </div>

                <p className="leading-7 text-slate-600 dark:text-slate-300">
                    {formData.bio ||
                        "You haven't added a professional bio yet."}
                </p>
            </ProfileCard>

            {/* PROFESSIONAL */}

            <ProfileCard className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-black">
                    Professional Information
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <InfoBox
                        icon={BriefcaseBusiness}
                        label="Job Title"
                        value={formData.job_title}
                    />

                    <InfoBox
                        icon={Building2}
                        label="Company"
                        value={formData.company}
                    />

                    <InfoBox
                        icon={Building2}
                        label="Department"
                        value={formData.department}
                    />

                    <InfoBox
                        icon={ShieldCheck}
                        label="Experience"
                        value={formData.experience_level}
                    />

                    <InfoBox
                        icon={Monitor}
                        label="Work Mode"
                        value={formData.work_mode}
                    />

                    <InfoBox
                        icon={Clock3}
                        label="Availability"
                        value={formData.availability}
                    />

                    <InfoBox
                        icon={BriefcaseBusiness}
                        label="Employment Type"
                        value={formData.employment_type}
                    />

                    <InfoBox
                        icon={MapPin}
                        label="Preferred Location"
                        value={formData.preferred_location}
                    />
                </div>
            </ProfileCard>

            {/* SKILLS */}

            <ProfileCard className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-black">
                    Skills
                </h2>

                {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400">
                        No skills added yet.
                    </p>
                )}
            </ProfileCard>

            {/* CONTACT */}

            <ProfileCard className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-black">
                    Contact & Links
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <InfoBox
                        icon={Mail}
                        label="Email"
                        value={formData.email}
                    />

                    <InfoBox
                        icon={Phone}
                        label="Phone"
                        value={formData.phone}
                    />

                    <InfoBox
                        icon={MapPin}
                        label="Location"
                        value={formData.location}
                    />

                    <LinkBox
                        label="Website"
                        value={formData.website}
                    />

                    <LinkBox
                        label="LinkedIn"
                        value={formData.linkedin}
                    />

                    <LinkBox
                        label="GitHub"
                        value={formData.github}
                    />
                </div>
            </ProfileCard>

            {/* ACCOUNT */}

            <ProfileCard className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-black">
                    Account
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <InfoBox
                        icon={UserCircle2}
                        label="Full Name"
                        value={formData.name}
                    />

                    <InfoBox
                        icon={Mail}
                        label="Email"
                        value={formData.email}
                    />

                    <InfoBox
                        icon={CalendarDays}
                        label="Member Since"
                        value={
                            formData.created_at
                                ? new Date(
                                      formData.created_at
                                  ).toLocaleDateString(
                                      "en-IN",
                                      {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                      }
                                  )
                                : "Available in account"
                        }
                    />
                </div>
            </ProfileCard>
        </div>
    );
};

export default ProfileView;
import ProfileCard from "./ProfileCard";

import {
    InputField,
    TextAreaField,
    SelectField,
} from "./ProfileField";


const ProfileForm = ({
    formData,
    onChange,
}) => {
    return (
        <div className="space-y-6">

            {/* ================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================= */}

            <ProfileCard className="p-6 sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-black">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Your basic personal information.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <InputField
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Enter your name"
                    />

                    <InputField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={() => {}}
                        type="email"
                        placeholder="Your email"
                    />

                    <InputField
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="Enter phone number"
                    />

                    <InputField
                        name="location"
                        label="Current Location"
                        value={formData.location}
                        onChange={onChange}
                        placeholder="e.g. Delhi, India"
                    />

                    <div className="md:col-span-2">
                        <TextAreaField
                            name="bio"
                            label="Bio"
                            value={formData.bio}
                            onChange={onChange}
                            placeholder="Tell something about yourself..."
                            rows={5}
                        />
                    </div>

                </div>
            </ProfileCard>


            {/* ================================= */}
            {/* PROFESSIONAL */}
            {/* ================================= */}

            <ProfileCard className="p-6 sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-black">
                        Professional Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Add your professional details.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <InputField
                        name="job_title"
                        label="Job Title"
                        value={formData.job_title}
                        onChange={onChange}
                        placeholder="e.g. Full Stack Developer"
                    />

                    <InputField
                        name="company"
                        label="Company"
                        value={formData.company}
                        onChange={onChange}
                        placeholder="Company name"
                    />

                    <InputField
                        name="department"
                        label="Department"
                        value={formData.department}
                        onChange={onChange}
                        placeholder="e.g. Engineering"
                    />

                    <SelectField
                        name="experience_level"
                        label="Experience Level"
                        value={formData.experience_level}
                        onChange={onChange}
                        options={[
                            "Fresher",
                            "Junior",
                            "Mid Level",
                            "Senior",
                        ]}
                    />

                    <SelectField
                        name="employment_type"
                        label="Employment Type"
                        value={formData.employment_type}
                        onChange={onChange}
                        options={[
                            "Full Time",
                            "Part Time",
                            "Internship",
                            "Freelance",
                            "Contract",
                        ]}
                    />

                    <SelectField
                        name="work_mode"
                        label="Work Mode"
                        value={formData.work_mode}
                        onChange={onChange}
                        options={[
                            "On-site",
                            "Hybrid",
                            "Remote",
                        ]}
                    />

                    <InputField
                        name="preferred_location"
                        label="Preferred Location"
                        value={formData.preferred_location}
                        onChange={onChange}
                        placeholder="e.g. Gurugram, Noida"
                    />

                    <SelectField
                        name="availability"
                        label="Availability"
                        value={formData.availability}
                        onChange={onChange}
                        options={[
                            "Immediately Available",
                            "Available in 15 Days",
                            "Available in 30 Days",
                            "Currently Working",
                        ]}
                    />

                </div>
            </ProfileCard>


            {/* ================================= */}
            {/* SKILLS */}
            {/* ================================= */}

            <ProfileCard className="p-6 sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-black">
                        Skills
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Add your technical and professional skills.
                    </p>
                </div>

                <TextAreaField
                    name="skills"
                    label="Skills"
                    value={formData.skills}
                    onChange={onChange}
                    placeholder="React.js, Node.js, Express.js, MySQL, Python..."
                    rows={4}
                />
            </ProfileCard>


            {/* ================================= */}
            {/* LINKS */}
            {/* ================================= */}

            <ProfileCard className="p-6 sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-black">
                        Social & Professional Links
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <InputField
                        name="website"
                        label="Website"
                        value={formData.website}
                        onChange={onChange}
                        placeholder="https://yourwebsite.com"
                    />

                    <InputField
                        name="linkedin"
                        label="LinkedIn"
                        value={formData.linkedin}
                        onChange={onChange}
                        placeholder="LinkedIn profile URL"
                    />

                    <InputField
                        name="github"
                        label="GitHub"
                        value={formData.github}
                        onChange={onChange}
                        placeholder="GitHub profile URL"
                    />

                </div>
            </ProfileCard>

        </div>
    );
};

export default ProfileForm;
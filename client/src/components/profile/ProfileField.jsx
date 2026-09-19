const inputClasses = `
    w-full
    rounded-2xl
    border border-slate-200
    bg-slate-50/80
    px-4
    py-3.5
    text-sm
    text-slate-800
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-indigo-400
    focus:bg-white
    focus:ring-4
    focus:ring-indigo-500/10
    dark:border-slate-700
    dark:bg-slate-950/60
    dark:text-white
    dark:placeholder:text-slate-500
    dark:focus:border-indigo-500
    dark:focus:bg-slate-950
`;


// ==========================================
// INPUT
// ==========================================

export const InputField = ({
    name,
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {label}
            </label>

            <input
                name={name}
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClasses}
            />
        </div>
    );
};


// ==========================================
// TEXTAREA
// ==========================================

export const TextAreaField = ({
    name,
    label,
    value,
    onChange,
    placeholder = "",
    rows = 5,
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {label}
            </label>

            <textarea
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`${inputClasses} resize-none`}
            />
        </div>
    );
};


// ==========================================
// SELECT
// ==========================================

export const SelectField = ({
    name,
    label,
    value,
    onChange,
    options = [],
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {label}
            </label>

            <select
                name={name}
                value={value || ""}
                onChange={onChange}
                className={inputClasses}
            >
                <option value="">
                    Select
                </option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
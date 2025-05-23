import PropTypes from "prop-types";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Input({
  type = "text",
  id,
  placeholder = "",
  labelText = "",
  value,
  onChange,
  onKeyDown,
}) {
  return (
    <>
      <label htmlFor={id} className="text-sm font-semibold">
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="ease mb-4 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-base text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
      />
    </>
  );
}

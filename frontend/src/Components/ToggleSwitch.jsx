const ToggleSwitch = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      )}
      <div
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300
          ${value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
            ${value ? 'translate-x-7' : 'translate-x-1'}`}
        />
      </div>
    </div>
  )
}

export default ToggleSwitch
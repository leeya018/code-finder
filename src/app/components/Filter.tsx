// components/Filter.tsx
import { useState } from "react";

interface FilterProps {
  onFilter: (query: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onFilter(value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Filter by title..."
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Filter;

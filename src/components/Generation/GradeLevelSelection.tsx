// src/components/GradeLevelSelection.tsx
const GradeLevelSelection = ({ gradeLevels, onSelect }: 
    { gradeLevels: string[], onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    return (
      <div className="my-4">
        <label className="block mb-2 text-lg font-medium">Select Grade Level</label>
        <select onChange={onSelect} className="w-full p-2 border rounded">
          {gradeLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    );
};

export default GradeLevelSelection;
  
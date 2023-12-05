import React, { useState, useEffect } from 'react';

const DropdownMenu = ({ onSelect }) => {
  const names = ["BEP", "CPAU", "DOS", "FLL", "ISL", "JAN", "JND", "JOES", "KZI", "MAF", "MIK", "MKR", "NIR", "RAJ", "RIH", "TIF", "TOH"];
  const [selectedName, setSelectedName] = useState(names[0]);

  useEffect(() => {
    onSelect(selectedName);
  }, [selectedName, onSelect]);

  const handleSelect = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div>
      <h2>Choose your fighter 🥋💩</h2>
        <select className="form-select" id="name-select" value={selectedName} onChange={handleSelect}>
          {names.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
    </div>
  );
};

export default DropdownMenu;

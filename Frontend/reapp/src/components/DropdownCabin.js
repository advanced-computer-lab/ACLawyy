import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'economy', label: 'Economy' },
    { value: 'first', label: 'First' },
    { value: 'business', label: 'Business' },
    { value: 'all', label: 'All' },
  ];

export default function DropdownCabin() {
  const [ setSelectedOption] = useState(null);
  const [ selectedOption] = useState(null);

  return (
    <div className="Dropdown">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
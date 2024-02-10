import { useState } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const SelectRace = ({ raceEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedRace, setSelectedRace] = useState(null);
  const navigate = useNavigate();

  const handleRaceClick = (id) => {
    setSelectedRace(id);
  };

  const handleSelectButtonClick = () => {
    // Navigate to "TheWhy" page upon selecting a race
    navigate('/agreement');
  };

  const filteredRaceEvents = raceEvents.filter((event) => {
    const typeMatch = filterType === 'all' || event.race_type === filterType;
    const nameMatch = event.race_name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && nameMatch;
  });

  return (
    <div>
      <h2>Select Race</h2>
      <input className="input-container"
        type="text"
        placeholder="Search race..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="5k">5k</option>
        <option value="10k">10k</option>
        <option value="Half Marathon">Half Marathon</option>
        <option value="Full Marathon">Full Marathon</option>
      </select>
      <div className="race-event-cards">
        {filteredRaceEvents.map((event) => (
          <div
            key={event.id} 
            className={`race-event-card ${selectedRace && selectedRace.id === event.id ? 'selected' : ''}`}
              onClick={() => handleRaceClick(event)}
            // className="race-event-card"
          >
            <RaceEventCard
              key={event.id}
              raceEvent={event}
              onClick={() => handleRaceClick(event.id)}
              isSelected={selectedRace === event.id}
            />
             <Button variant="primary" onClick={handleSelectButtonClick}>Select</Button>
          </div>
        ))}
      </div>
      <div id="button-container">
        <button onClick={handleSelectButtonClick}>Select</button>
      </div>
    </div>
  );
};

export default SelectRace;

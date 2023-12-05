import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SortableTableComponent.css';


const SortableTableComponent = ({ updateTrigger }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'total_time', direction: 'descending' });
  const [timesList, setTimesList] = useState([]);
  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  useEffect(() => {
    // Function to fetch times data from the backend
    const fetchTimesData = () => {
      axios.get(`http://${BACKEND_IP}/get-times`)
        .then(response => {
          const sortedData = response.data.sort((a, b) => b.total_time - a.total_time);
          setTimesList(sortedData);        })
        .catch(error => {
          console.error('Error fetching times:', error);
        });
    };

    // Call the fetch function
    fetchTimesData();
  }, [updateTrigger]); // Dependency on updateTrigger

  const sortedTimesList = React.useMemo(() => {
    let sortableItems = [...timesList];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [timesList, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirectionArrow = (key) => {
    return sortConfig.key === key
      ? sortConfig.direction === 'ascending'
        ? ' ↑'
        : ' ↓'
      : '';
  };

  return (
    <div>
      <h2>So where do you land? 🏆</h2>
      <table className="table table-striped table-hover">
        <caption>Hall of fame</caption>
        <thead>
          <tr>
            <th scope="col" className="sortable-header" onClick={() => requestSort('name')}>Name{getSortDirectionArrow('name')}</th>
            <th scope="col" className="sortable-header" onClick={() => requestSort('total_time')}>Total time spent (seconds){getSortDirectionArrow('total_time')}</th>
            <th scope="col" className="sortable-header" onClick={() => requestSort('total_times')}>Total times pooped{getSortDirectionArrow('total_times')}</th>
            <th scope="col" className="sortable-header" onClick={() => requestSort('max_time')}>Longest poop (seconds){getSortDirectionArrow('max_time')}</th>
            <th scope="col" className="sortable-header" onClick={() => requestSort('shortest_time')}>Shortest poop (seconds){getSortDirectionArrow('shortest_time')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTimesList.map((entry, index) => (
            <tr key={entry.total_time}>
              <td>{entry.name}</td>
              <td>{entry.total_time}</td>
              <td>{entry.total_times}</td>
              <td>{entry.max_time}</td>
              <td>{entry.min_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SortableTableComponent;
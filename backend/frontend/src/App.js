import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main App Component
function App() {
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch devices from API
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/devices/'); // Replace with your API endpoint
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setError('Failed to fetch devices.');
      }
    };

    fetchDevices();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-device/', {
        deviceName,
        location,
      });

      if (response.data.success) {
        setDeviceName('');
        setLocation('');
        setError('');
        setSuccessMessage(response.data.message || 'Device added successfully!');
        // Optionally refresh the device list
        const updatedDevicesResponse = await axios.get('http://127.0.0.1:8000/api/devices');
        setDevices(updatedDevicesResponse.data);
      } else {
        setError('Failed to submit device: ' + (response.data.errors || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting device:', error.response ? error.response.data : error.message);
      setError('Failed to submit device.');
    }
  };

  return (
    <div style={{ backgroundColor: 'blue', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>Device List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <ul>
        {devices.length > 0 ? (
          devices.map((device) => (
            <li key={device.id}>
              {device.name} - {device.location}
            </li>
          ))
        ) : (
          <p>No devices found.</p>
        )}
      </ul>

      <h2>Add Device</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Device Name:
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

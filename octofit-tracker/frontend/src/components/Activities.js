import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h1 className="display-6 mb-4 text-primary">Activities</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Activity Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Date</th>
              <th scope="col">User</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{activity.activity_type}</td>
                <td>{activity.duration_minutes}</td>
                <td>{activity.date}</td>
                <td>{activity.user ? (activity.user.name || activity.user) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;

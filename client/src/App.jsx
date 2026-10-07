import React from 'react';
import CampaignForm from './components/CampaignForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Social Campaign Publisher</h1>
        <p>Create and publish campaigns directly from this UI.</p>
      </header>

      <main>
        <section className="form-section">
          <h2>Create Campaign</h2>
          <CampaignForm />
        </section>

        <section className="dashboard-section">
          <h2>Campaign Status Dashboard</h2>
          <p className="empty-state">No campaigns yet.</p>
        </section>
      </main>
    </div>
  );
}

export default App;

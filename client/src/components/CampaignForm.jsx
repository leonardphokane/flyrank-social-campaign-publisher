import React, { useState } from 'react';

function CampaignForm() {
  const [caption, setCaption] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idempotencyKey = Date.now().toString();

    const res = await fetch("http://localhost:3000/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption, imagePath, idempotencyKey })
    });

    const data = await res.json();
    setStatus(data.status);
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <label>
        Caption
        <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
      </label>

      <label>
        Image Path
        <input
          type="text"
          placeholder="/images/example.png"
          value={imagePath}
          onChange={e => setImagePath(e.target.value)}
        />
      </label>

      <button type="submit">Publish</button>

      {status && <p className="status-msg">Publish status: {status}</p>}
    </form>
  );
}

export default CampaignForm;

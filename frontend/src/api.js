const API_URL = "http://localhost:5000/api/applications";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export async function getApplications() {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch applications");
  }

  return data;
}

export async function getStats() {
  const response = await fetch(`${API_URL}/stats`, {
    headers: getHeaders()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch statistics");
  }

  return data;
}

export async function createApplication(application) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(application)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create application");
  }

  return data;
}

export async function updateApplication(id, application) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(application)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update application");
  }

  return data;
}

export async function deleteApplication(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete application");
  }

  return data;
}
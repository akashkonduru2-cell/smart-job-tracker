const API_URL = "http://localhost:5000/api/applications";
const RESUME_API_URL = "http://localhost:5000/api/resume";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`
  };
};

export async function getApplications(status = "All", search = "") {
  const params = new URLSearchParams();

  if (status && status !== "All") {
    params.append("status", status);
  }

  if (search) {
    params.append("search", search);
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}${query ? `?${query}` : ""}`,
    {
      headers: getHeaders()
    }
  );

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

export async function getResume() {
  const response = await fetch(RESUME_API_URL, {
    headers: getAuthHeaders()
  });

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume");
  }

  return data;
}

export async function uploadResume(file) {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await fetch(
    `${RESUME_API_URL}/upload`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload resume");
  }

  return data;
}

export async function deleteResume() {
  const response = await fetch(RESUME_API_URL, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete resume");
  }

  return data;
}
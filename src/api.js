const API_URL = "http://localhost:5000/api";

export const getSkills = async () => {
  const response = await fetch(`${API_URL}/skills`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  const result = await response.json();

  return result.data;
};

export const getEducation = async () => {
  const response = await fetch(
    `${API_URL}/education`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch education");
  }

  const result = await response.json();

  return result.data;
};



export const getAchievements = async () => {
  const response = await fetch(
    `${API_URL}/achievements`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch achievements");
  }

  const result = await response.json();

  return result.data;
};


export const getCertifications = async () => {
  const response = await fetch(
    `${API_URL}/certifications`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch certifications"
    );
  }

  const result = await response.json();

  return result.data;
};


export const getProfile = async () => {
  const response = await fetch(
    "http://localhost:5000/api/profile"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const result = await response.json();

  return result.data;
};


export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
};
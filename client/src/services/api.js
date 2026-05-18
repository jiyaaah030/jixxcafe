const BASE_URL = "http://localhost:5000";

export const saveResult = async (data) => {

  const response = await fetch(
    `${BASE_URL}/save-result`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  return response.json();
};

export const getAnalytics = async () => {

  const response = await fetch(
    `${BASE_URL}/analytics`
  );

  return response.json();
};
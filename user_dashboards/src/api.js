import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const fetchVenues = async () => {
  const response = await axios.get(`${BASE_URL}/venues`);
  return response.data;
};

export const fetchActivities = async () => {
  const response = await axios.get(`${BASE_URL}/activities`);
  return response.data;
};

export const fetchPlayers = async () => {
  const response = await axios.get(`${BASE_URL}/players`);
  return response.data;
};

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchData(path) {
  for (const url of API_URLS) {
    try {
      const response = await fetch(url + path);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log("Request failed, trying next url");
    }
  }
  throw new Error("Could not load data");
}

export function getAllWorkouts() {
  return fetchData("");
}

export function getWorkout(id) {
  return fetchData("/" + id);
}

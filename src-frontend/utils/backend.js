export function backendHost(path) {
  if (process.env.NODE_ENV === "production") {
    return `${path}`;
  } else {
    return `http://localhost:8080${path}`;
  }
}

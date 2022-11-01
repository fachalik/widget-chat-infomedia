const api = process.env.VITE_API_URL;
const tenant = process.env.VITE_TENANT;
export const API_URL = `${api}/${tenant}`;

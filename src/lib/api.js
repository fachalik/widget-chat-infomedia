const api = import.meta.env.VITE_API_URL;
const tenant = import.meta.env.VITE_TENANT;

export const API_URL = `${api}/${tenant}`;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiFetch = apiFetch;
exports.apiFetchOptional = apiFetchOptional;
exports.getApiBase = getApiBase;
const API_BASE = process.env.API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
async function apiFetch(path, init) {
    const { token, ...fetchInit } = init ?? {};
    const headers = new Headers(fetchInit.headers);
    if (!headers.has("Content-Type") && fetchInit.body) {
        headers.set("Content-Type", "application/json");
    }
    if (token)
        headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
        ...fetchInit,
        headers,
        credentials: "include",
        cache: "no-store",
    });
    const json = (await res.json());
    if (!json.success || json.data === undefined) {
        throw new Error(json.error?.message ?? `API error ${res.status}`);
    }
    return json.data;
}
async function apiFetchOptional(path, init) {
    try {
        return await apiFetch(path, init);
    }
    catch {
        return null;
    }
}
function getApiBase() {
    return API_BASE;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientApi = clientApi;
exports.clientApiData = clientApiData;
async function clientApi(path, init) {
    const res = await fetch(`/api/v1${path}`, {
        credentials: "include",
        cache: "no-store",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });
    return res.json();
}
async function clientApiData(path, init) {
    const json = await clientApi(path, init);
    return json.success && json.data !== undefined ? json.data : null;
}

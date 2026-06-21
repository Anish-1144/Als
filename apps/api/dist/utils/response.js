export function ok(res, data, meta) {
    return res.json({ success: true, data, ...(meta ? { meta } : {}) });
}
export function fail(res, status, code, message) {
    return res.status(status).json({
        success: false,
        error: { code, message },
    });
}

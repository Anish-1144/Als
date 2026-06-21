"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiList = useApiList;
const react_1 = require("react");
const api_client_1 = require("@/lib/api-client");
function useApiList(path, fallback = []) {
    const [data, setData] = (0, react_1.useState)(fallback);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        (0, api_client_1.clientApiData)(path)
            .then((items) => {
            if (items)
                setData(items);
        })
            .finally(() => setLoading(false));
    }, [path]);
    return { data, loading };
}

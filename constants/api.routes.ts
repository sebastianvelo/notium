const BASE_PATH = "/api";

const API_ROUTES = {
    AUTH: {
        ME: `${BASE_PATH}/auth/me`,
        LOGOUT: `${BASE_PATH}/auth/logout`,
        CALLBACK: `${BASE_PATH}/auth/callback`
    },
    WORKSPACES: {
        ROOT: `${BASE_PATH}/workspaces`,
        ID: (id: string) => `${BASE_PATH}/workspaces/${id}`,
        NOTES: (id: string) =>  `${BASE_PATH}/workspaces/${id}/notes`,
        MEMBERS: (id: string) =>  `${BASE_PATH}/workspaces/${id}/members`,
    },
    NOTES: {
        ID: (id: string) => `${BASE_PATH}/notes/${id}`
    }
};

export default API_ROUTES;
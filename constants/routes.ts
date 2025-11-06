const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    WORKSPACES: "/workspaces",
    WORKSPACE_NEW: "/workspaces/new",
    WORKSPACE: (id: string) => `/workspaces/${id}`,
    WORKSPACE_NOTES: (id: string) => `/workspaces/${id}/notes`,
    WORKSPACE_MEMBERS: (id: string) => `/workspaces/${id}/members`,
    WORKSPACE_ADMIN: (id: string) => `/workspaces/${id}/admin`,
} as const;

export default ROUTES;
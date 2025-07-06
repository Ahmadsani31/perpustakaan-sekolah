//INDEX
interface propsPage {
    routeAccess: {
        data: itemColumns[];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
}

// Create
export interface propsPageCreate {
    page_settings: PageSettings;
    roles: roles[];
    permissions: permissions[];
    routes: routes[];
}

export interface propsFormCreate {
    route_name: string;
    role_id: string;
    permission_id: string;
    _method: string;
}

// Edit
export interface propsPageEdit {
    page_settings: PageSettings;
    roles: roles[];
    permissions: permissions[];
    routes: routes[];
    routeAccess: {
        route_name: string;
        role_id: string;
        permission_id: string;
    };
}

type itemEdit = {
    id: number;
    name: string;
    guard_name: string;
};

export interface propsFormEdit {
    route_name: string;
    role_id: string;
    permission_id: string;
    _method: string;
}

// all
export interface itemColumns {
    id: number;
    route_name: string;
    role: {
        id: number;
        name: string;
    };
    permissions: {
        id: number;
        name: string;
    };
    created_at: string;
}

type PageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};

type roles = {
    value: number;
    label: string;
};

type permissions = {
    value: number;
    label: string;
};

type routes = {
    value: number;
    label: string;
};

//INDEX
export interface propsPage {
    users: {
        data: [];
    };
    page_settings: PageSettings;
}

type meta = {
    from: number;
    total: number;
    current_page: number;
    per_page: number;
    has_pages: boolean;
    links: links[];
};

type links = {
    url: string;
    label: string;
    active: boolean;
};

export interface itemColumns {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
}

// Create
export interface propsPageCreate {
    page_settings: PageSettings;
    page_data: {
        languages: string[];
        categories: {
            value: number;
            name: string;
        }[];
        publishers: {
            value: number;
            name: string;
        }[];
    };
}

export interface propsForm {
    name: string;
    guard_name: string;
    _method: string;
}

type PageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};

// Edit
export interface propsPageEdit {
    user: {
        email: string;
        roles: {
            id: number;
            name: string;
        }[];
    };
    roles: [];
    page_settings: PageSettings;
}

type itemEdit = {
    id: number;
    name: string;
    guard_name: string;
};

export interface propsFormEdit {
    email: string;
    roles: string[];
    _method: string;
}

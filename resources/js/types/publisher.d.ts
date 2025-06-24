//INDEX
export interface propsPage {
    publishers: {
        data: itemPublisher[]
        meta: meta
    },
    page_settings: {
        title: string;
        subtitle: string;
    },
    state: {
        page: number;
        search: string;
        load: string;
        field: string;
        direction: string;
    }
}

type meta = {
    from: number;
    total: number;
    current_page: number;
    per_page: number;
    has_pages: boolean;
    links: links[]
};

type links = {
    url: string,
    label: string,
    active: boolean
};

export interface itemPublisher {
    id: number;
    name: string;
    slug: string;
    address: string;
    email: string;
    phone: string;
    logo: string;
    created_at: string;
}

// Create
export interface propsPageCreate {
    page_settings: PageSettings;
}

export interface propsPageEdit {
    publisher: publishersForm,
    page_settings: PageSettings
}

export interface publishersForm {
    name: string;
    email: string;
    address: string;
    phone: string;
    logo: File | null;
    _method: string;
};

type PageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};
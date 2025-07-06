//INDEX
export interface propsIndex {
    categories: {
        data: itemCategory[];
        meta: {
            from: number;
            total: number;
            current_page: number;
            per_page: number;
            has_pages: boolean;
            links: {
                url: string;
                label: string;
                active: boolean;
            }[];
        };
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
    state: {
        page: number;
        search: string;
        load: string;
        field: string;
        direction: string;
    };
}

//CREATE
export interface propsCreate {
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
}

export interface propsCreateForm {
    name: string;
    description: string;
    cover: File | null;
    _method: string;
}

//EDIT
export interface propsEdit {
    category: PropsEditForm;
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
}

export interface PropsEditForm {
    id: number;
    name: string;
    description: string;
    cover: string | File | null;
    _method: string;
}

//--------------------

type itemCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: string;
    created_at: string;
};

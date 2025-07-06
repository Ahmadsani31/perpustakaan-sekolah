//INDEX
export interface propsIndex {
    users: {
        data: [];
    };
    page_settings: PageSettings;
}

// Edit
export interface propsEdit {
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

export interface propsEditForm {
    email: string;
    roles: string[];
    _method: string;
}

//----------------------

export interface columnAssignUser {
    id: number;
    username: string;
    roles: string;
}

type PageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};

// Edit
export interface propsEdit {
    role: {
        name: string;
        permissions: {
            id: number;
            name: string;
        }[];
    };
    permissions: [];
    page_settings: PageSettings;
}

export interface propsEditForm {
    name: string;
    permissions: string[];
    _method: string;
}

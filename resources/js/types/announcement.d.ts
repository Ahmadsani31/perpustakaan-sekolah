//INDEX
export interface propsIndex {
    announcement: {
        data: [];
    };
    page_settings: {
        title: string;
        subtitle: string;
    };
}


//CREATE
export interface propsCreate {
    page_settings: pageSettings;
}

export interface propsCreateForm {
    message: string;
    url: string;
    is_active: boolean;
    _method: string;
};

//EDIT
interface propsEdit {
    page_settings: pageSettings;
    announcement: {
        id: number;
        message: string;
        url: string;
        is_active: boolean;
    };
}

type propsEditForm = {
    id: number;
    message: string;
    url: string;
    is_active: boolean;
    _method: string;
};


//-----------------------------

export interface columnAnnouncement {
    id: number;
    user: {
        name: string;
    };
    user_id: number;
    book_id: number;
    loan_code: string;
    loan_date: string;
    due_date: string;
    created_at: string;
};


type pageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
}
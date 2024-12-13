export type UserResponse = {
    _id: string,
    nik: string,
    name: string,
    email: string,
    role: string;
    is_verified: boolean;
    avatar?: string;
    address?: string;
    token?: string;
    complaints?: string;
}

export type UpdateUserRequest = {
    name: string,
    email: string,
    avatar?: string,
    address?: string,
    old_password?: string;
    new_password?: string;
    confirm_password?: string;
}
export interface IUser {
    id: number;
    email: string;
    password: string;
    cdi: string;
    role: string;
    first_name: string;
    last_name: string;
    fullName: string;
    contact_phone: string;
    locale_map_point: string;
    locale_city: string;
    locale_country: string;
    locale_address: string;
    domain_name: string;
    is_staff: boolean;
    is_active: boolean;
}
export class User implements IUser {
    id: number;
    email: string;
    password: string;
    cdi: string;
    role: string;
    first_name: string;
    last_name: string;
    fullName: string;
    contact_phone: string;
    locale_map_point: string;
    locale_city: string;
    locale_country: string;
    locale_address: string;
    domain_name: string;
    is_staff: boolean;
    is_active: boolean;


}
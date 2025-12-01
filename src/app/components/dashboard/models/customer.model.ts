export interface CustomerModel {
    _id?: string,
    name: string,
    phone: string,
    pet: {
        name: string,
        peso: string,
        raca: string,
        idade: string,
        sexo: string


    }
}
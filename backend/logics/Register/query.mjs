export class RegisterEventQuery{
    registerUser(){
        return `
        mutation ($email: String!, $password: String!, $firstName: String!, $lastName: String!, $company: String!, $role: String!) {
            insert_kalenview_one(object: {
                email: $email,
                password: $password,
                first_name: $firstName,
                last_name: $lastName,
                company_name: $company,
                company_role: $role
            }) {
                uuid
            }
        }
        `;
    }
}
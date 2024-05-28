export class LoginQuery {
    loginUser(){
        return `
        query getUserByEmail($email: String!) {
          user: kalenview(where: {email: {_eq: $email}}) {
            first_name
            last_name
            uuid
            password
          }
        }
        `
    };
}
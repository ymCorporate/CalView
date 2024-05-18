export class LoginQuery {
    loginUser(email, password){
        return `
        query MyQuery {
            kalenview_by_pk(email: "${email}", password: "${password}") {
              uuid
              first_name
              last_name
            }
          }
        `
    };
}
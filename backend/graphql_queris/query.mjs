export class Query{

    signupInsertUser(first_name, last_name, email, password, company_name, company_role){
        return `
        mutation MyMutation {
            insert_kalenview_one(object: {company_name: "${company_name}", company_role: "${company_role}",
             email: "${email}", first_name: "${first_name}", last_name: "${last_name}", password: "${password}"}) {
              uuid
              first_name
              last_name
              email
              company_name
              company_role
              password
            }
          }
        `
    };

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
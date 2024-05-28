export const registerUser = `
mutation InputUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $company: String!, $role: String!) {
    InsertKalenviewOne(input: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, company: $company, role: $role
    }) {
      uuid
    }
  }
`
;
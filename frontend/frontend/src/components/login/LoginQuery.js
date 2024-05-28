export const loginQuery = `
    query LoginQuiry($email: String!, $password: String!) {
        LoginQuery(input: {email: $email, password: $password}) {
        first_name
        last_name
        message
        token
        uuid
        }
    }
`;
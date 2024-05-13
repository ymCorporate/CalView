import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const hasuraEndpoint = 'https://organic-turkey-32.hasura.app';

// Create a new Apollo Client instance
const client = new ApolloClient({
    uri: hasuraEndpoint,
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': 'd02gnA69zDZaVXZTor9TG5Ff0wsU6JinBINDzZ3hWCCuWPmO7l15of2U6t5tvDWv',
    },
});

export class functions {

    async registerFunction(email, pwd, confpwd, comname, comrole) {
        const mutation = gql`
            mutation InsertUser($email: String!, $pwd: String!, $confpwd: String!, $comname: String!, $comrole: String!) {
                insert(object: {
                    uuid: "4800efb7-8d59-4328-854c-6d92e15944b9",
                    email: $email,
                    pwd: $pwd,
                    confpwd: $confpwd,
                    comname: $comname,
                    comrole: $comrole,
                }) {
                    uuid
                    email
                    pwd
                    confpwd
                    comname
                    comrole
                }
            }
        `;

        const variables = {
            email,
            pwd,
            confpwd,
            comname,
            comrole,
        };

        try {
            const { data } = await client.mutate({ mutation, variables });
            console.log('User inserted successfully:', data);
        } catch (error) {
            console.error('Error inserting user:', error);
        }
    }
}
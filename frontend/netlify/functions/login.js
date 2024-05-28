const { GraphQLClient } = require('graphql-request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HASURA_ADMIN_SECRET = 'your-hasura-admin-secret';
const HASURA_GRAPHQL_ENDPOINT = 'https://your-hasura-endpoint/v1/graphql';
const JWT_SECRET = 'your-jwt-secret';

const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
    headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET
    }
});

exports.handler = async (event, context) => {
    const { email, password } = JSON.parse(event.body);

    const query = `
    query ($email: String!) {
      user(where: {email: {_eq: $email}}) {
        id
        password
      }
    }
  `;

    try {
        const data = await client.request(query, { email });
        const user = data.user[0];

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return {
                statusCode: 200,
                body: JSON.stringify({ error: 'Invalid email or password' })
            };
        }

        const token = jwt.sign({
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['user'],
                'x-hasura-default-role': 'user',
                'x-hasura-user-id': user.id
            }
        }, JWT_SECRET);

        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

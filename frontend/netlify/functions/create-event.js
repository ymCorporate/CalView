const { GraphQLClient } = require('graphql-request');

const HASURA_ADMIN_SECRET = 'your-hasura-admin-secret';
const HASURA_GRAPHQL_ENDPOINT = 'https://your-hasura-endpoint/v1/graphql';

const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
    headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET
    }
});

exports.handler = async (event, context) => {
    const { eventName, duration, locationType, locationDetail } = JSON.parse(event.body);

    const mutation = `
    mutation ($eventName: String!, $duration: Int!, $locationType: String!, $locationDetail: String!) {
      insert_kalenview_create_events_one(object: {event_name: $eventName, duration: $duration, location_type: $locationType, location_detail: $locationDetail}) {
        event_name
        duration
        location_type
        location_detail
        created_at
      }
    }
  `;

    try {
        await client.request(mutation, { eventName, duration, locationType, locationDetail });
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Failed to create event' })
        };
    }
};

import { gql } from 'graphql-request';

export const GET_SLOTS = `
    query GetSlots($day: String!, $eventName: String!) {
        availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
            start_time
            end_time
        }
    }
`;

import { gql } from 'graphql-request';

export const GET_AVAILABILITY = `
    query GetAvailability($eventName: String!) {
        availability(where: { event_name: { _eq: $eventName } }) {
            day
            start_time
            end_time
        }
    }
`;

export const UPSERT_AVAILABILITY = `
    mutation UpsertAvailability($day: String!, $startTime: String!, $endTime: String!, $eventName: String!, $user_uuid: uuid!) {
        insert_availability_one(
            object: { day: $day, start_time: $startTime, end_time: $endTime, event_name: $eventName,  uuid: $user_uuid},
            on_conflict: { constraint: availability_day_start_time_uuid_key, update_columns: [end_time] }
        ) {
            id
            day
            start_time
            end_time
            event_name
        }
    }
`;

export const DELETE_AVAILABILITY = `
    mutation DeleteAvailability($day: String!, $startTime: String!, $eventName: String!, $user_uuid: uuid!) {
        delete_availability(where: { day: { _eq: $day }, start_time: { _eq: $startTime }, event_name: { _eq: $eventName }, uuid: { _eq: $user_uuid } }) {
            affected_rows
        }
    }
`;

// export const GET_SLOTS = `
//     query GetSlots($day: String!, $eventName: String!) {
//         availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
//             start_time
//             end_time
//         }
//     }
// `;

import { gql } from 'graphql-request';

export const GET_SLOTS = `
    query GetSlots($day: String!, $eventName: String!, $date: date!) {
        availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
            start_time
            end_time
        }
        bookedslots(where: {day: {_eq: $day}, event_name: {_eq: $eventName}, date: {_eq: $date}}) {
            start_time
            end_time
        }
    }
`;


// bookedSlots: bookedslots(where: {day: {_eq: $day}, event_name: {_eq: $eventName}, date: {_eq: $date}}) {
//     start_time
//     end_time



// export const GET_SLOTS = `
//     query GetSlots($day: String!, $eventName: String!) {
//         availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
//             start_time
//             end_time
//         }
//     }
// `;

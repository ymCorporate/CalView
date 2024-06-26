import { gql } from 'graphql-request';

export const GET_EVENT_DETAIL = `
    query GetEventDetail($eventName: String!) {
        kalenview_create_events_by_pk(event_name: $eventName) {
            event_name
            location_type
            location_detail
            duration
        }
    }
`;

export const UPDATE_EVENT_DETAIL = `
    mutation UpdateEventDetail($eventName: String!, $data: kalenview_create_events_set_input!) {
        update_kalenview_create_events_by_pk(pk_columns: { event_name: $eventName }, _set: $data) {
            event_name
            location_type
            location_detail
            duration
        }
    }
`;

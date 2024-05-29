import { gql } from 'graphql-request';

export const GET_EVENT_DETAIL = `
  query GetEventDetail($eventName: String!, $user_uuid: uuid!) {
    kalenview_create_events(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}) {
      event_name
      location_detail
      location_type
      duration
    }
  }
`;

export const UPDATE_EVENT_DETAIL = `
  mutation UpdateEventDetail($eventName: String!, $data: kalenview_create_events_set_input!, $user_uuid: uuid!) {
    update_kalenview_create_events(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}, _set: $data) {
      returning {
        event_name
        location_type
        location_detail
        duration
      }
    }
  }
`;




export const GET_EVENT_AND_AVAILABILITY = `
  query GetEventAndAvailability($eventName: String!, $user_uuid: uuid!) {
    kalenview_create_events(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}) {
      event_name
      duration
      location_type
      location_detail
    }
    availability(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}) {
      day
      start_time
      end_time
    }
  }
`;


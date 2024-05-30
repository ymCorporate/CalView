export const GET_SLOTS = `
    query GetSlots($day: String!, $eventName: String!, $date: date!, $user_uuid: uuid!) {
    availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}, order_by: {start_time: asc}) {
      start_time
      end_time
    }
    bookedslots(where: {day: {_eq: $day}, event_name: {_eq: $eventName}, date: {_eq: $date}}) {
      start_time
      end_time
    }
  }`;
export const GetNameAndDuration = `
  query name_and_duration($eventName: String!, $user_uuid: uuid!) {
    kalenview_create_events(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}) {
      duration
    }
    kalenview(where: {uuid: {_eq: $user_uuid}}) {
      first_name
      last_name
    }
  }
`;
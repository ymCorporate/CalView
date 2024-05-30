

export const BOOK_SLOT = `
    mutation BookSlot($day: String!, $eventName: String!, $date: date!, $startTime: String!, $endTime: String!, $name: String!, $email: String!, $user_uuid: uuid!) {
        insert_bookedslots_one(object: { day: $day, event_name: $eventName, date: $date, start_time: $startTime, end_time: $endTime, bookername: $name, bookeremail: $email, uuid: $user_uuid }) {
            id
            day
            event_name
            date
            start_time
            end_time
            bookername
            bookeremail
        }
    }
`;



export const GetOrganizerEventDetails = `
  query OrganiszerEventDetails($eventName: String!, $user_uuid: uuid!) {
    kalenview_create_events(where: {event_name: {_eq: $eventName}, uuid: {_eq: $user_uuid}}) {
      location_type
      location_detail
      }
    kalenview(where: {uuid: {_eq: $user_uuid}}) {
        first_name
        last_name
      }
  }
`;

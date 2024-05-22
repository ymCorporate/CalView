

export const BOOK_SLOT = `
    mutation BookSlot($day: String!, $eventName: String!, $date: date!, $startTime: String!, $endTime: String!, $name: String!, $email: String!) {
        insert_bookedslots_one(object: { day: $day, event_name: $eventName, date: $date, start_time: $startTime, end_time: $endTime, bookername: $name, bookeremail: $email }) {
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

export const OrganizerName = `
query MyQuery {
    kalenview {
      first_name
      last_name
    }
  }
`;


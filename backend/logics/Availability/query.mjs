export class SetAvailabilitySchema {
    queryAvailability() {
        return `
        mutation MyMutation($day: String!, $startTime: String!, $endTime: String!, $eventName: String!) {
            insert_availability_one(object: {day: $day, start_time: $startTime, end_time: $endTime, event_name: $eventName}) {
              id
              day
              start_time
              end_time
              event_name
            }
          }
          `;
    }

    deleteAvailability() {
        return `
          mutation DeleteAvailability($day: String!, $startTime: String!, $eventName: String!) {
           delete_availability(where: {day: {_eq: $day}, start_time: {_eq: $startTime}, event_name: {_eq: $eventName}}) {
        affected_rows
    }
}`;
    }
}

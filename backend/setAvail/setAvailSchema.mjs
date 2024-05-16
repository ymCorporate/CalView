export class SetAvailabilitySchema {
    queryAvailability() {
        return `
          mutation UpsertAvailability($day: String!, $startTime: String!, $endTime: String!) {
            insert_availability_one(object: {day: $day, start_time: $startTime, end_time: $endTime}, 
            on_conflict: {constraint: availability_day_start_time_key, update_columns: [end_time]}) {
                id
                day
                start_time
                end_time
            }
        }`;
    }

    deleteAvailability() {
        return `
          mutation DeleteAvailability($day: String!, $startTime: String!) {
            delete_availability(where: {day: {_eq: $day}, start_time: {_eq: $startTime}}) {
                affected_rows
            }
        }`;
    }
}

import { gql } from 'graphql-request';

export class GetAvailabilitySchema {

    getAvailability() {
        return `
        query MyQuery($day: String!, $eventName: String!) {
            availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
                id
                day
                start_time
                end_time
                event_name
            }
        }
        `;
    }
}


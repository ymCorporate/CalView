export class GetSlotsQuery{
    get_slots(){
        return `
        query MyQuery($day: String!, $eventName: String!) {
            availability(where: {day: {_eq: $day}, event_name: {_eq: $eventName}}) {
              start_time
              end_time
            }
          }
        `;
    }
}
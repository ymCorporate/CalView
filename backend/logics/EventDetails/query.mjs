export class GetEventDetail{
    GetEvent(){
        return `
        query MyQuery($eventName: String!) {
            kalenview_create_events_by_pk(event_name: $eventName) {
              event_name
              location_type
              location_detail
              duration
            }
          }
        `;
    }
}
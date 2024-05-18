export class EditEventDetail{
    EditEvent(){
        return `
        mutation MyMutation($eventName: String!, $event_name: String!, $duration: Int!, $location_type: String!, $location_detail: String!) {
            update_kalenview_create_events_by_pk(pk_columns: {event_name: $eventName},
              _set: {event_name: $event_name, location_type: $location_type, location_detail: $location_detail, duration: $duration}) {
              event_name
              location_type
              location_detail
              duration
            }
          }
        `;
    }
}
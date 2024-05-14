export class CreateEventQuery{
    CreateEvent(){
        return `
        mutation MyMutation($eventName: String!, $duration: Int!, $locationType: String!, $locationDetail: String!) {
            insert_kalenview_create_events_one(object: {event_name: $eventName, duration: $duration, location_type: $locationType, location_detail: $locationDetail}) {
                    event_name
                    duration
                    location_type
                    location_detail
                    created_at
                }
            }
        `;
    }
}
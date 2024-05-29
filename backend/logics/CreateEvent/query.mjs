export class CreateEventQuery{
    CreateEvent(){
        return `
            mutation MyMutation($eventName: String!, $duration: Int!, $locationType: String!, $locationDetail: String!, $user_uuid: uuid!) {
                insert_kalenview_create_events_one(object: {event_name: $eventName, duration: $duration, location_type: $locationType, location_detail: $locationDetail, uuid: $user_uuid}) {
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
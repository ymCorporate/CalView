export const get_all_events = `
    query MyQuery {
        kalenview_create_events {
        event_name
        location_type
        duration
        location_detail
        }
    }
`;
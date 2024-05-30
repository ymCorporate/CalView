export const get_all_events = `
    query get_all_events($user_uuid: uuid!) {
        kalenview_create_events(where: {uuid: {_eq: $user_uuid}}) {
        event_name
        location_type
        duration
        location_detail
        }
    }
`;

// export const get_all_events = `
//     query MyQuery {
//         GetEvents {
//         duration
//         event_name
//         location_detail
//         location_type
//         }
//     }
// `;

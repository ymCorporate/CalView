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

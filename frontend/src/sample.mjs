// //  const { request, gql } = require('graphql-request');
// // const {GraphQLClient} = require('graphql-request');

// import { GraphQLClient} from 'graphql-request';


// const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
// const adminSecret = '123';

// const client = new GraphQLClient(hasuraEndpoint, {
//   headers: {
//       'x-hasura-admin-secret': adminSecret
//       // 'Authorization': `Bearer ${generateJwtToken()}`
//   },
// });

// // class KalenviewEvents{
// //     async fetchEvents(){
// //   const query = gql`
// //     query FetchEvents {
// //       events {
// //         id
// //         eventDateTime
// //         duration
// //         purpose
// //         venue
// //         description
// //       }
// //     }
// //   `

// //   try {
// //     const data = await request('http://localhost:8080/v1/graphql', query);
// //     return data;
// //     console.log(data);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };



// // // insertEvents


// // }

// const stime = new Date(2024,5,9,13,30);
// console.log(stime);
// console.log(stime.toISOString());
// const etime = new Date(2024,5,9,14)

// const query =`
// mutation MyMutation {
//     insert_kalenview_events_one(object: {
//       uuid: "4800efb7-8d59-4328-854c-6d92e15944b9",
//       title: "TEST 333333",
//       start_time: ${stime.toISOString()},
//       end_time: ${etime.toISOString()},
//       venue: "V TEST",
//       description: "D TEST"}) {
//       uuid
//       title
//       start_time
//       end_time
//       venue
//       description
//     }
//   }
// `;

// const insertEvents = async()=>{

//     try {
//         const data = await client.request(query);
//         return data;
//         // console.log(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

// // console.log(insertEvents());

















import { EventsQuery } from "./events.mjs";

const query = new EventsQuery();


// console.log(events());
// console.log(events());
// console.log(events());

(async () => {
  const events_1 = await query.readEvent();
  console.log(events_1);
  const convertedEvents = events_1.map(event => ({
    ...event,
    startDate: new Date(event.start),
    endDate: new Date(event.end)
  }));
  console.log(convertedEvents);
})()

// console.log(events_1);

//   const convertedEvents = events.map(event => ({
//     ...event,
//     startDate: new Date(event.start),
//     endDate: new Date(event.end)
//   }));
//   console.log(convertedEvents);
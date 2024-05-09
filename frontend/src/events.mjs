import { GraphQLClient } from 'graphql-request';

// GraphQL endpoint URL
const hasuraEndpoint = 'http://localhost:8080/v1/graphql';

// Hasura admin secret (if required)
const adminSecret = '123';

// Create a new GraphQL client instance
const client = new GraphQLClient(hasuraEndpoint, {
  headers: {
    'x-hasura-admin-secret': adminSecret
  }
});




export class EventsQuery{

  // Function to insert a new event with the current date and time
  async insertEvent() {
    try {
      // Create a new Date object representing the current date and time
      const startTime = new Date(2024,4,10,13,30);
      const endTime = new Date(2024,4,10,14);

      // Format the date as a string in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
      const formattedStartTime = startTime.toISOString();
      const formattedEndTime = endTime.toISOString();

      // GraphQL mutation to insert a new event
      const mutation = `
        mutation InsertEvent($startTime: timestamptz!, $endTime: timestamptz!) {
          insert_kalenview_events_one(object: {
            uuid: "4800efb7-8d59-4328-854c-6d92e15944b9",
            title: "TEST 1111",
            start: $startTime,
            end: $endTime,
            venue: "V TEST",
            description: "D TEST"
          }) {
            uuid
            title
            start
            end
            venue
            description
          }
        }
      `;

      // Provide the startTime variable as a parameter in the GraphQL request
      const variables = {
        startTime: formattedStartTime,
        endTime: formattedEndTime
      };

      // Execute the GraphQL mutation
      const data = await client.request(mutation, variables);
      // console.log('Event inserted successfully:');
      console.log(data);
    } catch (error) {
      console.error('Error inserting event:');
      console.error(error);
    }
  }

  // Call the insertEvent function to insert a new event

  // insertEvent();







  // Function to read a all event with the current date and time
  async readEvent() {
    try {

      // GraphQL mutation to insert a new event
      const fetch_events = `
      query MyQuery {
        kalenview_events {
          title
          start
          end
          venue
          description
        }
      }
      `;

      // Execute the GraphQL mutation
      const data = await client.request(fetch_events);
      // console.log('Event inserted successfully:');
      // console.log(data.kalenview_events);
      return data.kalenview_events;
    } catch (error) {
      console.error('Error fetching event:');
      console.error(error);
    }
  }

// Call the insertEvent function to insert a new event

// readEvent();


}

// const qery = new EventsQuery();
// // qery.readEvent();
// qery.insertEvent();






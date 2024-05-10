import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Hasura endpoint
const hasuraEndpoint = 'http://localhost:8080/v1/graphql';

// Create a new Apollo Client instance
const client = new ApolloClient({
  uri: hasuraEndpoint,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': '123',
  },
});

export class EventsQuery {
  // Function to read all events
  // async readEvent() {
  //   const query = gql`
  //     query MyQuery {
  //       kalenview_events {
  //         title
  //         start
  //         end
  //         venue
  //         description
  //       }
  //     }
  //   `;

  //   try {
  //     const { data } = await client.query({ query });
  //     return data.kalenview_events;
  //   } catch (error) {
  //     console.error('Error fetching event:', error);
  //   }
  // }



  // Function to read all events
  async readEvent() {
    const query = gql`
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

    try {
      const { data } = await client.query({ query });
      // Convert the start and end times to Date objects
      const events = data.kalenview_events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      return events;
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  }



  // Function to insert a new event
  async insertEvent(startTime, endTime, title, venue, description) {
    const mutation = gql`
      mutation InsertEvent($startTime: timestamptz!, $endTime: timestamptz!, $title: String!, $venue: String!, $description: String!) {
        insert_kalenview_events_one(object: {
          uuid: "4800efb7-8d59-4328-854c-6d92e15944b9",
          title: $title,
          start: $startTime,
          end: $endTime,
          venue: $venue,
          description: $description
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

    const variables = {
      startTime,
      endTime,
      title,
      venue,
      description,
    };

    try {
      const { data } = await client.mutate({ mutation, variables });
      console.log('Event inserted successfully:', data);
    } catch (error) {
      console.error('Error inserting event:', error);
    }
  }
}

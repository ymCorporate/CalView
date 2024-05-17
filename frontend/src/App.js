import React from 'react';
import './App.css';
import AvailabilityForm from './pages/AvailabiltyForm'; // adjust the path according to your project structure
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Calendar from "./pages/profileSection/profileSection";
import AppointmentSection from "./pages/appointmentSection/appointmentSection";


const client = new ApolloClient({
    uri: 'http://localhost:8080/v1/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                {/*<h1 style={{textAlign: "center"}}>Availability Selector</h1>*/}
                <AvailabilityForm />
                {/*<AppointmentSection />*/}
            </div>
        </ApolloProvider>
    );
}

export default App;

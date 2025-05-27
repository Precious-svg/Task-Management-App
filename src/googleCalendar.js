import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export const initGoogleClient = () => {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            clientId: CLIENT_ID,
            discoveryDocs: [DISCOVERY_DOC],
            scopes: SCOPES
        })
    })
}

export const signInWithGoogle = () => gapi.auth2.getAuthInstance().signIn();
 export const createCalendarEvent = (task) => {
    const event = {
        summary: task.title,
        description: task.details,
        start: {
            date: task.due_date
        },
        end: {
            date: task.due_date
        }
    };

    return gapi.client.calendar.event.insert({
        calendarId: 'primaary',
        resource: event
    });
 }
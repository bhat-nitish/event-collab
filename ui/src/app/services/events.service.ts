import { Event } from '../dto'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    events: Array<Event> = new Array<Event>();

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    get(url) {
        let headers = new HttpHeaders();
        let user = this.authService.getCurrentUser();
        let organizer = this.authService.getCurrentOrganizer();
        headers = headers.set('current_user', JSON.stringify(user)).append('current_organizer', JSON.stringify(organizer));
        return this.httpClient.get(url, { headers });
    }

    post(url, body) {
        let headers = new HttpHeaders();
        let user = this.authService.getCurrentUser();
        let organizer = this.authService.getCurrentOrganizer();
        headers = headers.set('current_user', JSON.stringify(user)).append('current_organizer', JSON.stringify(organizer));
        return this.httpClient.post(url, body, { headers });
    }

    delete(url) {
        let headers = new HttpHeaders();
        let user = this.authService.getCurrentUser();
        let organizer = this.authService.getCurrentOrganizer();
        headers = headers.set('current_user', JSON.stringify(user)).append('current_organizer', JSON.stringify(organizer));
        return this.httpClient.delete(url, { headers });
    }

    get_organized_events_view() {
        return this.get('http://localhost:3000/events/organized/chart')
    }

    get_upcoming_events() {
        return this.get("http://localhost:3000/events/upcoming");
    }

    get_organized_events() {
        return this.get("http://localhost:3000/events/organized");
    }

    get_organized_events_registration_history() {
        return this.get("http://localhost:3000/events/organized/history");
    }

    get_enrolled_events() {
        return this.get("http://localhost:3000/events/enrolled");
    }

    add_event(event: Event) {
        return this.post('http://localhost:3000/events', event);
    }

    delete_event(eventId: number) {
        return this.delete("http://localhost:3000/events/" + eventId);
    }

    get_interests() {
        return this.get('http://localhost:3000/events/interests');
    }

    join_event(event: Event) {
        return this.post('http://localhost:3000/events/join', event);
    }

    leave_event(event: Event) {
        return this.post('http://localhost:3000/events/leave', event);
    }

    get_current_user_name() {
        let user = this.authService.getCurrentUser();
        return user.name;
    }

    get_current_organizer_name() {
        let organizer = this.authService.getCurrentOrganizer();
        return organizer.name;
    }
}
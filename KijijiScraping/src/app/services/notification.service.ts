import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationType, Notification } from '../models/notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private subject = new Subject<Notification>();
    private subject1 = new Subject<Notification>();

    private idx = 0;

    constructor() {}

    getObservable(): Observable<Notification> {
        return this.subject.asObservable();
    }

    expireNotification(): Observable<Notification> {
        return this.subject1.asObservable();
    }

    info(title: string, message: string, timeout = 3000) {
        this.subject.next(
            new Notification(
                this.idx++,
                NotificationType.info,
                title,
                message,
                timeout
            )
        );
    }

    completion(
        id: number,
        title: string,
        message: string,
        isCompleted = false
    ) {
        this.subject1.next(
            new Notification(
                id,
                isCompleted ? NotificationType.success : NotificationType.wait,
                title,
                message,
                isCompleted ? 1000 : 100000
            )
        );
    }
    success(title: string, message: string, timeout = 3000) {
        this.subject.next(
            new Notification(
                this.idx++,
                NotificationType.success,
                title,
                message,
                timeout
            )
        );
    }

    warning(title: string, message: string, timeout = 3000) {
        this.subject.next(
            new Notification(
                this.idx++,
                NotificationType.warning,
                title,
                message,
                timeout
            )
        );
    }

    error(title: string, message: string, timeout = 0) {
        this.subject.next(
            new Notification(
                this.idx++,
                NotificationType.error,
                title,
                message,
                timeout
            )
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationType, Notification } from 'src/app/models/notification';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
    notifications: Notification[] = [];
    private subscription: Subscription;
    notificationTypes = NotificationType;
    constructor(private notificationSvc: NotificationService) {}

    private addNotification(notification: Notification) {
        this.notifications.push(notification);

        if (notification.timeout !== 0) {
            setTimeout(() => this.close(notification), notification.timeout);
        }
    }

    ngOnInit() {
        this.subscription = this.notificationSvc
            .getObservable()
            .subscribe(notification => this.addNotification(notification));

        this.subscription = this.notificationSvc
            .expireNotification()
            .subscribe(notification => {
                if (this.notifications.find(n => n.id === notification.id)) {
                    this.close(notification);
                    if (notification.type !== NotificationType.success) {
                        notification.timeout = 2000;
                        notification.type = NotificationType.error;
                    }
                    this.addNotification(notification);
                } else {
                    this.addNotification(notification);
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    close(notification: Notification) {
        this.notifications = this.notifications.filter(
            notif => notif.id !== notification.id
        );
    }

    className(notification: Notification): string {
        let style: string;
        switch (notification.type) {
            case NotificationType.success:
                style = 'success';
                break;

            case NotificationType.warning:
                style = 'warning';
                break;

            case NotificationType.error:
                style = 'error';
                break;

            default:
                style = 'info';
                break;
        }

        return style;
    }
}

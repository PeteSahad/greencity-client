import {Platform} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {PushNotification} from 'ionic-native';
import 'rxjs/add/operator/map';

/*
 Generated class for the Reminder provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ReminderService {

  push: PushNotification;
  registrationId: string;

  constructor(platform: Platform) {
    console.log('reminder startet');
    platform.ready().then(() => {

    });
  }

  registerHandlers() {

  }

}

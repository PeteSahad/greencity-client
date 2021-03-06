import {DailytippProvider} from './../../.tmp/providers/dailytipp-provider';
import {ChallengeDetailPage} from './../pages/challenge-detail/challenge-detail';
import {RankingPage} from './../pages/ranking/ranking';
import {RegisterPage} from './../../.tmp/pages/register/register';
import {StatisticsPage} from './../pages/statistics/statistics';
import {PostPage} from './../pages/post/post';
import {UserService} from './../services/user-service';

import {CouponsPage} from './../pages/coupons/coupons';
import {ChallengesPage} from './../pages/challenges/challenges';

import {AuthProvider} from './../providers/auth-provider';
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar, Splashscreen, Push, LocalNotifications} from 'ionic-native';

// import page
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {SettingPage} from '../pages/setting/setting';


@Component({
  templateUrl: 'app.component.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    {
      title: 'Quests',
      icon: 'ios-browsers-outline',
      count: 0,
      component: ChallengesPage
    },
    {
      title: 'Gutscheine',
      icon: 'ios-person-outline',
      count: 0,
      component: CouponsPage
    },
    {
      title: 'Rangliste',
      icon: 'trophy',
      count: 0,
      component: RankingPage
    },
    {
      title: 'Statistiken',
      icon: 'ios-pie-outline',
      count: 0,
      component: StatisticsPage
    },
    {
      title: 'Einstellungen',
      icon: 'ios-settings-outline',
      count: 0,
      component: SettingPage
    }
  ];

  constructor(public platform: Platform, public auth: AuthProvider, protected userService: UserService, protected tipp: DailytippProvider) {
    if (auth.user == undefined) {
      this.rootPage = RegisterPage;
    } else {
      this.rootPage = HomePage;
    }

    // show splash screen
    Splashscreen.show();

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let push = Push.init({
        android: {
          senderID: '815643392992'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {}
      });

      if (push.on) {

        push.on('registration', (data) => {
          this.auth.registrationId = data.registrationId;
        });

        push.on('notification', (response: any) => {

          let data = response.additionalData;

          if (!response.additionalData.foreground) {
            return;
          }

          if (data.postId != undefined) {
            this.nav.push(PostPage, {id: parseInt(data.postId)});
          } else if (data.challengeId != undefined) {
            this.nav.push(ChallengeDetailPage, {id: parseInt(data.challengeId)});
          }


        })

        push.on('error', (e) => {
          console.log(e.message);
        });
      }

      if (this.auth.user != undefined && this.auth.user.created_at != undefined) {

        let date = new Date(this.auth.user.created_at);
        date = new Date();

        LocalNotifications.schedule({
          id: 1,
          title: 'Umfrage',
          text: 'Bitte nimm an der Umfrage teil.',
          at: new Date(date.getTime() + (3600000))
        })


        LocalNotifications.schedule({
          id: 2,
          title: 'Umfrage',
          text: 'Bitte nimm an der Umfrage teil.',
          at: new Date(date.getTime() + (2 * 604800 * 1000 * 2))
        })


        LocalNotifications.schedule({
          id: 3,
          title: 'Umfrage',
          text: 'Bitte nimm an der Umfrage teil.',
          at: new Date(date.getTime() + (2 * 604800 * 1000 * 3))
        })


        LocalNotifications.schedule({
          id: 4,
          title: 'Umfrage',
          text: 'Bitte nimm an der Umfrage teil.',
          at: new Date(date.getTime() + (2 * 604800 * 1000 * 4))
        })


        LocalNotifications.schedule({
          id: 5,
          title: 'Umfrage',
          text: 'Bitte nimm an der Umfrage teil.',
          at: new Date(date.getTime() + (2 * 604800 * 1000 * 5))
        })


        LocalNotifications.on("click", (notification, state) => {

          this.tipp.showShowSurvey();
        });

      }


      // hide splash screen
      this.hideSplashScreen();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // on click, go to user timeline
  viewUser(userId) {
    this.nav.push(UserPage, {id: userId})
  }

  // hide splash screen
  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }
}


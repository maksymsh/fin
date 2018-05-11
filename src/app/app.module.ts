import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../env';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {UtilsProvider} from '../providers/utils/utils';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {OutgoPage} from '../pages/outgo/outgo';
import {DeptPage} from '../pages/dept/dept';
import {TodoPage} from '../pages/todo/todo';
import {TobuyPage} from '../pages/tobuy/tobuy';
import {OutgoFormPage} from '../pages/outgo-form/outgo-form';
import {DeptFormPage} from '../pages/dept-form/dept-form';
import {TodoFormPage} from '../pages/todo-form/todo-form';
import {TobuyFormPage} from '../pages/tobuy-form/tobuy-form';
import {TabsPage} from '../pages/tabs/tabs';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

// the second parameter 'fr' is optional
registerLocaleData(localeUk, 'uk');

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        TabsPage,
        HomePage,
        OutgoPage,
        DeptPage,
        TodoPage,
        TobuyPage,
        OutgoFormPage,
        DeptFormPage,
        TodoFormPage,
        TobuyFormPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        TabsPage,
        HomePage,
        OutgoPage,
        DeptPage,
        TodoPage,
        TobuyPage,
        OutgoFormPage,
        DeptFormPage,
        TodoFormPage,
        TobuyFormPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        { provide: LOCALE_ID, useValue: "uk" },
        UtilsProvider,
        AngularFireDatabase,
    ]
})
export class AppModule {
}

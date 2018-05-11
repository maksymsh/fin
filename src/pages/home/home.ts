import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    static title = "NERPA";

    timeNow: Date = new Date();
    timeToday: Date;
    timeWeek: Date;
    timeMonth: Date;
    timeYear: Date;

    outgo_today: number = 0;
    outgo_week: number = 0;
    outgo_month: number = 0;
    outgo_year: number = 0;

    constructor(
        public actionSheetCtrl: ActionSheetController,
        public nav: NavController,
        public navParams: NavParams,
        private db: AngularFireDatabase
    ) {
        this.setToday();
        this.setWeek();
        this.setMonth();
        this.setYear();

        this.db.list('outgos', ref => ref.orderByChild('time'))
            .valueChanges().subscribe(outgos => outgos.map(outgo => {

            if (parseInt(outgo['time']) >= this.timeToday.getTime()) {
                this.outgo_today += parseFloat(outgo['amount']);
            }

            if (parseInt(outgo['time']) >= this.timeWeek.getTime()) {
                this.outgo_week += parseFloat(outgo['amount']);
            }

            if (parseInt(outgo['time']) >= this.timeMonth.getTime()) {
                this.outgo_month += parseFloat(outgo['amount']);
            }

            if (parseInt(outgo['time']) >= this.timeYear.getTime()) {
                this.outgo_year += parseFloat(outgo['amount']);
            }
        }));
    }

    openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Додати',
            buttons: [
                {
                    text: 'Витрату',
                    handler: () => {
                        this.nav.push(OutgoFormPage);
                    }
                }, {
                    text: 'Борг',
                    handler: () => {
                        this.nav.push(DeptFormPage);
                    }
                }, {
                    text: 'Зробити',
                    handler: () => {
                        this.nav.push(TodoFormPage);
                    }
                }, {
                    text: 'Купити',
                    handler: () => {
                        this.nav.push(TobuyFormPage);
                    }
                }
            ]
        });
        actionSheet.present();
    }



    setToday() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        this.timeToday = date;
    }

    setWeek() {
        let date = new Date();
        let day = date.getDay() || 7;
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        date.setHours(0, 0, 0, 0);
        this.timeWeek = date;
    }


    setMonth() {
        let date = new Date(this.timeNow.getFullYear(), this.timeNow.getMonth(), 1);
        this.timeMonth = date;
    }

    setYear() {
        let date = new Date(this.timeNow.getFullYear(), 1, 1);
        this.timeYear = date;
    }
}

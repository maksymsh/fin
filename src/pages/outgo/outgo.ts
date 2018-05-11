import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";

@Component({
    selector: 'page-outgo',
    templateUrl: 'outgo.html',
})
export class OutgoPage {
    static title = "Витрати";

    period: any;

    outgoTypes: any;
    outgos: any;

    outgoByType: Array<{}>;

    timeNow: Date = new Date();
    timeToday: Date;
    timeWeek: Date;
    timeMonth: Date;
    timeYear: Date;

    dateFrom: number;
    dateTo: number;

    filterFrom: string;
    filterTo: string;

    constructor(
        public actionSheetCtrl: ActionSheetController,
        public nav: NavController,
        private db: AngularFireDatabase
    ) {
        let self = this;

        this.setToday();
        this.setWeek();
        this.setMonth();
        this.setYear();

        this.dateFrom = this.timeMonth.getTime();
        this.dateTo = this.timeNow.getTime();

        this.filterFrom = (this.timeMonth.getMonth()+1) + '/' + this.timeMonth.getDate() + '/' +  this.timeMonth.getFullYear();
        this.filterTo = (this.timeNow.getMonth()+1) + '/' + this.timeNow.getDate() + '/' +  this.timeNow.getFullYear();


        self.outgoByType = [];

        this.db.list('outgo_types', ref => ref.orderByChild('order'))
            .snapshotChanges().subscribe(types => {

            self.outgoTypes = types.map(outgoType => {
                const data = outgoType.payload.val();
                const key = outgoType.payload.key;
                return { key, ...data };
            });

            let outgoByType = [];

            self.db.list('outgos', ref => ref.orderByChild('time').startAt(self.dateFrom).endAt(self.dateTo))
                .valueChanges().subscribe(outgos => {
                self.outgos = outgos.map(outgo => {
                    const typeName = self.outgoTypes.find(ot => ot.key === outgo['type']).name;

                    if(outgoByType[outgo['type']]){
                        outgoByType[outgo['type']]['amount'] += outgo['amount'];
                    } else {
                        outgoByType[outgo['type']] = {
                            amount: outgo['amount'],
                            name: typeName
                        }
                    }
                    return { typeName, ...outgo };
                }).reverse();

                for(let i in outgoByType){
                    self.outgoByType.push(outgoByType[i])
                }

                console.log(outgoByType);
                console.log(self.outgoByType);
            })

        })


    }

    periodChange(){
        console.log(this.period);
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

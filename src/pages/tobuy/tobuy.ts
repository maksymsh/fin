import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";

@Component({
  selector: 'page-tobuy',
  templateUrl: 'tobuy.html',
})
export class TobuyPage {
    tobuys:any;

  constructor(
      public actionSheetCtrl: ActionSheetController,
      public nav: NavController,
      public navParams: NavParams,
      private db: AngularFireDatabase
  ) {
      this.db.list('tobuys', ref => ref.orderByChild('time'))
          .valueChanges().subscribe(tobuys => {
          this.tobuys = tobuys;
      })
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


}

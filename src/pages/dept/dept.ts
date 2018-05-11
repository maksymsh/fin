import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-dept',
  templateUrl: 'dept.html',
})
export class DeptPage {
    depts: any;

  constructor(
      public actionSheetCtrl: ActionSheetController,
      public nav: NavController,
      private db: AngularFireDatabase
  ) {
      let self = this;

      this.db.list('depts', ref => ref.orderByChild('time'))
          .snapshotChanges().subscribe(depts => {

          self.depts = depts.map(dept => {
              const data = dept.payload.val();
              const key = dept.payload.key;
              return { key, ...data };
          });

      })
  }


    openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Додати',
            buttons: [
                {
                    text: 'Витрату',
                    handler: () => {
                        this.nav.setRoot(OutgoFormPage);
                    }
                }, {
                    text: 'Борг',
                    handler: () => {
                        this.nav.setRoot(DeptFormPage);
                    }
                }, {
                    text: 'Зробити',
                    handler: () => {
                        this.nav.setRoot(TodoFormPage);
                    }
                }, {
                    text: 'Купити',
                    handler: () => {
                        this.nav.setRoot(TobuyFormPage);
                    }
                }
            ]
        });
        actionSheet.present();
    }

}

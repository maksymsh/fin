import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";
import {AngularFireDatabase} from "angularfire2/database";
import {UtilsProvider} from "../../providers/utils/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeptPage} from "../dept/dept";

@Component({
  selector: 'page-dept-form',
  templateUrl: 'dept-form.html',
})
export class DeptFormPage {

    private deptForm: FormGroup;

  constructor(
      public actionSheetCtrl: ActionSheetController,
      public nav: NavController,
      private formBuilder: FormBuilder,
      private db: AngularFireDatabase,
      public utils: UtilsProvider,
  ) {
      this.deptForm = this.formBuilder.group({
          amount: ['', Validators.compose([Validators.pattern(/^-?\d*(\.\d+)?$/), Validators.required])],
          comment: ['', Validators.compose([Validators.required])],
      });


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

    addDept() {
        this.db.list('depts')
            .push({
                amount: this.deptForm.value.amount,
                comment: this.deptForm.value.comment,
                time: new Date().getTime(),
            })
            .then(res => {
                this.utils.showToast('You are successfully logged in');
                this.nav.setRoot(DeptPage);
            });
    }

}

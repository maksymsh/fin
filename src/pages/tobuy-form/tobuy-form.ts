import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {UtilsProvider} from "../../providers/utils/utils";
import {DeptFormPage} from "../dept-form/dept-form";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoFormPage} from "../todo-form/todo-form";
import {TobuyPage} from "../tobuy/tobuy";

@Component({
    selector: 'page-tobuy-form',
    templateUrl: 'tobuy-form.html',
})
export class TobuyFormPage {
    private tobuyForm: FormGroup;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        public nav: NavController,
        private formBuilder: FormBuilder,
        private db: AngularFireDatabase,
        public utils: UtilsProvider,
    ) {

        this.tobuyForm = this.formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            price: [''],
            comment: [''],
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

    addTobuy() {
        this.db.list('tobuys')
            .push({
                title: this.tobuyForm.value.title,
                price: this.tobuyForm.value.price,
                comment: this.tobuyForm.value.comment,
                time: new Date().getTime(),
            })
            .then(res => {
                this.utils.showToast('You are successfully logged in');
                this.nav.push(TobuyPage);
            });
    }

}

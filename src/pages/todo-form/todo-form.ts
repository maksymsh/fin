import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {UtilsProvider} from "../../providers/utils/utils";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {OutgoFormPage} from "../outgo-form/outgo-form";
import {TodoPage} from "../todo/todo";

@Component({
    selector: 'page-todo-form',
    templateUrl: 'todo-form.html',
})

export class TodoFormPage {
    private todoForm: FormGroup;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        public nav: NavController,
        private formBuilder: FormBuilder,
        private db: AngularFireDatabase,
        public utils: UtilsProvider,
    ) {

        this.todoForm = this.formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
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

    addTodo() {
        this.db.list('todos')
            .push({
                title: this.todoForm.value.title,
                comment: this.todoForm.value.comment,
                time: new Date().getTime(),
            })
            .then(res => {
                this.utils.showToast('You are successfully logged in');
                this.nav.push(TodoPage);
            });
    }

}

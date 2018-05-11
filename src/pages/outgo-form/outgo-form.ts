import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {UtilsProvider} from "../../providers/utils/utils";
import {OutgoPage} from "../outgo/outgo";
import {TobuyFormPage} from "../tobuy-form/tobuy-form";
import {DeptFormPage} from "../dept-form/dept-form";
import {TodoFormPage} from "../todo-form/todo-form";

@Component({
    selector: 'page-outgo-form',
    templateUrl: 'outgo-form.html',
})
export class OutgoFormPage {

    private outgoForm: FormGroup;

    outgoTypes:any;

    manualType: boolean;

    constructor(
        public nav: NavController,
        public actionSheetCtrl: ActionSheetController,
        private formBuilder: FormBuilder,
        private db: AngularFireDatabase,
        public utils: UtilsProvider,
    ) {

        this.outgoForm = this.formBuilder.group({
            amount: ['', Validators.compose([Validators.pattern(/^-?\d*(\.\d+)?$/), Validators.required])],
            type: ['', Validators.compose([Validators.required])],
            type_manual: [''],
        });

        this.db.list('outgo_types', ref => ref.orderByChild('order'))
            .snapshotChanges().subscribe(types => {
                this.outgoTypes = types.map(outgoType => {
                    const data = outgoType.payload.val();
                    const key = outgoType.payload.key;
                    return { key, ...data };
                });
        })
    }

    changeCategory(){
        this.manualType = this.outgoForm.value.type == 0;
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

    addOutgo() {
        if(this.outgoForm.value.type_manual){
            this.db.list('outgo_types')
                .push({
                    name: this.outgoForm.value.type_manual,
                })
                .then(res => {
                    this.db.list('outgos')
                        .push({
                            amount: this.outgoForm.value.amount,
                            type: res.key,
                            time: new Date().getTime(),
                        })
                        .then(res => {
                            this.utils.showToast('You are successfully logged in');
                            this.nav.setRoot(OutgoPage);
                        });
                });
        } else {
            this.db.list('outgos')
                .push({
                    amount: this.outgoForm.value.amount,
                    type: this.outgoForm.value.type,
                    time: new Date().getTime(),
                })
                .then(res => {
                    this.utils.showToast('You are successfully logged in');
                    this.nav.setRoot(OutgoPage);
                });
        }

    }

}

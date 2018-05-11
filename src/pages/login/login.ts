import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {UtilsProvider} from '../../providers/utils/utils';
import {TabsPage} from '../tabs/tabs';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    private loginForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, public utils: UtilsProvider, public plt: Platform) {
		this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    doLogin() {
        this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
            .then(res => this.handleResponse())
            .catch(err => this.handleError(err));
    }

    handleResponse() {
        this.utils.showToast('You are successfully logged in');
        this.navCtrl.setRoot(TabsPage);
    }

    handleError(err) {
        this.utils.showToast(err.message)
    }

}

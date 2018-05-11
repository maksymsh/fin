import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, Nav} from 'ionic-angular';
import {HomePage} from "../home/home";
import {OutgoPage} from "../outgo/outgo";
import {TodoPage} from "../todo/todo";
import {TobuyPage} from "../tobuy/tobuy";
import {DeptPage} from "../dept/dept";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    homePage: any;
    outgoPage: any;
    todoPage: any;
    tobuyPage: any;
    deptPage: any;

    constructor(
        public actionSheetCtrl: ActionSheetController,
    ) {
        this.rootPage = HomePage;

        this.homePage = HomePage;
        this.outgoPage = OutgoPage;
        this.todoPage = TodoPage;
        this.tobuyPage = TobuyPage;
        this.deptPage = DeptPage;
    }

    openPage(page) {
        this.nav.push(page);
    }
}

import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lang: any;

    constructor(public translate: TranslateService) {
        this.translate.setDefaultLang('en');
        // this.translate.use('de');
    }

    switchLanguage() {
        this.translate.use(this.lang);
    }
}

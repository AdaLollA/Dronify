import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lang: any;
    unitFactor = 0.001;
    weight: number;

    energy: number;
    maxHeight: number;
    percentOfAllowedPowerAtMaxAlt: number;

    govHeight = 30; // as regulated by the austrian government in most cities
    govEnergy = 79; // as regulated by the austrian government in most cities

    constructor(public translate: TranslateService) {
        this.translate.setDefaultLang('en');
        // this.translate.use('de');
    }

    switchLanguage() {
        this.translate.use(this.lang);
    }

    update() {
        if (this.unitFactor && this.weight) {
            this.energy = this.weight * this.unitFactor * this.govHeight * 9.81;

            this.percentOfAllowedPowerAtMaxAlt = this.energy / (this.govEnergy / 100);

            this.maxHeight = this.percentOfAllowedPowerAtMaxAlt > 100 ?
                this.govHeight - this.govHeight * (this.percentOfAllowedPowerAtMaxAlt/100 - 1)
                : this.govHeight;

            console.log('---');
            console.log('e: '+this.energy);
            console.log('h: '+this.maxHeight); // todo if maxheight is negative the drone is illegal to be flown
            console.log('p: '+this.percentOfAllowedPowerAtMaxAlt);
        }
    }

    updateUnit($event: CustomEvent) {
        this.unitFactor = $event.detail.value == 'g' ? 0.001 : 1;
        this.update();
    }

    updateWeight($event: CustomEvent) {
        this.weight = $event.detail.value;
        this.update();
    }

    updateGovEnergy($event: CustomEvent) {
        this.govEnergy = $event.detail.value;
        this.update();
    }

    updateGovHeight($event: CustomEvent) {
        this.govHeight = $event.detail.value;
        this.update();
    }
}

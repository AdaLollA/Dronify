import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    // inputs
    lang: any;
    unitFactor = 0.001;
    weight: number;
    govHeight = 30; // as regulated by the austrian government in most cities
    govEnergy = 79; // as regulated by the austrian government in most cities

    // results
    energy: number;
    maxHeight: number;
    percentOfAllowedPowerAtMaxAlt: number;

    // ui managing results
    resultClass;
    resultClassAllowed = 'result-card-allowed';
    resultClassForbidden = 'result-card-forbidden';

    /**
     * Sets the default language to english
     */
    constructor(public translate: TranslateService) {
        this.translate.setDefaultLang('en');
    }

    /**
     * Can be used to switch the default language of the page.
     */
    switchLanguage() {
        this.translate.use(this.lang);
    }

    /**
     * Recalculates the final result based on changes made on the user interface. Should therefore be called whenever
     * an input is made and/or changed.
     */
    update() {
        if (this.unitFactor && this.weight) {
            this.energy = this.weight * this.unitFactor * this.govHeight * 9.81;

            this.percentOfAllowedPowerAtMaxAlt = this.energy / (this.govEnergy / 100);

            this.maxHeight = this.percentOfAllowedPowerAtMaxAlt > 100 ?
                this.govHeight - this.govHeight * (this.percentOfAllowedPowerAtMaxAlt/100 - 1)
                : this.govHeight;

            this.resultClass = this.maxHeight > 0 ? this.resultClassAllowed : this.resultClassForbidden;
        }
    }

    /**
     * Handles the unit changes between kg and g and sets the factors for further calculations.
     *
     * @param $event Event data that contains the selected modifier ('g' or 'kg')
     */
    updateUnit($event: CustomEvent) {
        this.unitFactor = $event.detail.value == 'g' ? 0.001 : 1;
        this.update();
    }

    /**
     * Handles changes made to the weight user interface inputs.
     *
     * @param $event Event data that contains the modified value.
     */
    updateWeight($event: CustomEvent) {
        this.weight = $event.detail.value;
        this.update();
    }

    /**
     * Handles changes made to the government regulated energy specifications in the user interface inputs.
     *
     * @param $event Event data that contains the modified value.
     */
    updateGovEnergy($event: CustomEvent) {
        this.govEnergy = $event.detail.value;
        this.update();
    }

    /**
     * Handles changes made to the government regulated maximum height specifications in the user interface inputs.
     *
     * @param $event Event data that contains the modified value.
     */
    updateGovHeight($event: CustomEvent) {
        this.govHeight = $event.detail.value;
        this.update();
    }

    /**
     * Rounds a number to have less comma space wasted in the user interface.
     *
     * @param num The number that is to be rounded.
     */
    round(num): number {
        return Math.round(num * 100) / 100
    }

    /**
     * Sets the weight based on the available, pre-defined drone choices.
     *
     * @param num The weight that corresponds to the selected drone.
     */
    setWeight(num: number) {
        this.weight = num;
        this.update();
    }
}

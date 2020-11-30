"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstalmentFrequency;
(function (InstalmentFrequency) {
    InstalmentFrequency[InstalmentFrequency["Daily"] = 0] = "Daily";
    InstalmentFrequency[InstalmentFrequency["Weekly"] = 1] = "Weekly";
    InstalmentFrequency[InstalmentFrequency["Fortnightly"] = 2] = "Fortnightly";
    InstalmentFrequency[InstalmentFrequency["FourWeekly"] = 3] = "FourWeekly";
    InstalmentFrequency[InstalmentFrequency["Monthly"] = 4] = "Monthly";
    InstalmentFrequency[InstalmentFrequency["Quarterly"] = 5] = "Quarterly";
    InstalmentFrequency[InstalmentFrequency["Annually"] = 6] = "Annually";
})(InstalmentFrequency || (InstalmentFrequency = {}));
exports.default = InstalmentFrequency;

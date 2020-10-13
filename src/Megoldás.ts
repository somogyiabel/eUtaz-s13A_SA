import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelszállásJegy";

export default class Megoldás {
    private _utasadatok: Felszállás[] = [];

    public get felszallokSzama(): number {
        return this._utasadatok.length;
    }
    public get ervenytelenFelszallas(): number {
        return this._utasadatok.filter(x => !x.ervenyesFelszallas).length;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const aktTipus: string = aktSor.split(" ")[3];
                if (aktTipus === "JGY") {
                    this._utasadatok.push(new FelszállásJegy(aktSor));
                } else if (["FEB", "NYB", "TAB", "RVS", "GYK", "NYP"].includes(aktTipus)) {
                    this._utasadatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}

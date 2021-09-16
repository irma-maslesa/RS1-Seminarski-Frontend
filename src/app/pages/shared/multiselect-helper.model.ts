import { SelectItem } from "./select-item.model";

export class MultiselectHelper {
    dropdownList: SelectItem[];
    selectedItems: SelectItem[];

    constructor() {
        this.dropdownList = [];
        this.selectedItems = [];
    }
}
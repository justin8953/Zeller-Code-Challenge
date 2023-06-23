type Items = {
    ipd: number;
    mbp: number;
    atv: number;
    vga: number;
}
type ItemsPrice = {
    ipd: number;
    mbp: number;
    atv: number;
    vga: number;
}
type PricingRules = {
    itemsPrice: ItemsPrice;
    bundle: (itemPrice:ItemsPrice | undefined , items: Items | undefined) => number;
    ipd: (price:number, num:number) => number;
    mbp: (price:number, num:number) => number;
    atv: (price:number, num:number) => number;
    vga: (price:number, num:number) => number;
}

export class Checkout {
    items: Items
    itemsPrice: ItemsPrice
    rules: PricingRules
    constructor(pricingRules: PricingRules){   
        this.items = {
            ipd:0,
            mbp:0,
            atv:0,
            vga:0
        }
        this.itemsPrice = pricingRules.itemsPrice
        this.rules = pricingRules
    }

    scan (item: string){
        if(item === "ipd"){
            this.items.ipd= this.items.ipd + 1
        }
        else if (item === "mbp"){
            this.items.mbp = this.items.mbp + 1
        }
        else if (item === "atv"){
            this.items.atv = this.items.atv + 1
        }
        else if (item === "vga"){
            this.items.vga = this.items.vga + 1
        }
        else{
            console.warn("unknown item")
        }
    }
    total():number{
        let total = 0 
        total = total + this.rules.bundle(this.itemsPrice, this.items)
        total = total + this.rules.ipd(this.itemsPrice.ipd, this.items.ipd)
        total = total + this.rules.mbp(this.itemsPrice.mbp, this.items.mbp)
        total = total + this.rules.atv(this.itemsPrice.atv, this.items.atv)
        total = total + this.rules.vga(this.itemsPrice.vga, this.items.vga)
        return total
    }

    


}

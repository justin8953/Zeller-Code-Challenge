
const { Checkout } = require("../checkout");

describe("Rule 1",()=>{
    const pricingRules = {
        itemsPrice: {
            ipd: 549.99,
            mbp: 1399.99,
            atv: 109.50,
            vga: 30.00
        },
        bundle: () => {
            return 0;
        },
        ipd: (price, num) => {
            if (num >= 4) {
                return num * 499.99;
            }
            else {
                return num * price;
            }
        },
        atv: (price, num) => {
            const numFree = Math.floor(num / 3);
            return (num - numFree) * price;
        },
        mbp:  (price, num) => {
            return num * price;
        },
        vga: (price, num) => {
            return num * price;
        }
    }
    test("Buy Four Apple TV", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(249.00);
    })
    
    test("Buy Two Apple TV and Five Ipad", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        expect(co.total()).toBe(2718.95);
    })
    
    test("Buy Two Apple TV and Two VGA", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("vga");
        co.scan("vga");
        co.scan("atv");
        expect(co.total()).toBe(279.00);
    })
    
    test("Buy Three Apple TV and One Macbook pro", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("mbp");
        co.scan("atv");
        expect(co.total()).toBe(1618.99);
    })
    
    test("Scan unknown", () => {
        const co = new Checkout(pricingRules);
        co.scan("dell-monitor");
        expect(co.total()).toBe(0);
    })
})
describe("Rule 2",()=>{
    const pricingRules = {
        itemsPrice: {
            ipd: 549.99,
            mbp: 1399.99,
            atv: 109.50,
            vga: 30.00
        },
        bundle: (itemPrices, items) => {
            if(itemPrices === undefined || items === undefined)
            {
                return 0;
            }
            // buy 1 mbp get 1 vga free
            if(items.mbp >= 1 && items.vga >= 1){
                const numFree = Math.min(items.mbp, items.vga);
                items.mbp -= numFree;
                items.vga -= numFree;
                return numFree * itemPrices.mbp;
            }
            return 0;
        },
        ipd: (price, num) => {
            // buy 4 or more ipd get 499.99 each
            if (num >= 4) {
                return num * 499.99;
            }
            else {
                return num * price;
            }
        },
        atv: (price, num) => {
            // buy 3 atv get 1 free
            const numFree = Math.floor(num / 3);
            return (num - numFree) * price;
        },
        mbp:  (price, num) => {
            return num * price;
        },
        vga: (price, num) => {
            return num * price;
        }
    }
    test("Buy Four Apple TV", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(249.00);
    })
    
    test("Buy Two Apple TV and Five Ipad", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        expect(co.total()).toBe(2718.95);
    })
    
    test("Buy Two Apple TV and Two VGA", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("vga");
        co.scan("vga");
        co.scan("atv");
        expect(co.total()).toBe(279.00);
    })
    
    test("Buy Three Apple TV and One Macbook pro", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("mbp");
        co.scan("atv");
        expect(co.total()).toBe(1618.99);
    })
    test("Buy Three Apple TV, One Macbook pro and One VGA", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("mbp");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(1618.99);
    })
    
    test("Buy Three Apple TV, One Macbook pro and Two VGA", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("mbp");
        co.scan("atv");
        co.scan("vga");
        co.scan("vga");
        expect(co.total()).toBe(1648.99);
    })
    test("Scan unknown", () => {
        const co = new Checkout(pricingRules);
        co.scan("dell-monitor");
        expect(co.total()).toBe(0);
    })
})


export type MenuItem = { id:string; category:string; name:string; description:string; price:number; note?:string };
export const menu: MenuItem[] = [
 {id:'espresso',category:'Coffee',name:'Velvet Espresso',description:'Double shot, dark chocolate, orange peel.',price:240,note:'House signature'},
 {id:'cappuccino',category:'Coffee',name:'Cloud Cappuccino',description:'Vanilla, sea salt and impossibly soft microfoam.',price:320},
 {id:'flatwhite',category:'Coffee',name:'Midnight Flat White',description:'Silky milk, 20g house blend and cacao finish.',price:300},
 {id:'affogato',category:'Coffee',name:'Golden Affogato',description:'Vanilla gelato drowned in a double espresso.',price:360},
 {id:'matcha',category:'Cold',name:'Ceremonial Matcha',description:'Uji matcha, oat milk and a cold cloud.',price:340},
 {id:'tonic',category:'Cold',name:'Espresso Tonic',description:'Citrus tonic, double espresso and rosemary.',price:310},
 {id:'tiramisu',category:'Dessert',name:'Midnight Tiramisu',description:'Mascarpone, cacao and our house espresso.',price:390,note:'Best seller'},
 {id:'croissant',category:'Bakery',name:'Almond Croissant',description:'French butter pastry, almond cream and sugar.',price:260},
 {id:'sandwich',category:'Kitchen',name:'Truffle Melt',description:'Sourdough, three cheeses, truffle and herbs.',price:460},
 {id:'pasta',category:'Kitchen',name:'Cacio e Pepe',description:'Bronze-cut pasta, pecorino, pepper and lemon.',price:520},
];
export const categories = ['All','Coffee','Cold','Bakery','Kitchen','Dessert'];

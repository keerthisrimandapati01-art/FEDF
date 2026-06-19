import type { LucideIcon } from "lucide-react";
import { Leaf, Drumstick, Sprout, Cookie, Crown } from "lucide-react";

export type Meal = {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: LucideIcon;
  tag: string;
};

export const meals: Meal[] = [
  { id: "veg",     name: "Garden Vegetarian", desc: "Seasonal vegetables, basmati rice, paneer",       price: 12, icon: Leaf,     tag: "Veg" },
  { id: "nonveg",  name: "Grilled Chicken",   desc: "Herb-marinated chicken, roasted potatoes",        price: 16, icon: Drumstick, tag: "Non-Veg" },
  { id: "vegan",   name: "Vegan Bowl",        desc: "Quinoa, roasted veg, tahini dressing",            price: 14, icon: Sprout,    tag: "Vegan" },
  { id: "kids",    name: "Kids Delight",      desc: "Mini pizza, fruit cup, juice & cookies",          price: 9,  icon: Cookie,    tag: "Kids" },
  { id: "premium", name: "First-Class Feast", desc: "Lobster thermidor, truffle risotto, sommelier wine", price: 39, icon: Crown,  tag: "Premium" },
];

export const baggageTiers = [
  { id: "b5",  kg: 5,  price: 0,   label: "Cabin Only",  desc: "Included with every fare" },
  { id: "b15", kg: 15, price: 25,  label: "Checked",     desc: "Standard checked bag" },
  { id: "b23", kg: 23, price: 45,  label: "Plus",        desc: "Extra room for souvenirs" },
  { id: "b32", kg: 32, price: 75,  label: "Heavy",       desc: "Sports equipment & extras" },
];
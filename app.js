'use strict';

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────

const CATEGORIES = {
  produce:   { name: 'Fresh Produce',        icon: '🥦', warehouseSuit: 'conditional', sizeThreshold: 4,  bulkWasteRisk: true,  note: 'Perishable — best in bulk only for larger households that consume quickly.' },
  dairy:     { name: 'Dairy',                icon: '🥛', warehouseSuit: 'conditional', sizeThreshold: 3,  bulkWasteRisk: true,  note: 'Eggs and hard cheese last well; milk may be challenging in small households.' },
  meat:      { name: 'Meat & Seafood',       icon: '🥩', warehouseSuit: 'high',        sizeThreshold: 2,  bulkWasteRisk: false, note: 'Excellent bulk value — portion into meals and freeze for later.' },
  pantry:    { name: 'Pantry Staples',       icon: '🫙', warehouseSuit: 'high',        sizeThreshold: 1,  bulkWasteRisk: false, note: 'Non-perishable staples are almost always cheaper in bulk.' },
  frozen:    { name: 'Frozen Foods',         icon: '🧊', warehouseSuit: 'high',        sizeThreshold: 1,  bulkWasteRisk: false, note: 'Frozen items store indefinitely — outstanding bulk value.' },
  beverages: { name: 'Beverages',            icon: '☕', warehouseSuit: 'high',        sizeThreshold: 2,  bulkWasteRisk: false, note: 'Most beverages store well and see excellent per-unit bulk savings.' },
  snacks:    { name: 'Snacks',               icon: '🍿', warehouseSuit: 'medium',      sizeThreshold: 3,  bulkWasteRisk: true,  note: 'Mixed — confirm expiration dates and realistic consumption rate.' },
  cleaning:  { name: 'Cleaning & Household', icon: '🧹', warehouseSuit: 'high',        sizeThreshold: 1,  bulkWasteRisk: false, note: 'Household supplies offer some of the best and most consistent bulk savings.' },
  personal:  { name: 'Personal Care',        icon: '🧴', warehouseSuit: 'high',        sizeThreshold: 1,  bulkWasteRisk: false, note: 'Personal care products store well and deliver strong bulk value.' },
  bakery:    { name: 'Bread & Bakery',       icon: '🍞', warehouseSuit: 'low',         sizeThreshold: 5,  bulkWasteRisk: true,  note: 'Bread goes stale within days — local or freeze immediately after purchase.' },
  specialty: { name: 'Specialty',            icon: '🌶️', warehouseSuit: 'low',         sizeThreshold: 6,  bulkWasteRisk: false, note: 'Better variety and freshness at specialty or local markets.' },
};

// ─── ITEM CATALOG ──────────────────────────────────────────────────────────
// Fields: name, aliases, category, localPrice, warehousePrice, unit, warehouseMin (min units you must buy at warehouse)

const CATALOG = [
  // PRODUCE
  { name: 'Bananas',        aliases: ['banana'],                                       category: 'produce',   localPrice: 0.29,  warehousePrice: 0.19,  unit: 'lb',      warehouseMin: 3   },
  { name: 'Apples',         aliases: ['apple','gala','fuji','granny smith'],           category: 'produce',   localPrice: 1.79,  warehousePrice: 1.19,  unit: 'lb',      warehouseMin: 5   },
  { name: 'Oranges',        aliases: ['orange','navel','mandarin','clementine'],       category: 'produce',   localPrice: 0.99,  warehousePrice: 0.59,  unit: 'each',    warehouseMin: 8   },
  { name: 'Lemons',         aliases: ['lemon','lime'],                                 category: 'produce',   localPrice: 0.79,  warehousePrice: 0.39,  unit: 'each',    warehouseMin: 8   },
  { name: 'Strawberries',   aliases: ['strawberry'],                                   category: 'produce',   localPrice: 3.99,  warehousePrice: 2.49,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Blueberries',    aliases: ['blueberry'],                                    category: 'produce',   localPrice: 4.49,  warehousePrice: 2.79,  unit: 'pint',    warehouseMin: 2   },
  { name: 'Spinach',        aliases: ['baby spinach','arugula'],                       category: 'produce',   localPrice: 3.99,  warehousePrice: 2.49,  unit: 'bag',     warehouseMin: 1   },
  { name: 'Broccoli',       aliases: ['brocolli'],                                     category: 'produce',   localPrice: 1.99,  warehousePrice: 1.29,  unit: 'lb',      warehouseMin: 3   },
  { name: 'Carrots',        aliases: ['carrot','baby carrots'],                        category: 'produce',   localPrice: 1.29,  warehousePrice: 0.69,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Potatoes',       aliases: ['potato','russet','yukon gold','sweet potato'],  category: 'produce',   localPrice: 0.89,  warehousePrice: 0.59,  unit: 'lb',      warehouseMin: 5   },
  { name: 'Onions',         aliases: ['onion','yellow onion','shallot'],               category: 'produce',   localPrice: 0.79,  warehousePrice: 0.49,  unit: 'lb',      warehouseMin: 5   },
  { name: 'Garlic',         aliases: ['garlic clove','garlic bulb'],                   category: 'produce',   localPrice: 0.89,  warehousePrice: 0.39,  unit: 'bulb',    warehouseMin: 4   },
  { name: 'Tomatoes',       aliases: ['tomato','roma','cherry tomato','grape tomato'], category: 'produce',   localPrice: 2.49,  warehousePrice: 1.79,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Avocados',       aliases: ['avocado','avo'],                                category: 'produce',   localPrice: 1.49,  warehousePrice: 0.79,  unit: 'each',    warehouseMin: 5   },
  { name: 'Romaine Lettuce',aliases: ['lettuce','mixed greens','salad mix','kale'],    category: 'produce',   localPrice: 2.99,  warehousePrice: 1.99,  unit: 'head',    warehouseMin: 1   },
  { name: 'Bell Peppers',   aliases: ['bell pepper','red pepper','green pepper'],      category: 'produce',   localPrice: 1.29,  warehousePrice: 0.69,  unit: 'each',    warehouseMin: 4   },
  { name: 'Celery',         aliases: [],                                               category: 'produce',   localPrice: 1.99,  warehousePrice: 1.29,  unit: 'bunch',   warehouseMin: 1   },
  { name: 'Zucchini',       aliases: ['zuchinni','squash','courgette'],                category: 'produce',   localPrice: 1.49,  warehousePrice: 0.89,  unit: 'each',    warehouseMin: 3   },
  { name: 'Mushrooms',      aliases: ['mushroom','cremini','button mushroom'],         category: 'produce',   localPrice: 3.49,  warehousePrice: 2.29,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Cucumbers',      aliases: ['cucumber'],                                     category: 'produce',   localPrice: 0.89,  warehousePrice: 0.59,  unit: 'each',    warehouseMin: 4   },

  // DAIRY
  { name: 'Milk',           aliases: ['whole milk','2% milk','skim milk','oat milk','almond milk'], category: 'dairy', localPrice: 4.29, warehousePrice: 2.99, unit: 'gallon',    warehouseMin: 2 },
  { name: 'Eggs',           aliases: ['egg','dozen eggs','large eggs'],                category: 'dairy',     localPrice: 5.49,  warehousePrice: 3.19,  unit: 'dozen',   warehouseMin: 2   },
  { name: 'Butter',         aliases: ['unsalted butter','salted butter'],              category: 'dairy',     localPrice: 5.99,  warehousePrice: 3.49,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Shredded Cheese',aliases: ['cheese','cheddar','mozzarella','parmesan','jack cheese'], category: 'dairy', localPrice: 5.49, warehousePrice: 2.99, unit: 'lb', warehouseMin: 2 },
  { name: 'Greek Yogurt',   aliases: ['yogurt','vanilla yogurt','plain yogurt'],       category: 'dairy',     localPrice: 1.79,  warehousePrice: 0.99,  unit: 'cup',     warehouseMin: 4   },
  { name: 'Cream Cheese',   aliases: [],                                               category: 'dairy',     localPrice: 3.49,  warehousePrice: 1.99,  unit: 'block',   warehouseMin: 2   },
  { name: 'Sour Cream',     aliases: [],                                               category: 'dairy',     localPrice: 2.99,  warehousePrice: 1.79,  unit: 'container', warehouseMin: 2 },
  { name: 'Heavy Cream',    aliases: ['whipping cream','half and half'],               category: 'dairy',     localPrice: 3.99,  warehousePrice: 2.49,  unit: 'pint',    warehouseMin: 2   },

  // MEAT & SEAFOOD
  { name: 'Chicken Breast', aliases: ['chicken breasts','boneless chicken','chicken'],  category: 'meat',     localPrice: 4.99,  warehousePrice: 2.79,  unit: 'lb',      warehouseMin: 3   },
  { name: 'Ground Beef',    aliases: ['hamburger','ground beef','80/20','burger meat'], category: 'meat',     localPrice: 6.49,  warehousePrice: 4.29,  unit: 'lb',      warehouseMin: 3   },
  { name: 'Salmon',         aliases: ['atlantic salmon','salmon fillet','salmon steak'],category: 'meat',     localPrice: 13.99, warehousePrice: 8.99,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Shrimp',         aliases: ['large shrimp','frozen shrimp'],                 category: 'meat',     localPrice: 10.99, warehousePrice: 6.99,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Bacon',          aliases: [],                                               category: 'meat',     localPrice: 6.99,  warehousePrice: 4.49,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Pork Chops',     aliases: ['pork','pork tenderloin'],                       category: 'meat',     localPrice: 4.99,  warehousePrice: 2.99,  unit: 'lb',      warehouseMin: 3   },
  { name: 'Ground Turkey',  aliases: ['turkey','lean turkey'],                         category: 'meat',     localPrice: 5.99,  warehousePrice: 3.79,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Hot Dogs',       aliases: ['hot dog','franks','sausage'],                   category: 'meat',     localPrice: 4.99,  warehousePrice: 2.79,  unit: 'pack',    warehouseMin: 2   },
  { name: 'Steak',          aliases: ['ribeye','sirloin','strip steak','flank steak'], category: 'meat',     localPrice: 14.99, warehousePrice: 9.99,  unit: 'lb',      warehouseMin: 2   },
  { name: 'Tilapia',        aliases: ['tilapia fillet','white fish','cod','halibut'],  category: 'meat',     localPrice: 8.99,  warehousePrice: 5.49,  unit: 'lb',      warehouseMin: 2   },

  // PANTRY
  { name: 'Olive Oil',       aliases: ['extra virgin olive oil','EVOO','cooking oil','vegetable oil','avocado oil'], category: 'pantry', localPrice: 9.99,  warehousePrice: 4.99, unit: 'bottle', warehouseMin: 1 },
  { name: 'Pasta',           aliases: ['spaghetti','penne','rigatoni','linguine','noodles'], category: 'pantry', localPrice: 1.99, warehousePrice: 0.89, unit: 'lb', warehouseMin: 4 },
  { name: 'Rice',            aliases: ['white rice','brown rice','jasmine rice','basmati'], category: 'pantry', localPrice: 2.49,  warehousePrice: 1.19, unit: 'lb', warehouseMin: 5 },
  { name: 'Canned Tomatoes', aliases: ['diced tomatoes','crushed tomatoes','tomato sauce','tomato paste'], category: 'pantry', localPrice: 1.49, warehousePrice: 0.75, unit: 'can', warehouseMin: 6 },
  { name: 'Canned Beans',    aliases: ['black beans','kidney beans','chickpeas','garbanzo beans','lentils','cannellini'], category: 'pantry', localPrice: 1.29, warehousePrice: 0.65, unit: 'can', warehouseMin: 6 },
  { name: 'Chicken Broth',   aliases: ['chicken stock','beef broth','vegetable broth','broth','stock'], category: 'pantry', localPrice: 2.49, warehousePrice: 1.49, unit: 'quart', warehouseMin: 4 },
  { name: 'Peanut Butter',   aliases: ['almond butter','nut butter','PB'],            category: 'pantry',    localPrice: 4.99,  warehousePrice: 2.79,  unit: 'jar',     warehouseMin: 2   },
  { name: 'Flour',           aliases: ['all-purpose flour','bread flour','whole wheat flour'], category: 'pantry', localPrice: 3.99, warehousePrice: 1.99, unit: 'lb', warehouseMin: 5 },
  { name: 'Sugar',           aliases: ['white sugar','brown sugar','powdered sugar'], category: 'pantry',    localPrice: 3.49,  warehousePrice: 1.79,  unit: 'lb',      warehouseMin: 4   },
  { name: 'Cereal',          aliases: ['cheerios','corn flakes','granola','muesli'],  category: 'pantry',    localPrice: 4.99,  warehousePrice: 2.99,  unit: 'box',     warehouseMin: 2   },
  { name: 'Oatmeal',         aliases: ['oats','rolled oats','instant oatmeal'],       category: 'pantry',    localPrice: 4.49,  warehousePrice: 1.99,  unit: 'canister',warehouseMin: 1   },
  { name: 'Honey',           aliases: [],                                             category: 'pantry',    localPrice: 7.99,  warehousePrice: 4.49,  unit: 'bottle',  warehouseMin: 1   },
  { name: 'Maple Syrup',     aliases: ['syrup'],                                      category: 'pantry',    localPrice: 9.99,  warehousePrice: 5.99,  unit: 'bottle',  warehouseMin: 1   },
  { name: 'Canned Tuna',     aliases: ['tuna','canned fish'],                         category: 'pantry',    localPrice: 1.49,  warehousePrice: 0.79,  unit: 'can',     warehouseMin: 8   },
  { name: 'Soy Sauce',       aliases: ['tamari','teriyaki sauce'],                    category: 'pantry',    localPrice: 3.99,  warehousePrice: 2.29,  unit: 'bottle',  warehouseMin: 1   },
  { name: 'Ketchup',         aliases: ['mustard','hot sauce','bbq sauce'],            category: 'pantry',    localPrice: 3.49,  warehousePrice: 1.99,  unit: 'bottle',  warehouseMin: 2   },
  { name: 'Breadcrumbs',     aliases: ['panko','bread crumbs'],                       category: 'pantry',    localPrice: 3.49,  warehousePrice: 1.79,  unit: 'container',warehouseMin: 1  },

  // FROZEN
  { name: 'Frozen Vegetables',aliases: ['frozen broccoli','frozen peas','frozen corn','frozen green beans','frozen edamame'], category: 'frozen', localPrice: 2.49, warehousePrice: 1.19, unit: 'bag', warehouseMin: 4 },
  { name: 'Frozen Berries',   aliases: ['frozen strawberries','frozen blueberries','frozen raspberries','frozen mixed berries'], category: 'frozen', localPrice: 4.99, warehousePrice: 2.49, unit: 'bag', warehouseMin: 2 },
  { name: 'Frozen Fruit',     aliases: ['frozen mango','frozen peaches'],             category: 'frozen',    localPrice: 3.99,  warehousePrice: 1.99,  unit: 'bag',     warehouseMin: 2   },
  { name: 'Ice Cream',        aliases: ['gelato','frozen yogurt','sorbet'],           category: 'frozen',    localPrice: 5.99,  warehousePrice: 3.49,  unit: 'carton',  warehouseMin: 2   },
  { name: 'Frozen Pizza',     aliases: ['pizza','frozen lasagna','frozen meal'],      category: 'frozen',    localPrice: 6.99,  warehousePrice: 4.29,  unit: 'pizza',   warehouseMin: 2   },

  // BEVERAGES
  { name: 'Coffee',         aliases: ['ground coffee','whole bean','dark roast','medium roast','espresso'], category: 'beverages', localPrice: 11.99, warehousePrice: 6.99, unit: 'bag', warehouseMin: 1 },
  { name: 'Orange Juice',   aliases: ['OJ','apple juice','juice'],                    category: 'beverages', localPrice: 4.99,  warehousePrice: 2.99,  unit: 'half-gal',warehouseMin: 2   },
  { name: 'Water Bottles',  aliases: ['bottled water','sparkling water','mineral water','seltzer','lacroix'], category: 'beverages', localPrice: 1.29, warehousePrice: 0.49, unit: 'bottle', warehouseMin: 24 },
  { name: 'Tea',            aliases: ['green tea','black tea','herbal tea','chamomile'], category: 'beverages', localPrice: 4.99, warehousePrice: 2.99, unit: 'box', warehouseMin: 1 },
  { name: 'Soda',           aliases: ['cola','coke','pepsi','sprite','dr pepper','ginger ale','lemonade'], category: 'beverages', localPrice: 6.49, warehousePrice: 3.99, unit: '12-pack', warehouseMin: 2 },
  { name: 'Sports Drinks',  aliases: ['gatorade','powerade','electrolyte drink'],     category: 'beverages', localPrice: 1.99,  warehousePrice: 0.99,  unit: 'bottle',  warehouseMin: 12  },

  // SNACKS
  { name: 'Almonds',       aliases: ['almond','mixed nuts','walnuts','cashews','pecans','pistachios','nuts'], category: 'snacks', localPrice: 9.99, warehousePrice: 5.49, unit: 'lb', warehouseMin: 2 },
  { name: 'Chips',         aliases: ['potato chips','tortilla chips','corn chips','doritos','lays'], category: 'snacks', localPrice: 4.49, warehousePrice: 2.49, unit: 'bag', warehouseMin: 2 },
  { name: 'Pretzels',      aliases: ['pretzel'],                                      category: 'snacks',    localPrice: 3.49,  warehousePrice: 1.99,  unit: 'bag',     warehouseMin: 2   },
  { name: 'Granola Bars',  aliases: ['protein bars','snack bars','kind bar','clif bar','energy bar'], category: 'snacks', localPrice: 1.49, warehousePrice: 0.79, unit: 'bar', warehouseMin: 12 },
  { name: 'Crackers',      aliases: ['saltines','ritz','wheat thins','triscuits'],    category: 'snacks',    localPrice: 3.99,  warehousePrice: 2.29,  unit: 'box',     warehouseMin: 2   },
  { name: 'Popcorn',       aliases: [],                                               category: 'snacks',    localPrice: 3.99,  warehousePrice: 2.19,  unit: 'bag',     warehouseMin: 2   },
  { name: 'Trail Mix',     aliases: ['dried fruit','raisins','dried mango'],          category: 'snacks',    localPrice: 5.99,  warehousePrice: 3.49,  unit: 'bag',     warehouseMin: 1   },

  // CLEANING & HOUSEHOLD
  { name: 'Paper Towels',      aliases: ['paper towel','bounty','viva'],              category: 'cleaning',  localPrice: 2.49,  warehousePrice: 0.99,  unit: 'roll',    warehouseMin: 6   },
  { name: 'Toilet Paper',      aliases: ['TP','bathroom tissue','charmin','cottonelle'], category: 'cleaning', localPrice: 1.49, warehousePrice: 0.59, unit: 'roll', warehouseMin: 12  },
  { name: 'Laundry Detergent', aliases: ['tide','gain','detergent','laundry pods','washing powder'], category: 'cleaning', localPrice: 14.99, warehousePrice: 7.99, unit: 'bottle', warehouseMin: 1 },
  { name: 'Dish Soap',         aliases: ['dawn','dishwashing liquid','dishwasher pods','cascade'], category: 'cleaning', localPrice: 3.99, warehousePrice: 1.99, unit: 'bottle', warehouseMin: 2 },
  { name: 'Trash Bags',        aliases: ['garbage bags','kitchen bags','bin liners'], category: 'cleaning',  localPrice: 0.49,  warehousePrice: 0.19,  unit: 'bag',     warehouseMin: 20  },
  { name: 'Ziploc Bags',       aliases: ['zip lock','sandwich bags','storage bags','freezer bags'], category: 'cleaning', localPrice: 4.99, warehousePrice: 2.49, unit: 'box', warehouseMin: 2 },
  { name: 'All-Purpose Cleaner',aliases:['lysol','windex','clorox','cleaning spray','disinfectant wipes'], category: 'cleaning', localPrice: 4.99, warehousePrice: 2.49, unit: 'bottle', warehouseMin: 2 },
  { name: 'Fabric Softener',   aliases: ['dryer sheets','downy'],                    category: 'cleaning',  localPrice: 6.99,  warehousePrice: 3.49,  unit: 'bottle',  warehouseMin: 1   },

  // PERSONAL CARE
  { name: 'Shampoo',      aliases: ['conditioner','head & shoulders','pantene'],      category: 'personal',  localPrice: 5.99,  warehousePrice: 2.99,  unit: 'bottle',  warehouseMin: 2   },
  { name: 'Body Wash',    aliases: ['soap','bar soap','shower gel','dove body'],      category: 'personal',  localPrice: 5.49,  warehousePrice: 2.79,  unit: 'bottle',  warehouseMin: 2   },
  { name: 'Toothpaste',   aliases: ['toothbrush','crest','colgate','oral b'],         category: 'personal',  localPrice: 3.99,  warehousePrice: 1.99,  unit: 'tube',    warehouseMin: 3   },
  { name: 'Deodorant',    aliases: ['antiperspirant','old spice','secret','dove deo'],category: 'personal',  localPrice: 4.99,  warehousePrice: 2.49,  unit: 'stick',   warehouseMin: 3   },
  { name: 'Razors',       aliases: ['razor blades','gillette','shaving'],             category: 'personal',  localPrice: 3.49,  warehousePrice: 1.49,  unit: 'each',    warehouseMin: 4   },
  { name: 'Hand Soap',    aliases: ['hand wash','liquid soap','softsoap'],            category: 'personal',  localPrice: 2.99,  warehousePrice: 1.49,  unit: 'pump',    warehouseMin: 3   },

  // BAKERY
  { name: 'Bread',      aliases: ['sandwich bread','white bread','whole wheat bread','sourdough','loaf'], category: 'bakery', localPrice: 3.99, warehousePrice: 2.49, unit: 'loaf', warehouseMin: 2 },
  { name: 'Bagels',     aliases: ['english muffins'],                                 category: 'bakery',    localPrice: 3.99,  warehousePrice: 2.49,  unit: 'pack',    warehouseMin: 2   },
  { name: 'Tortillas',  aliases: ['flour tortillas','corn tortillas','wraps'],        category: 'bakery',    localPrice: 3.99,  warehousePrice: 1.99,  unit: 'pack',    warehouseMin: 2   },
  { name: 'Buns',       aliases: ['hamburger buns','hot dog buns','dinner rolls','rolls'], category: 'bakery', localPrice: 3.49, warehousePrice: 2.29, unit: 'pack', warehouseMin: 2 },
];

// ─── LOCATION TIERS ────────────────────────────────────────────────────────

const LOCATION_TIERS = {
  major_metro: {
    name: 'Major Metro Area',
    localMultiplier: 1.25,
    warehouseMultiplier: 1.08,
    description: 'Higher cost of living — warehouse savings are especially significant here.',
  },
  coastal_city: {
    name: 'Coastal City',
    localMultiplier: 1.15,
    warehouseMultiplier: 1.05,
    description: 'Above-average grocery prices — bulk buying pays off well.',
  },
  suburban: {
    name: 'Suburban Area',
    localMultiplier: 1.0,
    warehouseMultiplier: 1.0,
    description: 'Typical suburban pricing — a good mix of bulk and local.',
  },
  midwest_south: {
    name: 'Midwest / South',
    localMultiplier: 0.92,
    warehouseMultiplier: 0.98,
    description: 'Lower local grocery prices — warehouse advantage is moderate.',
  },
  rural: {
    name: 'Small Town / Rural',
    localMultiplier: 0.88,
    warehouseMultiplier: 1.0,
    description: 'Lower local prices and warehouse clubs may be farther — split strategy varies.',
  },
};

function getLocationTier(zip) {
  const z = parseInt(zip, 10);
  if (isNaN(z) || z < 100 || z > 99999) return { tier: LOCATION_TIERS.suburban, region: 'Unknown Location' };

  // Major metros
  if ((z >= 10001 && z <= 11999)) return { tier: LOCATION_TIERS.major_metro, region: 'New York Metro' };
  if ((z >= 90001 && z <= 91999)) return { tier: LOCATION_TIERS.major_metro, region: 'Los Angeles' };
  if ((z >= 94100 && z <= 94199)) return { tier: LOCATION_TIERS.major_metro, region: 'San Francisco' };
  if ((z >= 94000 && z <= 94099) || (z >= 94200 && z <= 94999)) return { tier: LOCATION_TIERS.coastal_city, region: 'Bay Area' };
  if ((z >= 2100  && z <= 2299))  return { tier: LOCATION_TIERS.major_metro, region: 'Boston' };
  if ((z >= 98101 && z <= 98199)) return { tier: LOCATION_TIERS.major_metro, region: 'Seattle' };
  if ((z >= 60601 && z <= 60699)) return { tier: LOCATION_TIERS.major_metro, region: 'Chicago' };
  if ((z >= 20001 && z <= 20599)) return { tier: LOCATION_TIERS.major_metro, region: 'Washington D.C.' };
  if ((z >= 33100 && z <= 33299)) return { tier: LOCATION_TIERS.major_metro, region: 'Miami' };
  if ((z >= 77001 && z <= 77099)) return { tier: LOCATION_TIERS.coastal_city, region: 'Houston' };
  if ((z >= 78201 && z <= 78299)) return { tier: LOCATION_TIERS.suburban,     region: 'San Antonio' };
  if ((z >= 85001 && z <= 85099)) return { tier: LOCATION_TIERS.suburban,     region: 'Phoenix' };
  if ((z >= 30301 && z <= 30399)) return { tier: LOCATION_TIERS.coastal_city, region: 'Atlanta' };
  if ((z >= 80201 && z <= 80299)) return { tier: LOCATION_TIERS.coastal_city, region: 'Denver' };
  if ((z >= 97201 && z <= 97299)) return { tier: LOCATION_TIERS.coastal_city, region: 'Portland' };
  if ((z >= 19101 && z <= 19199)) return { tier: LOCATION_TIERS.coastal_city, region: 'Philadelphia' };
  if ((z >= 21201 && z <= 21299)) return { tier: LOCATION_TIERS.suburban,     region: 'Baltimore' };

  // Broad regional signals
  const firstDigit = Math.floor(z / 10000);
  if (firstDigit === 0 || firstDigit === 1) return { tier: LOCATION_TIERS.coastal_city, region: 'Northeast' };
  if (firstDigit === 9)                     return { tier: LOCATION_TIERS.coastal_city, region: 'West Coast' };
  if (firstDigit === 4 || firstDigit === 5) return { tier: LOCATION_TIERS.midwest_south, region: 'Midwest' };
  if (firstDigit === 7)                     return { tier: LOCATION_TIERS.midwest_south, region: 'South' };

  return { tier: LOCATION_TIERS.suburban, region: 'Suburban Area' };
}

// ─── FUZZY SEARCH ─────────────────────────────────────────────────────────

function searchCatalog(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];
  for (const item of CATALOG) {
    const names = [item.name.toLowerCase(), ...item.aliases.map(a => a.toLowerCase())];
    let score = 0;
    for (const n of names) {
      if (n === q) { score = 100; break; }
      if (n.startsWith(q)) { score = Math.max(score, 90); }
      if (n.includes(q)) { score = Math.max(score, 70); }
      if (q.includes(n)) { score = Math.max(score, 60); }
      // token match
      const tokens = q.split(/\s+/);
      const nameTokens = n.split(/\s+/);
      const matched = tokens.filter(t => nameTokens.some(nt => nt.includes(t) || t.includes(nt)));
      if (matched.length > 0) score = Math.max(score, (matched.length / tokens.length) * 65);
    }
    if (score > 0) results.push({ item, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8).map(r => r.item);
}

function findExactItem(name) {
  const q = name.toLowerCase().trim();
  return CATALOG.find(item =>
    item.name.toLowerCase() === q ||
    item.aliases.some(a => a.toLowerCase() === q)
  ) || searchCatalog(q)[0] || null;
}

// ─── RECOMMENDATION ENGINE ────────────────────────────────────────────────

function analyzeItem(item, householdSize, locationInfo, hasMembership) {
  const catalogItem = findExactItem(item.name) || searchCatalog(item.name)[0];
  const category = catalogItem ? catalogItem.category : 'pantry';
  const catMeta = CATEGORIES[category];
  const { tier } = locationInfo;

  const baseLocalPrice = catalogItem ? catalogItem.localPrice : 4.99;
  const baseWarehousePrice = catalogItem ? catalogItem.warehousePrice : 3.29;
  const unit = catalogItem ? catalogItem.unit : 'each';
  const warehouseMin = catalogItem ? catalogItem.warehouseMin : 2;

  const localPrice = baseLocalPrice * tier.localMultiplier;
  const warehousePrice = baseWarehousePrice * tier.warehouseMultiplier;

  const reqQty = Math.max(1, parseInt(item.quantity, 10) || 1);
  const localQty = reqQty;
  const warehouseQty = Math.max(reqQty, warehouseMin);

  const localTotal = localPrice * localQty;
  const warehouseTotal = warehousePrice * warehouseQty;

  const perUnitSavings = localPrice - warehousePrice;
  const perUnitPct = perUnitSavings / localPrice;

  // Determine recommendation
  let rec = 'local';
  let confidence = 'high';
  let reasoning = '';
  let actualSavings = 0;

  const suit = catMeta.warehouseSuit;

  if (suit === 'high') {
    if (hasMembership || perUnitPct > 0.25) {
      rec = 'warehouse';
      const savingsOnQty = perUnitSavings * reqQty;
      actualSavings = savingsOnQty;
      reasoning = `Great bulk buy. You save ${fmt(perUnitSavings)} per ${unit} — ${Math.round(perUnitPct * 100)}% less than grocery store price.`;
    } else {
      rec = 'warehouse';
      actualSavings = perUnitSavings * reqQty;
      reasoning = `Still cheaper in bulk even without a membership. ${catMeta.note}`;
    }
  } else if (suit === 'medium' || suit === 'conditional') {
    if (householdSize >= catMeta.sizeThreshold) {
      rec = 'warehouse';
      confidence = 'medium';
      actualSavings = perUnitSavings * reqQty;
      reasoning = `For a ${householdSize}-person household, bulk buying this perishable item makes sense. ${catMeta.note}`;
    } else {
      rec = 'local';
      confidence = 'medium';
      actualSavings = 0;
      reasoning = `For smaller households, buying less at once reduces waste. ${catMeta.note}`;
    }
  } else {
    // low suitability
    rec = 'local';
    actualSavings = 0;
    reasoning = catMeta.note;
  }

  // Edge case: if you'd have to buy WAY more than needed at warehouse, warn
  let wasteWarning = null;
  if (rec === 'warehouse' && warehouseQty > reqQty * 3 && catMeta.bulkWasteRisk) {
    wasteWarning = `⚠️ Warehouse requires buying ${warehouseQty} ${unit} — you only need ${reqQty}. Consider local to avoid waste.`;
    rec = 'local';
    actualSavings = 0;
    reasoning = wasteWarning;
    confidence = 'medium';
  }

  // Cannot save if local is already cheaper (edge case in some regions)
  if (localPrice <= warehousePrice) {
    rec = 'local';
    actualSavings = 0;
    reasoning = `Local stores are competitively priced for this item in your region.`;
  }

  return {
    name: item.name,
    catalogName: catalogItem ? catalogItem.name : item.name,
    category,
    catMeta,
    localPrice,
    warehousePrice,
    unit,
    localQty,
    warehouseQty,
    warehouseMin,
    localTotal,
    warehouseTotal: warehousePrice * reqQty, // compare apples-to-apples on same qty
    warehouseTotalMin: warehouseTotal,        // actual min purchase at warehouse
    rec,
    confidence,
    actualSavings: Math.max(0, actualSavings),
    reasoning,
    perUnitPct,
  };
}

function analyzeBasket(items, householdSize, locationInfo, hasMembership) {
  const results = items.map(item => analyzeItem(item, householdSize, locationInfo, hasMembership));

  let localTotal = 0;
  let warehouseTotal = 0; // if everything warehouse
  let optimizedTotal = 0;
  let warehouseSavings = 0;
  let warehouseItemCount = 0;
  let localItemCount = 0;

  for (const r of results) {
    localTotal += r.localTotal;
    warehouseTotal += r.warehouseTotal;
    if (r.rec === 'warehouse') {
      optimizedTotal += r.warehouseTotal;
      warehouseSavings += r.actualSavings;
      warehouseItemCount++;
    } else {
      optimizedTotal += r.localTotal;
      localItemCount++;
    }
  }

  // Overall strategy
  let strategy = 'split';
  const warehousePct = warehouseItemCount / results.length;
  if (warehousePct >= 0.75) strategy = 'warehouse';
  else if (warehousePct <= 0.25) strategy = 'local';

  // Membership note
  const MEMBERSHIP_COST_PER_YEAR = 65;
  const annualSavingsEstimate = warehouseSavings * 52; // weekly shop
  const payoffMonths = MEMBERSHIP_COST_PER_YEAR / (warehouseSavings > 0 ? (warehouseSavings * 4.33) : 1);

  return {
    items: results,
    localTotal,
    warehouseTotal,
    optimizedTotal,
    warehouseSavings,
    strategy,
    warehouseItemCount,
    localItemCount,
    totalItems: results.length,
    annualSavingsEstimate,
    payoffMonths: Math.ceil(payoffMonths),
  };
}

// ─── STATE ────────────────────────────────────────────────────────────────

let state = {
  householdSize: 2,
  zip: '',
  hasMembership: true,
  groceryList: [],
  nextId: 1,
  locationInfo: { tier: LOCATION_TIERS.suburban, region: 'Suburban Area' },
};

// ─── DOM HELPERS ─────────────────────────────────────────────────────────

function fmt(n) { return '$' + Math.abs(n).toFixed(2); }
function fmtSavings(n) { if (n <= 0) return null; return 'Save ' + fmt(n); }

function el(id) { return document.getElementById(id); }

function catColor(category) {
  const map = {
    produce: '#10B981', dairy: '#3B82F6', meat: '#EC4899',
    pantry: '#F59E0B', frozen: '#0EA5E9', beverages: '#8B5CF6',
    snacks: '#F97316', cleaning: '#14B8A6', personal: '#A855F7',
    bakery: '#EAB308', specialty: '#EF4444',
  };
  return map[category] || '#6B7280';
}

function catBg(category) {
  const map = {
    produce: '#D1FAE5', dairy: '#DBEAFE', meat: '#FCE7F3',
    pantry: '#FEF3C7', frozen: '#E0F2FE', beverages: '#F3E8FF',
    snacks: '#FFF7ED', cleaning: '#F0FDF4', personal: '#FDF4FF',
    bakery: '#FFFBEB', specialty: '#FFF1F2',
  };
  return map[category] || '#F3F4F6';
}

// ─── AUTOCOMPLETE ─────────────────────────────────────────────────────────

let acHighlighted = -1;

function renderAutocomplete(matches) {
  const list = el('autocomplete-list');
  if (!matches.length) { list.style.display = 'none'; return; }
  list.innerHTML = matches.map((item, i) =>
    `<div class="autocomplete-item${i === acHighlighted ? ' highlighted' : ''}"
          data-name="${item.name}"
          data-unit="${item.unit}"
          data-cat="${CATEGORIES[item.category].name}">
      <span>${item.name}</span>
      <span class="autocomplete-cat">${CATEGORIES[item.category].name}</span>
    </div>`
  ).join('');
  list.style.display = 'block';
  list.querySelectorAll('.autocomplete-item').forEach(row => {
    row.addEventListener('mousedown', e => {
      e.preventDefault();
      selectItem(row.dataset.name, row.dataset.unit);
    });
  });
}

function selectItem(name, unit) {
  el('item-input').value = name;
  el('unit-pill').textContent = unit || 'each';
  el('autocomplete-list').style.display = 'none';
  acHighlighted = -1;
  el('qty-input').focus();
}

// ─── GROCERY LIST RENDERING ───────────────────────────────────────────────

function renderList() {
  const items = state.groceryList;
  const emptyEl = el('empty-list');
  const listEl = el('grocery-list');
  const listItems = el('list-items');
  const analyzeBtn = el('analyze-cta');
  const countEl = el('list-count');

  if (items.length === 0) {
    emptyEl.style.display = 'flex';
    listEl.style.display = 'none';
    analyzeBtn.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  listEl.style.display = 'block';
  analyzeBtn.style.display = 'block';

  countEl.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}`;
  listItems.innerHTML = items.map(item => {
    const cat = item.catalogItem ? CATEGORIES[item.catalogItem.category] : null;
    const catName = cat ? cat.name : 'General';
    const catKey = item.catalogItem ? item.catalogItem.category : 'pantry';
    const unit = item.catalogItem ? item.catalogItem.unit : 'each';
    return `<div class="list-item-row" data-id="${item.id}">
      <span class="list-item-name">${item.name}</span>
      <span class="list-item-cat">
        <span class="cat-dot catdot-${catKey}" style="background:${catColor(catKey)}"></span>
        ${catName}
      </span>
      <span class="list-item-qty">${item.quantity} ${unit}</span>
      <button class="list-item-remove" data-id="${item.id}" title="Remove item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`;
  }).join('');

  listItems.querySelectorAll('.list-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.id)));
  });
}

function addItem(name, quantity) {
  const catalogItem = findExactItem(name) || searchCatalog(name)[0] || null;
  state.groceryList.push({
    id: state.nextId++,
    name: catalogItem ? catalogItem.name : name,
    quantity: Math.max(1, parseInt(quantity, 10) || 1),
    catalogItem,
  });
  renderList();
}

function removeItem(id) {
  state.groceryList = state.groceryList.filter(i => i.id !== id);
  renderList();
}

// ─── RESULTS RENDERING ────────────────────────────────────────────────────

const STRATEGY_CONFIG = {
  warehouse: {
    icon: '🏬',
    label: 'Recommended Strategy',
    headline: 'Shop the Warehouse Club',
    cls: 'warehouse',
  },
  local: {
    icon: '🏪',
    label: 'Recommended Strategy',
    headline: 'Stick to Your Local Grocery Store',
    cls: 'local',
  },
  split: {
    icon: '🛒',
    label: 'Recommended Strategy',
    headline: 'Split Your Basket',
    cls: 'split',
  },
};

const STRATEGY_DESCS = {
  warehouse: (r, region) =>
    `Most items on your list are great in bulk. For a ${r.totalItems}-item list in ${region}, heading to a warehouse club (Costco, Sam's Club, BJ's) for your major shop makes strong financial sense.`,
  local: (r, region) =>
    `Your list is heavy on perishables and smaller quantities. For your household in ${region}, a local grocery store or market will serve you better — less waste, fresher produce, and comparable cost.`,
  split: (r, region) =>
    `Your list has a mix of bulk-friendly and perishable items. The smartest move: buy ${r.warehouseItemCount} non-perishable or large-quantity items at a warehouse club, and pick up the remaining ${r.localItemCount} fresh items locally.`,
};

function renderResults(analysis) {
  const region = state.locationInfo.region;

  // Strategy banner
  const cfg = STRATEGY_CONFIG[analysis.strategy];
  const savingsDisplay = analysis.warehouseSavings > 0
    ? `<div class="strategy-savings-badge">
        <div class="strategy-savings-amount">${fmt(analysis.warehouseSavings)}</div>
        <div class="strategy-savings-label">saved this trip</div>
       </div>`
    : '';
  el('strategy-banner').className = `strategy-banner ${cfg.cls}`;
  el('strategy-banner').innerHTML = `
    <div class="strategy-icon-wrap">${cfg.icon}</div>
    <div class="strategy-text">
      <div class="strategy-label">${cfg.label}</div>
      <div class="strategy-headline">${cfg.headline}</div>
      <div class="strategy-desc">${STRATEGY_DESCS[analysis.strategy](analysis, region)}</div>
    </div>
    ${savingsDisplay}
  `;

  // Cost overview
  const maxCost = Math.max(analysis.localTotal, analysis.warehouseTotal, analysis.optimizedTotal, 0.01);
  const allW = fmt(analysis.warehouseTotal);
  const allL = fmt(analysis.localTotal);
  const optT = fmt(analysis.optimizedTotal);
  const stratLabel = { warehouse: 'Warehouse Only', local: 'Local Only', split: 'Optimized (Split)' };
  const winnerClass = analysis.warehouseSavings > 0 ? 'winner' : '';

  el('savings-overview').innerHTML = `
    <div class="cost-card">
      <div class="cost-card-label">
        <span style="display:inline-block;width:8px;height:8px;background:#16A34A;border-radius:50%;"></span>
        All Local
      </div>
      <div class="cost-card-amount">${allL}</div>
      <div class="cost-card-sub">If you bought everything locally</div>
      <div class="cost-bar-row">
        <div class="cost-bar-track">
          <div class="cost-bar-fill local" style="width:${(analysis.localTotal/maxCost*100).toFixed(1)}%"></div>
        </div>
      </div>
    </div>
    <div class="cost-card">
      <div class="cost-card-label">
        <span style="display:inline-block;width:8px;height:8px;background:#2563EB;border-radius:50%;"></span>
        All Warehouse
      </div>
      <div class="cost-card-amount">${allW}</div>
      <div class="cost-card-sub">If you bought everything in bulk</div>
      <div class="cost-bar-row">
        <div class="cost-bar-track">
          <div class="cost-bar-fill warehouse" style="width:${(analysis.warehouseTotal/maxCost*100).toFixed(1)}%"></div>
        </div>
      </div>
    </div>
    <div class="cost-card ${winnerClass}">
      ${winnerClass ? '<div class="winner-tag">Best</div>' : ''}
      <div class="cost-card-label">
        <span style="display:inline-block;width:8px;height:8px;background:#1A5C38;border-radius:50%;"></span>
        ${stratLabel[analysis.strategy]}
      </div>
      <div class="cost-card-amount">${optT}</div>
      <div class="cost-card-sub">${analysis.warehouseSavings > 0 ? `You save ${fmt(analysis.warehouseSavings)} vs. all local` : 'Comparable to all-local pricing'}</div>
      <div class="cost-bar-row">
        <div class="cost-bar-track">
          <div class="cost-bar-fill optimized" style="width:${(analysis.optimizedTotal/maxCost*100).toFixed(1)}%"></div>
        </div>
      </div>
    </div>
  `;

  // Item list
  const recHTML = analysis.items.map(r => {
    const bg = catBg(r.category);
    const col = catColor(r.category);
    const badge = r.rec === 'warehouse'
      ? `<span class="rec-badge rec-badge-warehouse"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Warehouse</span>`
      : r.rec === 'either'
      ? `<span class="rec-badge rec-badge-either">Either Works</span>`
      : `<span class="rec-badge rec-badge-local"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Local Store</span>`;

    const savings = r.actualSavings > 0.01
      ? `<span class="savings-chip">Save ${fmt(r.actualSavings)}</span>`
      : `<span class="no-savings-chip">—</span>`;

    const localPillClass  = r.rec !== 'warehouse' ? ' price-pill-selected' : '';
    const warehousePillClass = r.rec === 'warehouse' ? ' price-pill-selected' : '';

    return `<div class="rec-item">
      <div class="rec-item-icon" style="background:${bg};color:${col}">${r.catMeta.icon}</div>
      <div class="rec-item-body">
        <div class="rec-item-name">
          ${r.catalogName}
          <small>× ${r.localQty} ${r.unit}</small>
        </div>
        <div class="rec-item-reasoning">${r.reasoning}</div>
        <div class="price-compare-row">
          <span class="price-pill price-pill-local${localPillClass}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            Local: ${fmt(r.localTotal)}
          </span>
          <span class="price-vs">vs</span>
          <span class="price-pill price-pill-warehouse${warehousePillClass}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/></svg>
            Warehouse: ${fmt(r.warehouseTotal)}
          </span>
          ${r.unit !== 'each' ? `<span class="price-vs">(${fmt(r.localPrice)} vs ${fmt(r.warehousePrice)} / ${r.unit})</span>` : ''}
        </div>
      </div>
      <div class="rec-item-right">
        ${badge}
        ${savings}
      </div>
    </div>`;
  }).join('');
  el('rec-items').innerHTML = recHTML;

  // Insights
  const insights = generateInsights(analysis, state.householdSize, state.locationInfo);
  el('insights-grid').innerHTML = insights.map(ins => `
    <div class="insight-card">
      <div class="insight-header">
        <div class="insight-icon" style="background:${ins.bg};color:${ins.color}">${ins.icon}</div>
        <div class="insight-title">${ins.title}</div>
      </div>
      <div class="insight-body">${ins.body}</div>
    </div>
  `).join('');

  // Membership ROI (shown if no membership and savings exist)
  const roiEl = el('membership-roi');
  if (!state.hasMembership && analysis.warehouseSavings > 1) {
    const monthlyFromBulk = analysis.warehouseSavings * 4.33;
    const payoff = Math.ceil(65 / monthlyFromBulk);
    roiEl.style.display = 'flex';
    roiEl.innerHTML = `
      <div class="membership-roi-icon">💳</div>
      <div class="membership-roi-text">
        <div class="membership-roi-title">A warehouse membership could pay for itself in ~${payoff} month${payoff !== 1 ? 's' : ''}</div>
        <div class="membership-roi-body">
          Based on your shopping patterns, you'd save ~${fmt(analysis.warehouseSavings)} per trip.
          A Costco membership runs ~$65/year ($5.42/mo); Sam's Club ~$50/year ($4.17/mo).
          If you shop this way weekly, that's ~${fmt(analysis.warehouseSavings * 52)} in annual savings — well above the membership cost.
        </div>
      </div>
    `;
  } else {
    roiEl.style.display = 'none';
  }
}

function generateInsights(analysis, householdSize, locationInfo) {
  const insights = [];

  // Perishables insight
  const perishableItems = analysis.items.filter(r =>
    r.catMeta.bulkWasteRisk && r.rec === 'local'
  );
  if (perishableItems.length > 0) {
    insights.push({
      icon: '🌿',
      bg: '#D1FAE5', color: '#065F46',
      title: 'Fresh Items: Go Local',
      body: `Items like <strong>${perishableItems.slice(0,2).map(i=>i.catalogName).join(', ')}</strong> are perishable. Buying only what you'll use in 5–7 days reduces food waste and often means better quality.`,
    });
  }

  // Bulk wins insight
  const bulkWins = analysis.items.filter(r => r.rec === 'warehouse' && r.actualSavings > 1);
  if (bulkWins.length > 0) {
    const topSaver = bulkWins.sort((a, b) => b.actualSavings - a.actualSavings)[0];
    insights.push({
      icon: '📦',
      bg: '#DBEAFE', color: '#1E40AF',
      title: 'Biggest Bulk Win',
      body: `<strong>${topSaver.catalogName}</strong> saves you ${fmt(topSaver.actualSavings)} (${Math.round(topSaver.perUnitPct * 100)}% per unit) when bought in bulk. Non-perishables like this are the sweet spot for warehouse shopping.`,
    });
  }

  // Household-size specific advice
  if (householdSize <= 2) {
    insights.push({
      icon: '👤',
      bg: '#F3E8FF', color: '#6B21A8',
      title: 'Small Household Tip',
      body: `With ${householdSize} person${householdSize > 1 ? 's' : ''}, focus warehouse trips on shelf-stable items: paper goods, cleaning supplies, pantry staples, and frozen foods. Share a membership with another household to maximize value.`,
    });
  } else if (householdSize >= 4) {
    insights.push({
      icon: '👨‍👩‍👧‍👦',
      bg: '#FEF3C7', color: '#92400E',
      title: 'Large Household Advantage',
      body: `With ${householdSize} people, you have a natural advantage at warehouse clubs. Perishables like dairy, eggs, and produce can all be bought in bulk — your household moves through them before spoilage.`,
    });
  }

  // Location insight
  if (locationInfo.tier.localMultiplier >= 1.15) {
    insights.push({
      icon: '📍',
      bg: '#FFF7ED', color: '#9A3412',
      title: `${locationInfo.region}: Higher Local Prices`,
      body: `Grocery prices in ${locationInfo.region} run about ${Math.round((locationInfo.tier.localMultiplier - 1) * 100)}% above the national average. This widens the savings gap for warehouse shopping — especially on produce, dairy, and protein.`,
    });
  }

  // Freeze tip for meat
  const meatItems = analysis.items.filter(r => r.category === 'meat' && r.rec === 'warehouse');
  if (meatItems.length > 0) {
    insights.push({
      icon: '🧊',
      bg: '#E0F2FE', color: '#0C4A6E',
      title: 'Freeze Meat in Portions',
      body: `Warehouse meat comes in large packs — great savings, but portion it the day you buy it. Divide into meal-sized bags before freezing. ${meatItems.map(i => i.catalogName).join(', ')} ${meatItems.length > 1 ? 'all freeze' : 'freezes'} well for up to 4–6 months.`,
    });
  }

  // Always show a category guide
  insights.push({
    icon: '🗺️',
    bg: '#F0FDF4', color: '#14532D',
    title: 'Quick Category Guide',
    body: `<ul>
      <li><strong>Always warehouse:</strong> paper goods, cleaning, nuts, coffee, oil</li>
      <li><strong>Usually warehouse:</strong> meat, frozen, canned goods, dairy (large hh)</li>
      <li><strong>Usually local:</strong> fresh produce, bread, specialty items</li>
      <li><strong>It depends:</strong> snacks (check dates), yogurt, eggs (household size)</li>
    </ul>`,
  });

  return insights.slice(0, 4);
}

// ─── EVENT WIRING ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── Household size
  const sizePicker = el('size-picker');
  const hintMessages = {
    1: 'Solo shopper — prioritize fresh local items; only bulk non-perishables.',
    2: 'Small household — fresh items local; bulk cleaning, pantry, and proteins.',
    3: 'Medium household — good mix. Dairy in bulk works; produce still local.',
    4: 'Great size for warehouse clubs — most categories make sense in bulk.',
    5: 'Large household — warehouse clubs are almost always the right call.',
    6: 'Big family — warehouse clubs are built for you. Maximize bulk purchases.',
  };
  sizePicker.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sizePicker.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.householdSize = parseInt(btn.dataset.val, 10);
      el('size-hint-text').textContent = hintMessages[state.householdSize] || hintMessages[4];
    });
  });

  // ── ZIP code
  const zipInput = el('zip-input');
  zipInput.addEventListener('input', () => {
    const v = zipInput.value.replace(/\D/g, '').slice(0, 5);
    zipInput.value = v;
    if (v.length === 5) {
      const loc = getLocationTier(v);
      state.zip = v;
      state.locationInfo = loc;
      el('location-name').textContent = loc.region;
      el('location-chip').style.display = 'inline-flex';
    } else {
      el('location-chip').style.display = 'none';
    }
  });

  // ── Membership toggle
  el('toggle-yes').addEventListener('click', () => {
    el('toggle-yes').classList.add('active');
    el('toggle-no').classList.remove('active');
    state.hasMembership = true;
  });
  el('toggle-no').addEventListener('click', () => {
    el('toggle-no').classList.add('active');
    el('toggle-yes').classList.remove('active');
    state.hasMembership = false;
  });

  // ── Item input + autocomplete
  const itemInput = el('item-input');
  const acList = el('autocomplete-list');
  let acMatches = [];

  itemInput.addEventListener('input', () => {
    const q = itemInput.value.trim();
    acMatches = q.length > 1 ? searchCatalog(q) : [];
    acHighlighted = -1;
    renderAutocomplete(acMatches);
    if (acMatches.length > 0) {
      el('unit-pill').textContent = acMatches[0].unit;
    } else {
      el('unit-pill').textContent = 'each';
    }
  });

  itemInput.addEventListener('keydown', e => {
    if (!acMatches.length) {
      if (e.key === 'Enter') { doAddItem(); }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      acHighlighted = (acHighlighted + 1) % acMatches.length;
      renderAutocomplete(acMatches);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      acHighlighted = (acHighlighted - 1 + acMatches.length) % acMatches.length;
      renderAutocomplete(acMatches);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (acHighlighted >= 0) {
        selectItem(acMatches[acHighlighted].name, acMatches[acHighlighted].unit);
      } else {
        doAddItem();
      }
    } else if (e.key === 'Escape') {
      acList.style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (!el('autocomplete-container')?.contains(e.target)) {
      acList.style.display = 'none';
    }
  });

  // ── Quantity stepper
  el('qty-minus').addEventListener('click', () => {
    const cur = parseInt(el('qty-input').value, 10) || 1;
    el('qty-input').value = Math.max(1, cur - 1);
  });
  el('qty-plus').addEventListener('click', () => {
    const cur = parseInt(el('qty-input').value, 10) || 1;
    el('qty-input').value = cur + 1;
  });

  // ── Add item
  function doAddItem() {
    const name = itemInput.value.trim();
    if (!name) { itemInput.focus(); return; }
    const qty = parseInt(el('qty-input').value, 10) || 1;
    addItem(name, qty);
    itemInput.value = '';
    el('qty-input').value = 1;
    el('unit-pill').textContent = 'each';
    acList.style.display = 'none';
    acMatches = [];
    itemInput.focus();
  }
  el('add-btn').addEventListener('click', doAddItem);
  el('qty-input').addEventListener('keydown', e => { if (e.key === 'Enter') doAddItem(); });

  // ── Quick pills
  document.querySelectorAll('.quick-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const item = CATALOG.find(i => i.name === pill.dataset.item);
      addItem(pill.dataset.item, 1);
      pill.classList.add('active');
      setTimeout(() => pill.classList.remove('active'), 300);
    });
  });

  // ── Clear list
  el('clear-list-btn')?.addEventListener('click', () => {
    if (state.groceryList.length === 0) return;
    if (confirm('Clear your entire grocery list?')) {
      state.groceryList = [];
      renderList();
    }
  });

  // ── Analyze
  el('analyze-btn').addEventListener('click', () => {
    if (state.groceryList.length === 0) return;

    const resultsSection = el('section-results');
    resultsSection.style.display = 'block';
    el('analyzing-state').style.display = 'flex';
    el('results-content').style.display = 'none';

    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      const analysis = analyzeBasket(
        state.groceryList,
        state.householdSize,
        state.locationInfo,
        state.hasMembership
      );
      el('results-sub').textContent =
        `${state.locationInfo.region} · ${state.householdSize}-person household · ${state.groceryList.length} items`;
      renderResults(analysis);
      el('analyzing-state').style.display = 'none';
      el('results-content').style.display = 'block';
    }, 900);
  });

  // ── Edit list
  el('edit-list-btn').addEventListener('click', () => {
    el('section-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ── Start over
  el('start-over-btn').addEventListener('click', () => {
    state.groceryList = [];
    state.nextId = 1;
    renderList();
    el('section-results').style.display = 'none';
    el('section-profile').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ── Init
  renderList();
});

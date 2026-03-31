'use strict';

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────

const CATEGORIES = {
  produce:   { name: 'Fresh Produce',        icon: '🥦', warehouseSuit: 'conditional', sizeThreshold: 3.5, bulkWasteRisk: true,  shelfDays: 5,  note: 'Perishable — depends heavily on household size and consumption rate.' },
  dairy:     { name: 'Dairy',                icon: '🥛', warehouseSuit: 'conditional', sizeThreshold: 2.5, bulkWasteRisk: true,  shelfDays: 10, note: 'Eggs and hard cheese last well; fluid dairy is trickier for smaller households.' },
  meat:      { name: 'Meat & Seafood',       icon: '🥩', warehouseSuit: 'high',        sizeThreshold: 1.5, bulkWasteRisk: false, shelfDays: 180,note: 'Excellent bulk value — portion and freeze. Lasts 4–6 months in the freezer.' },
  pantry:    { name: 'Pantry Staples',       icon: '🫙', warehouseSuit: 'high',        sizeThreshold: 1,   bulkWasteRisk: false, shelfDays: 365,note: 'Non-perishable staples are almost always cheaper in bulk.' },
  frozen:    { name: 'Frozen Foods',         icon: '🧊', warehouseSuit: 'high',        sizeThreshold: 1,   bulkWasteRisk: false, shelfDays: 365,note: 'Frozen items store indefinitely — outstanding bulk value for any household.' },
  beverages: { name: 'Beverages',            icon: '☕', warehouseSuit: 'high',        sizeThreshold: 1.5, bulkWasteRisk: false, shelfDays: 365,note: 'Most beverages store well and see excellent per-unit bulk savings.' },
  snacks:    { name: 'Snacks',               icon: '🍿', warehouseSuit: 'medium',      sizeThreshold: 2.5, bulkWasteRisk: true,  shelfDays: 30, note: 'Mixed — confirm expiration dates and realistic consumption rate.' },
  cleaning:  { name: 'Cleaning & Household', icon: '🧹', warehouseSuit: 'high',        sizeThreshold: 1,   bulkWasteRisk: false, shelfDays: 730,note: 'Household supplies offer some of the best and most consistent bulk savings.' },
  personal:  { name: 'Personal Care',        icon: '🧴', warehouseSuit: 'high',        sizeThreshold: 1,   bulkWasteRisk: false, shelfDays: 730,note: 'Personal care products store well and deliver strong bulk value.' },
  bakery:    { name: 'Bread & Bakery',       icon: '🍞', warehouseSuit: 'low',         sizeThreshold: 5,   bulkWasteRisk: true,  shelfDays: 4,  note: 'Bread goes stale within days — buy local or freeze immediately after purchase.' },
  specialty: { name: 'Specialty',            icon: '🌶️', warehouseSuit: 'low',         sizeThreshold: 6,   bulkWasteRisk: false, shelfDays: 90, note: 'Better variety and freshness at specialty or local markets.' },
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
    description: 'Lower local grocery prices — warehouse advantage is moderate but still meaningful.',
  },
  rural: {
    name: 'Small Town / Rural',
    localMultiplier: 0.88,
    warehouseMultiplier: 1.02,
    description: 'Lower local prices; warehouse clubs may require a drive — weigh trip cost vs. savings.',
  },
};

function getLocationTier(zip) {
  const z = parseInt(zip, 10);
  if (isNaN(z) || z < 100 || z > 99999) return { tier: LOCATION_TIERS.suburban, region: 'Unknown Location' };

  // Major metros (alphabetical)
  if (z >= 10001 && z <= 11999)  return { tier: LOCATION_TIERS.major_metro, region: 'New York Metro' };
  if (z >= 2100  && z <= 2299)   return { tier: LOCATION_TIERS.major_metro, region: 'Boston' };
  if (z >= 20001 && z <= 20599)  return { tier: LOCATION_TIERS.major_metro, region: 'Washington D.C.' };
  if (z >= 33100 && z <= 33299)  return { tier: LOCATION_TIERS.major_metro, region: 'Miami' };
  if (z >= 60601 && z <= 60699)  return { tier: LOCATION_TIERS.major_metro, region: 'Chicago' };
  if (z >= 90001 && z <= 91999)  return { tier: LOCATION_TIERS.major_metro, region: 'Los Angeles' };
  if (z >= 94100 && z <= 94199)  return { tier: LOCATION_TIERS.major_metro, region: 'San Francisco' };
  if (z >= 98101 && z <= 98199)  return { tier: LOCATION_TIERS.major_metro, region: 'Seattle' };

  // Coastal/above-average cities
  if ((z >= 94000 && z <= 94099) || (z >= 94200 && z <= 94999))
                                 return { tier: LOCATION_TIERS.coastal_city, region: 'Bay Area' };
  if (z >= 19101 && z <= 19199)  return { tier: LOCATION_TIERS.coastal_city, region: 'Philadelphia' };
  if (z >= 30301 && z <= 30399)  return { tier: LOCATION_TIERS.coastal_city, region: 'Atlanta' };
  if (z >= 55401 && z <= 55499)  return { tier: LOCATION_TIERS.coastal_city, region: 'Minneapolis' };
  if (z >= 70112 && z <= 70199)  return { tier: LOCATION_TIERS.coastal_city, region: 'New Orleans' };
  if (z >= 77001 && z <= 77099)  return { tier: LOCATION_TIERS.coastal_city, region: 'Houston' };
  if (z >= 80201 && z <= 80299)  return { tier: LOCATION_TIERS.coastal_city, region: 'Denver' };
  if (z >= 89101 && z <= 89199)  return { tier: LOCATION_TIERS.coastal_city, region: 'Las Vegas' };
  if (z >= 92101 && z <= 92199)  return { tier: LOCATION_TIERS.coastal_city, region: 'San Diego' };
  if (z >= 97201 && z <= 97299)  return { tier: LOCATION_TIERS.coastal_city, region: 'Portland' };

  // Suburban / slightly above average
  if (z >= 21201 && z <= 21299)  return { tier: LOCATION_TIERS.suburban, region: 'Baltimore' };
  if (z >= 28201 && z <= 28299)  return { tier: LOCATION_TIERS.suburban, region: 'Charlotte' };
  if (z >= 43201 && z <= 43299)  return { tier: LOCATION_TIERS.suburban, region: 'Columbus' };
  if (z >= 46201 && z <= 46299)  return { tier: LOCATION_TIERS.suburban, region: 'Indianapolis' };
  if (z >= 73101 && z <= 73199)  return { tier: LOCATION_TIERS.suburban, region: 'Oklahoma City' };
  if (z >= 78201 && z <= 78299)  return { tier: LOCATION_TIERS.suburban, region: 'San Antonio' };
  if (z >= 85001 && z <= 85099)  return { tier: LOCATION_TIERS.suburban, region: 'Phoenix' };

  // Midwest / South affordability belt
  if (z >= 37201 && z <= 37299)  return { tier: LOCATION_TIERS.midwest_south, region: 'Nashville' };
  if (z >= 63101 && z <= 63199)  return { tier: LOCATION_TIERS.midwest_south, region: 'St. Louis' };
  if (z >= 75201 && z <= 75299)  return { tier: LOCATION_TIERS.midwest_south, region: 'Dallas' };
  if (z >= 78701 && z <= 78799)  return { tier: LOCATION_TIERS.midwest_south, region: 'Austin' };

  // Broad regional signals from first 1–2 digits
  const firstDigit = Math.floor(z / 10000);
  if (firstDigit === 0 || firstDigit === 1) return { tier: LOCATION_TIERS.coastal_city, region: 'Northeast' };
  if (firstDigit === 9)                     return { tier: LOCATION_TIERS.coastal_city, region: 'West Coast' };
  if (firstDigit === 4 || firstDigit === 5) return { tier: LOCATION_TIERS.midwest_south, region: 'Midwest' };
  if (firstDigit === 7)                     return { tier: LOCATION_TIERS.midwest_south, region: 'South' };
  if (firstDigit === 8)                     return { tier: LOCATION_TIERS.suburban, region: 'Mountain West' };

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

// For perishables, estimate what fraction of a bulk purchase the household will
// actually use before spoilage. 1.0 = uses it all, <1.0 = some waste expected.
function bulkUtilization(reqQty, warehouseMin, householdSize, sizeThreshold) {
  if (reqQty >= warehouseMin) return 1.0; // they need at least as much as warehouse min
  const askRatio = reqQty / warehouseMin;  // fraction of min they actually asked for
  const houseRatio = householdSize / sizeThreshold; // household capacity vs. ideal
  // Blend: give weight to both the ask ratio and the household's natural consumption capacity
  const capacityUtil = Math.min(1, houseRatio * 0.85);
  return Math.min(1, Math.max(askRatio, capacityUtil));
}

// Continuous household suitability score (0–1).
// Returns a score for how well this household can handle bulk buying in this category.
function householdSuitabilityScore(householdSize, catMeta) {
  return Math.min(1, householdSize / catMeta.sizeThreshold);
}

// Produce a human-readable recommendation label.
function recLabel(rec, category, perUnitPct) {
  if (rec === 'local') {
    if (CATEGORIES[category].bulkWasteRisk) return 'Buy Fresh';
    return 'Go Local';
  }
  if (category === 'meat') return 'Freeze & Stock';
  if (category === 'frozen' || category === 'pantry') return perUnitPct > 0.4 ? 'Stock Up' : 'Buy in Bulk';
  if (category === 'cleaning' || category === 'personal') return 'Stock Up';
  return 'Buy in Bulk';
}

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
  const perUnitPct = localPrice > 0 ? perUnitSavings / localPrice : 0;

  // ── Waste-adjusted effective warehouse price for perishables
  let effectiveWarehousePerUnit = warehousePrice;
  if (catMeta.bulkWasteRisk && warehouseQty > reqQty) {
    const utilization = bulkUtilization(reqQty, warehouseQty, householdSize, catMeta.sizeThreshold);
    // Effective cost = total spend divided by units actually used
    effectiveWarehousePerUnit = (warehousePrice * warehouseQty) / (warehouseQty * utilization);
  }
  const effectiveWarehouseTotal = effectiveWarehousePerUnit * reqQty;

  // ── Household suitability (continuous 0–1)
  const householdScore = householdSuitabilityScore(householdSize, catMeta);

  // ── Decision logic
  let rec = 'local';
  let confidence = 'high';
  let reasoning = '';
  let actualSavings = 0;
  const suit = catMeta.warehouseSuit;

  if (localPrice <= warehousePrice) {
    // Edge case: local is actually cheaper in this region
    rec = 'local';
    actualSavings = 0;
    reasoning = `Local stores in your area are competitive on this item — ${fmt(localPrice)}/${unit} locally vs. ${fmt(warehousePrice)} warehouse — no bulk advantage here.`;
  } else if (suit === 'low') {
    rec = 'local';
    reasoning = catMeta.note;
  } else if (suit === 'high') {
    // High-suitability items: always warehouse unless waste makes it worse
    if (catMeta.bulkWasteRisk && effectiveWarehouseTotal > localTotal * 1.05) {
      // Waste penalty erases the savings
      rec = 'local';
      reasoning = `Warehouse minimum is ${warehouseQty} ${unit} at ${fmt(warehousePrice)}/unit. For your household, that risks spoilage that erases the savings. ${fmt(localPrice)}/${unit} locally is the safer call.`;
      confidence = 'medium';
    } else {
      rec = 'warehouse';
      actualSavings = Math.max(0, (localPrice - warehousePrice) * reqQty);
      if (perUnitPct >= 0.40) {
        reasoning = `${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally — ${Math.round(perUnitPct * 100)}% cheaper per unit. A clear bulk win.`;
      } else if (perUnitPct >= 0.25) {
        reasoning = `${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally — ${Math.round(perUnitPct * 100)}% savings. ${catMeta.note}`;
      } else {
        reasoning = `${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally — ${Math.round(perUnitPct * 100)}% per-unit savings. ${catMeta.note}`;
      }
      confidence = perUnitPct >= 0.30 ? 'high' : 'medium';
    }
  } else {
    // conditional / medium — use continuous household score
    if (householdScore >= 1.0) {
      // Household meets or exceeds threshold — warehouse makes strong sense
      if (catMeta.bulkWasteRisk && effectiveWarehouseTotal > localTotal * 1.05) {
        rec = 'local';
        reasoning = `Even with ${householdSize} people, the warehouse quantity (${warehouseQty} ${unit} at ${fmt(warehousePrice)}/unit) may create waste. ${fmt(localPrice)}/${unit} locally keeps cost predictable.`;
        confidence = 'medium';
      } else {
        rec = 'warehouse';
        actualSavings = Math.max(0, (localPrice - warehousePrice) * reqQty);
        reasoning = `With ${householdSize} people you'll use this before it spoils. ${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally — ${Math.round(perUnitPct * 100)}% savings.`;
        confidence = 'high';
      }
    } else if (householdScore >= 0.65) {
      // Close to threshold — warehouse works if waste-adjusted price is still good
      if (catMeta.bulkWasteRisk && effectiveWarehouseTotal <= localTotal * 1.10) {
        rec = 'warehouse';
        actualSavings = Math.max(0, (localPrice - warehousePrice) * reqQty);
        reasoning = `${householdSize}-person household is slightly small for this category, but ${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally (${Math.round(perUnitPct * 100)}% savings) makes it worthwhile. Use promptly.`;
        confidence = 'medium';
      } else {
        rec = 'local';
        reasoning = `For ${householdSize} people, the warehouse quantity carries waste risk that could offset the savings vs. ${fmt(localPrice)}/${unit} locally. Buy fresh.`;
        confidence = 'medium';
      }
    } else {
      // Small household relative to threshold
      if (!catMeta.bulkWasteRisk && perUnitPct >= 0.30) {
        // Non-perishable with strong savings — still warehouse
        rec = 'warehouse';
        actualSavings = Math.max(0, (localPrice - warehousePrice) * reqQty);
        reasoning = `Shelf-stable — safe to stock up for any household size. ${fmt(warehousePrice)}/${unit} warehouse vs. ${fmt(localPrice)}/${unit} locally — ${Math.round(perUnitPct * 100)}% per-unit savings.`;
        confidence = 'medium';
      } else {
        rec = 'local';
        reasoning = `For a ${householdSize}-person household, bulk quantities risk waste or storage issues. ${fmt(localPrice)}/${unit} locally is the smarter pick. ${catMeta.note}`;
        confidence = householdScore >= 0.4 ? 'medium' : 'high';
      }
    }
  }

  // ── Compute label
  const label = recLabel(rec, category, perUnitPct);

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
    warehouseTotal: warehousePrice * reqQty, // same-quantity comparison
    warehouseTotalMin: warehouseTotal,         // actual minimum warehouse spend
    rec,
    recLabel: label,
    confidence,
    actualSavings: Math.max(0, actualSavings),
    reasoning,
    perUnitPct,
    householdScore,
  };
}

function analyzeBasket(items, householdSize, locationInfo, hasMembership) {
  const results = items.map(item => analyzeItem(item, householdSize, locationInfo, hasMembership));

  let localTotal = 0;
  let warehouseTotal = 0;
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
  const warehousePct = results.length > 0 ? warehouseItemCount / results.length : 0;
  if (warehousePct >= 0.75) strategy = 'warehouse';
  else if (warehousePct <= 0.25) strategy = 'local';

  // Trip-worth-it: is the warehouse trip financially justified?
  // Threshold: ~$12 savings or 3+ items — below this, separate trip may not make sense
  const TRIP_MIN_SAVINGS = 12;
  const TRIP_MIN_ITEMS = 3;
  const tripWorthIt = warehouseItemCount >= TRIP_MIN_ITEMS || warehouseSavings >= TRIP_MIN_SAVINGS;

  // Membership payback
  const MEMBERSHIP_COST_PER_YEAR = 65;
  const annualSavingsEstimate = warehouseSavings * 52;
  const payoffMonths = MEMBERSHIP_COST_PER_YEAR / (warehouseSavings > 0 ? (warehouseSavings * 4.33) : 1);

  return {
    items: results,
    warehouseItems: results.filter(r => r.rec === 'warehouse'),
    localItems: results.filter(r => r.rec !== 'warehouse'),
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
    tripWorthIt,
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

// In-session planning conversation thread
let plannerThread = [];

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

function strategyDesc(strategy, r, region) {
  const savingsNote = r.warehouseSavings > 0
    ? ` You'll save <strong>${fmt(r.warehouseSavings)}</strong> on this trip vs. buying everything locally.`
    : '';
  const annualNote = r.annualSavingsEstimate > 50
    ? ` At this pace, that's ~<strong>${fmt(r.annualSavingsEstimate)}</strong>/year.`
    : '';
  if (strategy === 'warehouse') {
    return `Most items on your ${r.totalItems}-item list are great in bulk. For ${region}, heading to a warehouse club (Costco, Sam's Club, BJ's) for your major shop makes strong financial sense.${savingsNote}${annualNote}`;
  }
  if (strategy === 'local') {
    return `Your list is heavy on perishables and fresh items. For your household in ${region}, a local grocery store will serve you better — less waste, fresher produce, and comparable or lower cost.`;
  }
  return `Your list mixes bulk-friendly staples with perishable fresh items. The smartest move: buy <strong>${r.warehouseItemCount} item${r.warehouseItemCount !== 1 ? 's' : ''}</strong> at a warehouse club and pick up the remaining <strong>${r.localItemCount}</strong> fresh items locally.${savingsNote}${annualNote}`;
}

function buildRecItemHTML(r) {
  const bg = catBg(r.category);
  const col = catColor(r.category);

  const isWarehouse = r.rec === 'warehouse';
  const badgeClass = isWarehouse ? 'rec-badge-warehouse' : 'rec-badge-local';
  const badgeIcon = isWarehouse
    ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
    : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

  const localPillClass  = !isWarehouse ? ' price-pill-selected' : '';
  const warehousePillClass = isWarehouse ? ' price-pill-selected' : '';
  const savingsHTML = r.actualSavings > 0.01
    ? `<span class="savings-chip">Save ${fmt(r.actualSavings)}</span>`
    : `<span class="no-savings-chip">—</span>`;
  const pctNote = r.actualSavings > 0.01
    ? `<span class="savings-pct">${Math.round(r.perUnitPct * 100)}% off/unit</span>` : '';

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
        ${r.unit !== 'each' ? `<span class="price-vs">${fmt(r.localPrice)} vs ${fmt(r.warehousePrice)} / ${r.unit}</span>` : ''}
      </div>
    </div>
    <div class="rec-item-right">
      <span class="rec-badge ${badgeClass}">${badgeIcon} ${r.recLabel}</span>
      ${savingsHTML}
      ${pctNote}
    </div>
  </div>`;
}

function buildShoppingPlan(analysis) {
  if (analysis.items.length === 0) return '';

  const makeItems = items => items.map(r => `
    <li class="plan-item" tabindex="0">
      <span class="plan-check" aria-hidden="true"></span>
      <span class="plan-item-icon" aria-hidden="true">${r.catMeta.icon}</span>
      <span class="plan-item-name">${r.catalogName}</span>
      <span class="plan-item-qty">× ${r.localQty} ${r.unit}</span>
    </li>`).join('');

  const wCol = analysis.warehouseItems.length > 0 ? `
    <div class="plan-col plan-col-warehouse">
      <div class="plan-col-head">
        <div class="plan-col-head-left">
          <span class="plan-col-store-icon">🏬</span>
          <span class="plan-col-title">Warehouse Club</span>
          <span class="plan-col-count">${analysis.warehouseItems.length}</span>
        </div>
        <button class="plan-copy-btn" data-copy-target="plan-wh">Copy list</button>
      </div>
      <ul class="plan-list" id="plan-wh">${makeItems(analysis.warehouseItems)}</ul>
    </div>` : '';

  const lCol = analysis.localItems.length > 0 ? `
    <div class="plan-col plan-col-local">
      <div class="plan-col-head">
        <div class="plan-col-head-left">
          <span class="plan-col-store-icon">🏪</span>
          <span class="plan-col-title">Local Grocery</span>
          <span class="plan-col-count">${analysis.localItems.length}</span>
        </div>
        <button class="plan-copy-btn" data-copy-target="plan-loc">Copy list</button>
      </div>
      <ul class="plan-list" id="plan-loc">${makeItems(analysis.localItems)}</ul>
    </div>` : '';

  return `
    <div class="shopping-plan-wrap">
      <div class="shopping-plan-hdr">
        <h3 class="shopping-plan-title">Your Shopping Plan</h3>
        <span class="shopping-plan-hint">Tap any item to check it off</span>
      </div>
      <div class="plan-columns">${wCol}${lCol}</div>
    </div>`;
}

function renderResults(analysis) {
  const region = state.locationInfo.region;

  // Strategy banner
  const cfg = STRATEGY_CONFIG[analysis.strategy];
  const savingsDisplay = analysis.warehouseSavings > 0
    ? `<div class="strategy-savings-badge">
        <div class="strategy-savings-amount">${fmt(analysis.warehouseSavings)}</div>
        <div class="strategy-savings-label">saved this trip</div>
        ${analysis.annualSavingsEstimate > 50 ? `<div class="strategy-savings-annual">~${fmt(analysis.annualSavingsEstimate)}/yr</div>` : ''}
       </div>`
    : '';
  el('strategy-banner').className = `strategy-banner ${cfg.cls}`;
  el('strategy-banner').innerHTML = `
    <div class="strategy-icon-wrap">${cfg.icon}</div>
    <div class="strategy-text">
      <div class="strategy-label">${cfg.label}</div>
      <div class="strategy-headline">${cfg.headline}</div>
      <div class="strategy-desc">${strategyDesc(analysis.strategy, analysis, region)}</div>
    </div>
    ${savingsDisplay}
  `;

  // Cost overview
  const maxCost = Math.max(analysis.localTotal, analysis.warehouseTotal, analysis.optimizedTotal, 0.01);
  const allW = fmt(analysis.warehouseTotal);
  const allL = fmt(analysis.localTotal);
  const optT = fmt(analysis.optimizedTotal);
  const stratLabel = { warehouse: 'Warehouse Only', local: 'Local Only', split: 'Optimized Split' };
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
      <div class="cost-card-sub">${analysis.warehouseSavings > 0 ? `Saves ${fmt(analysis.warehouseSavings)} vs. all local` : 'Comparable to all-local pricing'}</div>
      <div class="cost-bar-row">
        <div class="cost-bar-track">
          <div class="cost-bar-fill optimized" style="width:${(analysis.optimizedTotal/maxCost*100).toFixed(1)}%"></div>
        </div>
      </div>
    </div>
  `;

  // Shopping plan
  el('shopping-plan').innerHTML = buildShoppingPlan(analysis);
  el('shopping-plan').querySelectorAll('.plan-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('plan-item-done'));
    item.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); item.classList.toggle('plan-item-done'); }
    });
  });
  el('shopping-plan').querySelectorAll('.plan-copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const list = el(btn.dataset.copyTarget);
      if (!list) return;
      const lines = [...list.querySelectorAll('.plan-item')].map(li => {
        const name = li.querySelector('.plan-item-name').textContent;
        const qty = li.querySelector('.plan-item-qty').textContent;
        return `• ${name} ${qty}`;
      });
      navigator.clipboard.writeText(lines.join('\n')).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('plan-copy-btn-done');
        setTimeout(() => { btn.textContent = 'Copy list'; btn.classList.remove('plan-copy-btn-done'); }, 2000);
      }).catch(() => {});
    });
  });

  // ── Item breakdown — grouped by recommendation
  let recHTML = '';

  if (analysis.warehouseItems.length > 0) {
    recHTML += `
      <div class="rec-group-header rec-group-header-warehouse">
        <div class="rec-group-header-left">
          <span class="rec-group-store-icon">🏬</span>
          <span class="rec-group-title">Buy at Warehouse Club</span>
        </div>
        <span class="rec-group-count">${analysis.warehouseItems.length} item${analysis.warehouseItems.length !== 1 ? 's' : ''}</span>
      </div>
      ${analysis.warehouseItems.map(buildRecItemHTML).join('')}
    `;
  }

  if (analysis.localItems.length > 0) {
    if (analysis.warehouseItems.length > 0) {
      recHTML += `<div class="rec-group-divider"></div>`;
    }
    recHTML += `
      <div class="rec-group-header rec-group-header-local">
        <div class="rec-group-header-left">
          <span class="rec-group-store-icon">🏪</span>
          <span class="rec-group-title">Buy at Local Grocery</span>
        </div>
        <span class="rec-group-count">${analysis.localItems.length} item${analysis.localItems.length !== 1 ? 's' : ''}</span>
      </div>
      ${analysis.localItems.map(buildRecItemHTML).join('')}
    `;
  }

  // Trip-worth-it note (when warehouse savings are modest)
  if (analysis.warehouseItems.length > 0 && !analysis.tripWorthIt) {
    recHTML += `
      <div class="trip-threshold-alert">
        <div class="trip-threshold-icon">🚗</div>
        <div class="trip-threshold-text">
          <strong>Trip check:</strong> Your warehouse savings total ${fmt(analysis.warehouseSavings)} on ${analysis.warehouseItemCount} item${analysis.warehouseItemCount !== 1 ? 's' : ''}.
          If the warehouse is nearby, it's worth it — otherwise, consider combining with a larger haul.
        </div>
      </div>
    `;
  }

  el('rec-items').innerHTML = recHTML;

  // Insights
  const insights = generateInsights(analysis, state.householdSize, state.locationInfo, state.hasMembership);
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
          Based on your list, you'd save ~${fmt(analysis.warehouseSavings)} per trip.
          A Costco membership is ~$65/year ($5.42/mo); Sam's Club ~$50/year ($4.17/mo).
          Shopping this way weekly = ~${fmt(analysis.annualSavingsEstimate)}/year in savings — well above the membership fee.
        </div>
      </div>
    `;
  } else {
    roiEl.style.display = 'none';
  }
}

function generateInsights(analysis, householdSize, locationInfo, hasMembership) {
  const insights = [];

  // Perishables insight — only show if there are perishables going local
  const perishableItems = analysis.localItems.filter(r => r.catMeta.bulkWasteRisk);
  if (perishableItems.length > 0) {
    const names = perishableItems.slice(0, 2).map(i => `<strong>${i.catalogName}</strong>`).join(' and ');
    insights.push({
      icon: '🌿',
      bg: '#D1FAE5', color: '#065F46',
      title: 'Buy Fresh Locally',
      body: `${names} ${perishableItems.length > 1 ? 'are' : 'is'} perishable. Buying only what you'll use in a week means better quality and less food waste — the local grocery wins here.`,
    });
  }

  // Biggest bulk savings item
  const bulkWins = analysis.warehouseItems.filter(r => r.actualSavings > 0.50);
  if (bulkWins.length > 0) {
    const topSaver = [...bulkWins].sort((a, b) => b.actualSavings - a.actualSavings)[0];
    const pct = Math.round(topSaver.perUnitPct * 100);
    insights.push({
      icon: '📦',
      bg: '#DBEAFE', color: '#1E40AF',
      title: `Biggest Bulk Win: ${topSaver.catalogName}`,
      body: `<strong>${topSaver.catalogName}</strong> saves you ${fmt(topSaver.actualSavings)} on this trip — that's <strong>${pct}% cheaper per ${topSaver.unit}</strong> at the warehouse. This category (${topSaver.catMeta.name}) is a warehouse sweet spot.`,
    });
  }

  // Household-size specific advice
  if (householdSize <= 2) {
    const warehousePerishables = analysis.warehouseItems.filter(r => r.catMeta.bulkWasteRisk);
    const nonPerishableRec = ['cleaning', 'pantry', 'personal', 'frozen', 'beverages'];
    const strongBulkItems = analysis.warehouseItems.filter(r => nonPerishableRec.includes(r.category));
    if (strongBulkItems.length > 0) {
      insights.push({
        icon: '👤',
        bg: '#F3E8FF', color: '#6B21A8',
        title: `Small Household Strategy`,
        body: `For ${householdSize} ${householdSize === 1 ? 'person' : 'people'}, focus warehouse trips on shelf-stable wins: ${strongBulkItems.slice(0, 3).map(i => `<strong>${i.catalogName}</strong>`).join(', ')}. For perishables, buy small and buy local.${warehousePerishables.length > 0 ? ' Items like ' + warehousePerishables.map(i => i.catalogName).join(', ') + ' have been cleared as manageable even at smaller scale.' : ''}`,
      });
    } else {
      insights.push({
        icon: '👤',
        bg: '#F3E8FF', color: '#6B21A8',
        title: 'Small Household Tip',
        body: `With ${householdSize} ${householdSize === 1 ? 'person' : 'people'}, prioritize warehouse for paper goods, cleaning supplies, pantry staples, and frozen foods. Consider sharing a membership with a neighbor or family member to maximize value.`,
      });
    }
  } else if (householdSize >= 4) {
    const bulkReadyCategories = [...new Set(analysis.warehouseItems.map(r => r.catMeta.name))];
    insights.push({
      icon: '👨‍👩‍👧‍👦',
      bg: '#FEF3C7', color: '#92400E',
      title: `${householdSize}-Person Household Advantage`,
      body: `With ${householdSize} people, you move through groceries fast enough to unlock bulk buying across more categories — ${bulkReadyCategories.slice(0, 3).join(', ')} included. This is where warehouse clubs are built for you.`,
    });
  }

  // Location insight (only for higher-cost regions)
  if (locationInfo.tier.localMultiplier >= 1.15) {
    const uplift = Math.round((locationInfo.tier.localMultiplier - 1) * 100);
    const warehouseUplift = Math.round((locationInfo.tier.warehouseMultiplier - 1) * 100);
    const gap = uplift - warehouseUplift;
    insights.push({
      icon: '📍',
      bg: '#FFF7ED', color: '#9A3412',
      title: `${locationInfo.region}: Wider Savings Gap`,
      body: `Local grocery prices in ${locationInfo.region} run ~${uplift}% above the national average, while warehouse prices only rise ~${warehouseUplift}%. That ${gap}-point gap <strong>amplifies your bulk savings</strong> — especially on produce, dairy, and protein.`,
    });
  } else if (locationInfo.tier === LOCATION_TIERS.rural || locationInfo.tier.localMultiplier < 0.95) {
    insights.push({
      icon: '📍',
      bg: '#FFF7ED', color: '#9A3412',
      title: `${locationInfo.region}: Factor in the Trip`,
      body: `Local grocery prices in your area are below average, which narrows the warehouse savings gap. If a warehouse club requires a dedicated trip, make sure your savings (${fmt(analysis.warehouseSavings)} this run) justify the gas and time. Consider a monthly consolidated haul.`,
    });
  }

  // Meat freezing tip
  const meatItems = analysis.warehouseItems.filter(r => r.category === 'meat');
  if (meatItems.length > 0) {
    insights.push({
      icon: '🧊',
      bg: '#E0F2FE', color: '#0C4A6E',
      title: 'Freeze Meat in Portions',
      body: `Warehouse packs of ${meatItems.map(i => i.catalogName).join(', ')} are great value — but portion them before freezing. Divide into meal-sized bags the same day you buy. Properly wrapped, these proteins freeze well for 4–6 months.`,
    });
  }

  // Annual savings projection (if meaningful)
  if (analysis.annualSavingsEstimate >= 100 && analysis.warehouseItems.length > 0) {
    insights.push({
      icon: '📈',
      bg: '#F0FDF4', color: '#14532D',
      title: 'Annual Savings Projection',
      body: `If you shop this way every week, your warehouse savings add up to ~<strong>${fmt(analysis.annualSavingsEstimate)}/year</strong>. Even shopping this way twice a month puts you at ~${fmt(analysis.annualSavingsEstimate / 2.5)}/year — well above the membership cost${hasMembership ? '' : ' (if you join)'}.`,
    });
  }

  // Category guide — always include as last resort if we don't have 4 insights
  if (insights.length < 3) {
    insights.push({
      icon: '🗺️',
      bg: '#F0FDF4', color: '#14532D',
      title: 'Quick Category Guide',
      body: `<ul>
        <li><strong>Always warehouse:</strong> paper goods, cleaning, nuts, coffee, olive oil</li>
        <li><strong>Usually warehouse:</strong> meat (freeze it), frozen foods, canned goods, dairy (larger households)</li>
        <li><strong>Usually local:</strong> fresh produce, bread, specialty items</li>
        <li><strong>It depends:</strong> snacks (check dates), yogurt, eggs (household size matters)</li>
      </ul>`,
    });
  }

  return insights.slice(0, 4);
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────

const PROFILE_KEY = 'smartcart_profile';
const HISTORY_KEY = 'smartcart_planner_history';

function getProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null'); } catch (e) { return null; }
}

function saveProfile(data) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

function defaultProfile() {
  return {
    name: '', householdSize: 2, zip: '', hasMembership: true,
    fitnessGoal: '', healthConcerns: [], favoriteFoods: '',
    dislikedFoods: '', cuisines: [], budgetStyle: 'balanced', shoppingFrequency: 'weekly',
  };
}

function readProfileForm() {
  const profile = defaultProfile();
  profile.name              = (document.getElementById('profile-name')?.value || '').trim();
  profile.zip               = (document.getElementById('profile-zip')?.value || '').trim();
  profile.fitnessGoal       = (document.getElementById('profile-fitness-goal')?.value || '').trim();
  profile.favoriteFoods     = (document.getElementById('profile-fav-foods')?.value || '').trim();
  profile.dislikedFoods     = (document.getElementById('profile-disliked-foods')?.value || '').trim();
  profile.hasMembership     = document.getElementById('profile-toggle-yes')?.classList.contains('active') ?? true;
  profile.budgetStyle       = document.querySelector('input[name="budget-style"]:checked')?.value || 'balanced';
  profile.shoppingFrequency = document.querySelector('input[name="shop-frequency"]:checked')?.value || 'weekly';
  const activeSize = document.querySelector('#profile-size-picker .size-btn.active');
  profile.householdSize     = activeSize ? parseInt(activeSize.dataset.val, 10) || 2 : 2;
  profile.healthConcerns    = Array.from(document.querySelectorAll('input[name="health"]:checked')).map(c => c.value);
  profile.cuisines          = Array.from(document.querySelectorAll('input[name="cuisine"]:checked')).map(c => c.value);
  return profile;
}

function populateProfileForm(profile) {
  if (!profile) return;
  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
  setVal('profile-name', profile.name);
  setVal('profile-zip', profile.zip);
  setVal('profile-fitness-goal', profile.fitnessGoal);
  setVal('profile-fav-foods', profile.favoriteFoods);
  setVal('profile-disliked-foods', profile.dislikedFoods);

  // Household size picker
  document.querySelectorAll('#profile-size-picker .size-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.val, 10) === (profile.householdSize || 2));
  });

  // Membership toggles
  const hs = profile.hasMembership !== false;
  document.getElementById('profile-toggle-yes')?.classList.toggle('active', hs);
  document.getElementById('profile-toggle-no')?.classList.toggle('active', !hs);

  // Budget style
  const budgetRadio = document.querySelector(`input[name="budget-style"][value="${profile.budgetStyle || 'balanced'}"]`);
  if (budgetRadio) budgetRadio.checked = true;

  // Shopping frequency
  const freqRadio = document.querySelector(`input[name="shop-frequency"][value="${profile.shoppingFrequency || 'weekly'}"]`);
  if (freqRadio) freqRadio.checked = true;

  // Health concerns
  document.querySelectorAll('input[name="health"]').forEach(cb => {
    cb.checked = (profile.healthConcerns || []).includes(cb.value);
  });

  // Cuisines
  document.querySelectorAll('input[name="cuisine"]').forEach(cb => {
    cb.checked = (profile.cuisines || []).includes(cb.value);
  });
}

function renderProfileGreeting() {
  const profile = getProfile();
  const name = profile?.name?.trim() || '';
  const chip = document.getElementById('header-profile-chip');
  const nameEl = document.getElementById('header-profile-name');
  const avatarEl = document.getElementById('header-profile-avatar');
  const heroNameEl = document.getElementById('profile-tab-hero-name');
  const avatarTabEl = document.getElementById('profile-tab-avatar');
  const navLabel = document.getElementById('nav-profile-label');

  if (name) {
    const initial = name.charAt(0).toUpperCase();
    if (chip) chip.style.display = 'flex';
    if (nameEl) nameEl.textContent = 'Hi, ' + name.split(' ')[0];
    if (avatarEl) { avatarEl.innerHTML = initial; }
    if (heroNameEl) heroNameEl.textContent = name + "'s Profile";
    if (avatarTabEl) { avatarTabEl.textContent = initial; }
    if (navLabel) navLabel.textContent = name.split(' ')[0].slice(0, 8);
  } else {
    if (chip) chip.style.display = 'none';
    if (heroNameEl) heroNameEl.textContent = 'Your Profile';
    if (avatarTabEl) {
      avatarTabEl.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    }
    if (navLabel) navLabel.textContent = 'Profile';
  }
}

function syncProfileToState(profile) {
  if (!profile) return;
  if (profile.householdSize) {
    state.householdSize = profile.householdSize;
    document.querySelectorAll('#size-picker .size-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val, 10) === profile.householdSize);
    });
    const hintEl = document.getElementById('size-hint-text');
    if (hintEl) {
      const hints = {
        1: 'Solo shopper — warehouse bulk is rarely worth it for perishables.',
        2: 'Small household — fresh produce and perishables usually best bought locally.',
        3: 'Medium household — a good mix of warehouse and local shopping.',
        4: 'Growing household — most bulk items start making great sense.',
        5: 'Large household — warehouse club is almost always the better choice.',
        6: 'Big household — warehouse club delivers outstanding value across the board.',
      };
      hintEl.textContent = hints[profile.householdSize] || hints[2];
    }
  }
  if (profile.zip) {
    state.zip = profile.zip;
    const zipInput = document.getElementById('zip-input');
    if (zipInput && !zipInput.value) zipInput.value = profile.zip;
    // Trigger location lookup if input is empty and profile has zip
    if (zipInput && zipInput.value === profile.zip) zipInput.dispatchEvent(new Event('input'));
  }
  if (typeof profile.hasMembership === 'boolean') {
    state.hasMembership = profile.hasMembership;
    document.getElementById('toggle-yes')?.classList.toggle('active', profile.hasMembership);
    document.getElementById('toggle-no')?.classList.toggle('active', !profile.hasMembership);
    const noteEl = document.getElementById('membership-note');
    if (noteEl) noteEl.textContent = profile.hasMembership
      ? 'Costco: ~$65/yr\u00a0\u00a0•\u00a0\u00a0Sam\'s Club: ~$50/yr'
      : 'No membership fee factored in';
  }
}

function renderProfileGoalHint() {
  const profile = getProfile();
  const hint = document.getElementById('profile-goal-hint');
  const hintText = document.getElementById('profile-goal-hint-text');
  if (!hint) return;
  if (profile?.fitnessGoal) {
    const truncated = profile.fitnessGoal.length > 60 ? profile.fitnessGoal.slice(0, 60) + '…' : profile.fitnessGoal;
    if (hintText) hintText.textContent = 'Your saved goal: ' + truncated;
    hint.style.display = 'flex';
  } else {
    hint.style.display = 'none';
  }
}

// ─── PLANNER HISTORY ─────────────────────────────────────────────────────────

function getPlannerHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch (e) { return []; }
}

function savePlannerHistory() {
  if (plannerThread.length === 0) return;
  const history = getPlannerHistory();
  const entry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    goalText: plannerThread[0]?.userMsg || '',
    headline: plannerThread[0]?.label || '',
    turns: plannerThread.length,
    thread: plannerThread.map(t => ({ ...t })),
  };
  history.unshift(entry);
  // Keep last 20 sessions
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function loadLastPlannerSession() {
  const history = getPlannerHistory();
  if (!history.length) return;
  const last = history[0];
  if (!last.thread || !last.thread.length) return;
  plannerThread = last.thread;
  renderPlannerThread();
  // Show update-wish section if we restored a session
  const updateWishEl = el('update-wish-section');
  if (updateWishEl) updateWishEl.style.display = '';
}

function renderProfileHistory() {
  const history = getPlannerHistory();
  const listEl = document.getElementById('profile-history-list');
  const emptyEl = document.getElementById('profile-history-empty');
  if (!listEl || !emptyEl) return;

  if (!history.length) {
    emptyEl.style.display = '';
    listEl.innerHTML = '';
    return;
  }
  emptyEl.style.display = 'none';

  listEl.innerHTML = history.map(entry => {
    const d = new Date(entry.date);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const goalTrunc = entry.goalText.length > 100 ? entry.goalText.slice(0, 100) + '…' : entry.goalText;
    return `<div class="history-item" data-history-id="${escHtml(entry.id)}">
      <div class="history-item-header">
        <div class="history-item-meta">
          <span class="history-item-date">${escHtml(dateStr)} at ${escHtml(timeStr)}</span>
          ${entry.headline ? `<span class="history-item-badge">${escHtml(entry.headline)}</span>` : ''}
        </div>
        <button class="history-item-btn btn-resume-session" data-history-id="${escHtml(entry.id)}">Resume →</button>
      </div>
      <div class="history-item-goal">"${escHtml(goalTrunc)}"</div>
      <div class="history-item-turns">${entry.turns} planning turn${entry.turns !== 1 ? 's' : ''}</div>
    </div>`;
  }).join('');

  listEl.querySelectorAll('.btn-resume-session').forEach(btn => {
    btn.addEventListener('click', () => resumeSession(btn.dataset.historyId));
  });
}

function resumeSession(id) {
  const history = getPlannerHistory();
  const entry = history.find(h => h.id === id);
  if (!entry || !entry.thread) return;
  plannerThread = entry.thread;
  renderPlannerThread();
  const updateWishEl = el('update-wish-section');
  if (updateWishEl) updateWishEl.style.display = '';
  switchTab('goals');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── BUDGET & RECEIPTS ───────────────────────────────────────────────────────

const BUDGET_KEY   = 'smartcart_budget';
const RECEIPTS_KEY = 'smartcart_receipts';

function getBudget() {
  try { return JSON.parse(localStorage.getItem(BUDGET_KEY) || 'null'); } catch (e) { return null; }
}
function saveBudget(data) { localStorage.setItem(BUDGET_KEY, JSON.stringify(data)); }

function getReceipts() {
  try { return JSON.parse(localStorage.getItem(RECEIPTS_KEY) || '[]'); } catch (e) { return []; }
}
function addReceipt(receipt) {
  const all = getReceipts();
  all.unshift(receipt);
  localStorage.setItem(RECEIPTS_KEY, JSON.stringify(all.slice(0, 50)));
}

// ── Mock receipt templates (simulated scan results) ──────────────────────────
const RECEIPT_TEMPLATES = [
  {
    store: 'Kroger',
    items: [
      { name: 'Chicken Breast',  category: 'meat',      qty: 2,   unitPrice: 4.99,  total: 9.98  },
      { name: 'Eggs',            category: 'dairy',     qty: 1,   unitPrice: 5.49,  total: 5.49  },
      { name: 'Spinach',         category: 'produce',   qty: 1,   unitPrice: 3.99,  total: 3.99  },
      { name: 'Bananas',         category: 'produce',   qty: 2,   unitPrice: 0.29,  total: 0.58  },
      { name: 'Greek Yogurt',    category: 'dairy',     qty: 4,   unitPrice: 1.79,  total: 7.16  },
      { name: 'Pasta',           category: 'pantry',    qty: 2,   unitPrice: 1.99,  total: 3.98  },
      { name: 'Broccoli',        category: 'produce',   qty: 2,   unitPrice: 1.99,  total: 3.98  },
      { name: 'Coffee',          category: 'beverages', qty: 1,   unitPrice: 11.99, total: 11.99 },
      { name: 'Canned Beans',    category: 'pantry',    qty: 3,   unitPrice: 1.29,  total: 3.87  },
      { name: 'Olive Oil',       category: 'pantry',    qty: 1,   unitPrice: 9.99,  total: 9.99  },
    ],
  },
  {
    store: 'Whole Foods Market',
    items: [
      { name: 'Salmon',          category: 'meat',      qty: 1,   unitPrice: 13.99, total: 13.99 },
      { name: 'Avocados',        category: 'produce',   qty: 4,   unitPrice: 1.49,  total: 5.96  },
      { name: 'Blueberries',     category: 'produce',   qty: 2,   unitPrice: 4.49,  total: 8.98  },
      { name: 'Strawberries',    category: 'produce',   qty: 1,   unitPrice: 3.99,  total: 3.99  },
      { name: 'Milk',            category: 'dairy',     qty: 1,   unitPrice: 4.29,  total: 4.29  },
      { name: 'Shredded Cheese', category: 'dairy',     qty: 1,   unitPrice: 5.49,  total: 5.49  },
      { name: 'Oatmeal',         category: 'pantry',    qty: 1,   unitPrice: 4.49,  total: 4.49  },
      { name: 'Honey',           category: 'pantry',    qty: 1,   unitPrice: 7.99,  total: 7.99  },
      { name: 'Tea',             category: 'beverages', qty: 1,   unitPrice: 4.99,  total: 4.99  },
    ],
  },
  {
    store: 'Target',
    items: [
      { name: 'Ground Beef',     category: 'meat',      qty: 2,   unitPrice: 6.49,  total: 12.98 },
      { name: 'Potatoes',        category: 'produce',   qty: 5,   unitPrice: 0.89,  total: 4.45  },
      { name: 'Onions',          category: 'produce',   qty: 3,   unitPrice: 0.79,  total: 2.37  },
      { name: 'Canned Tomatoes', category: 'pantry',    qty: 4,   unitPrice: 1.49,  total: 5.96  },
      { name: 'Canned Tuna',     category: 'pantry',    qty: 6,   unitPrice: 1.49,  total: 8.94  },
      { name: 'Rice',            category: 'pantry',    qty: 2,   unitPrice: 2.49,  total: 4.98  },
      { name: 'Soda',            category: 'beverages', qty: 2,   unitPrice: 6.49,  total: 12.98 },
      { name: 'Snacks',          category: 'snacks',    qty: 2,   unitPrice: 3.99,  total: 7.98  },
      { name: 'Cereal',          category: 'pantry',    qty: 1,   unitPrice: 4.99,  total: 4.99  },
    ],
  },
  {
    store: "Trader Joe's",
    items: [
      { name: 'Ground Turkey',   category: 'meat',      qty: 2,   unitPrice: 5.99,  total: 11.98 },
      { name: 'Bell Peppers',    category: 'produce',   qty: 4,   unitPrice: 1.29,  total: 5.16  },
      { name: 'Tomatoes',        category: 'produce',   qty: 2,   unitPrice: 2.49,  total: 4.98  },
      { name: 'Romaine Lettuce', category: 'produce',   qty: 2,   unitPrice: 2.99,  total: 5.98  },
      { name: 'Eggs',            category: 'dairy',     qty: 2,   unitPrice: 5.49,  total: 10.98 },
      { name: 'Butter',          category: 'dairy',     qty: 1,   unitPrice: 5.99,  total: 5.99  },
      { name: 'Frozen Vegetables', category: 'frozen',  qty: 3,   unitPrice: 2.49,  total: 7.47  },
      { name: 'Peanut Butter',   category: 'pantry',    qty: 1,   unitPrice: 4.99,  total: 4.99  },
      { name: 'Orange Juice',    category: 'beverages', qty: 1,   unitPrice: 4.99,  total: 4.99  },
    ],
  },
];

// Pending parsed receipt (not yet confirmed)
let pendingReceipt = null;

// ── Period helpers ────────────────────────────────────────────────────────────

function getPeriodDates(period) {
  const now = new Date();
  let start, end;
  if (period === 'weekly') {
    const day = now.getDay(); // 0=Sun
    const diffToMon = day === 0 ? 6 : day - 1;
    start = new Date(now); start.setDate(now.getDate() - diffToMon); start.setHours(0, 0, 0, 0);
    end   = new Date(start); end.setDate(start.getDate() + 6); end.setHours(23, 59, 59, 999);
  } else if (period === 'biweekly') {
    start = new Date(now); start.setDate(now.getDate() - 13); start.setHours(0, 0, 0, 0);
    end   = new Date(now); end.setHours(23, 59, 59, 999);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }
  return { start, end };
}

function getReceiptsForPeriod(receipts, period) {
  const { start, end } = getPeriodDates(period);
  return receipts.filter(r => { const d = new Date(r.date); return d >= start && d <= end; });
}

function aggregateByCategory(receipts) {
  const totals = {};
  receipts.forEach(r => r.items.forEach(item => {
    const cat = item.category || 'other';
    totals[cat] = (totals[cat] || 0) + item.total;
  }));
  return totals;
}

// ── Budget tab rendering ──────────────────────────────────────────────────────

function renderBudgetTab() {
  const budget = getBudget();

  // Populate settings form
  const period = (budget && budget.period) || 'weekly';
  document.querySelectorAll('.budget-period-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.period === period);
  });
  const amtInput = document.getElementById('budget-amount-input');
  if (amtInput && budget && budget.amount) amtInput.value = budget.amount;

  renderBudgetSummary();
  renderSpendingCategories();
  renderBudgetRecommendations();
  renderReceiptHistory();
}

function renderBudgetSummary() {
  const el = document.getElementById('budget-summary-content');
  if (!el) return;
  const budget = getBudget();
  const receipts = getReceipts();
  const period = (budget && budget.period) || 'weekly';
  const target = budget && budget.amount ? parseFloat(budget.amount) : 0;
  const periodReceipts = getReceiptsForPeriod(receipts, period);
  const spent = periodReceipts.reduce((s, r) => s + r.total, 0);

  if (!target) {
    el.innerHTML = `<div class="budget-summary-empty">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      <span>Set a spend target above to track your budget progress</span>
    </div>`;
    return;
  }

  const { start, end } = getPeriodDates(period);
  const now = new Date();
  const totalMs = end - start;
  const elapsedMs = Math.min(now - start, totalMs);
  const daysTotal = Math.round(totalMs / 86400000) + 1;
  const daysLeft  = Math.max(0, Math.ceil((end - now) / 86400000));
  const pct = Math.min(100, Math.round(spent / target * 100));
  const remaining = Math.max(0, target - spent);

  // Pace status
  const expectedSpend = target * (elapsedMs / totalMs);
  const paceRatio = expectedSpend > 0 ? spent / expectedSpend : 0;
  let paceClass = 'budget-pace-ok', paceLabel = 'On track';
  if (paceRatio > 1.15) { paceClass = 'budget-pace-over'; paceLabel = 'Over pace'; }
  else if (paceRatio < 0.75 && spent > 0) { paceClass = 'budget-pace-under'; paceLabel = 'Under pace'; }

  const periodLabel = period === 'weekly' ? 'week' : period === 'biweekly' ? '2 weeks' : 'month';
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr   = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const barColor = pct > 90 ? '#EF4444' : pct > 70 ? '#F59E0B' : '#2D9E5F';

  el.innerHTML = `
    <div class="budget-summary-period">${startStr} – ${endStr} · ${daysTotal}-day ${periodLabel}</div>
    <div class="budget-summary-amounts">
      <div class="budget-summary-spent">
        <span class="budget-summary-spent-amt">$${spent.toFixed(2)}</span>
        <span class="budget-summary-spent-of"> of $${target.toFixed(0)}</span>
      </div>
      <div class="budget-pace-badge ${paceClass}">${paceLabel}</div>
    </div>
    <div class="budget-progress-track">
      <div class="budget-progress-fill" style="width:${pct}%;background:${barColor}"></div>
    </div>
    <div class="budget-summary-meta">
      <span>$${remaining.toFixed(2)} remaining</span>
      <span>${daysLeft} day${daysLeft !== 1 ? 's' : ''} left</span>
    </div>
    ${periodReceipts.length === 0 ? '<div class="budget-summary-hint">Capture a receipt below to start tracking</div>' : ''}
  `;
}

function renderSpendingCategories() {
  const card  = document.getElementById('budget-categories-card');
  const label = document.getElementById('budget-cats-label');
  const el    = document.getElementById('budget-categories-content');
  if (!el) return;

  const budget = getBudget();
  const period = (budget && budget.period) || 'weekly';
  const periodReceipts = getReceiptsForPeriod(getReceipts(), period);

  if (periodReceipts.length === 0) {
    if (card)  card.style.display  = 'none';
    if (label) label.style.display = 'none';
    return;
  }
  if (card)  card.style.display  = '';
  if (label) label.style.display = '';

  const catTotals = aggregateByCategory(periodReceipts);
  const totalSpent = Object.values(catTotals).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  const CAT_DISPLAY = {
    produce: 'Produce', dairy: 'Dairy', meat: 'Protein', pantry: 'Pantry',
    frozen: 'Frozen', beverages: 'Beverages', snacks: 'Snacks',
    cleaning: 'Household', personal: 'Personal Care', bakery: 'Bakery', specialty: 'Specialty',
  };

  el.innerHTML = sorted.map(([cat, amt]) => {
    const pct    = Math.round(amt / totalSpent * 100);
    const color  = catColor(cat);
    const label  = CAT_DISPLAY[cat] || cat;
    const icon   = CATEGORIES[cat]?.icon || '🛒';
    return `
      <div class="spending-cat-row">
        <div class="spending-cat-info">
          <span class="spending-cat-icon">${icon}</span>
          <span class="spending-cat-name">${escHtml(label)}</span>
        </div>
        <div class="spending-cat-bar-wrap">
          <div class="spending-cat-bar" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="spending-cat-amounts">
          <span class="spending-cat-pct">${pct}%</span>
          <span class="spending-cat-amt">$${amt.toFixed(2)}</span>
        </div>
      </div>`;
  }).join('');
}

function renderBudgetRecommendations() {
  const listEl = document.getElementById('budget-recs-list');
  const label  = document.getElementById('budget-recs-label');
  if (!listEl) return;

  const budget = getBudget();
  const period = (budget && budget.period) || 'weekly';
  const allReceipts = getReceipts();
  const periodReceipts = getReceiptsForPeriod(allReceipts, period);
  const catTotals = aggregateByCategory(periodReceipts);
  const totalSpent = Object.values(catTotals).reduce((s, v) => s + v, 0);
  const target = budget && budget.amount ? parseFloat(budget.amount) : 0;

  const recs = [];

  // 1. Budget pace
  if (target > 0 && periodReceipts.length > 0) {
    const { start, end } = getPeriodDates(period);
    const now = new Date();
    const totalMs   = end - start;
    const elapsedMs = Math.min(now - start, totalMs);
    const expectedSpend = target * (elapsedMs / totalMs);
    const paceRatio = expectedSpend > 0 ? totalSpent / expectedSpend : 0;
    if (paceRatio < 0.8) {
      recs.push({ type: 'positive', icon: '🎯', title: 'Well under pace', text: `You're spending ${Math.round((1 - paceRatio) * 100)}% less than expected for this point in your ${period} budget — great discipline. Consider stocking up on non-perishables now.` });
    } else if (paceRatio > 1.2) {
      recs.push({ type: 'warning', icon: '⚠️', title: 'Over budget pace', text: `Spending is running ${Math.round((paceRatio - 1) * 100)}% over pace for this ${period} budget. Focus on essentials and hold off on snacks or beverages to catch up.` });
    } else {
      recs.push({ type: 'positive', icon: '✅', title: 'On track', text: `Your ${period} grocery spend is right on pace. You\'re in great shape — keep it up!` });
    }
  } else if (target > 0) {
    recs.push({ type: 'neutral', icon: '📷', title: 'Ready to track', text: `Your $${target}/period budget is set. Capture your first receipt below to start tracking your spend.` });
  } else {
    recs.push({ type: 'neutral', icon: '💡', title: 'Set a budget', text: 'Add a spend target above to unlock budget pace tracking and personalized tips.' });
  }

  // 2. Top spend category
  const sorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  if (sorted.length > 0) {
    const [topCat, topAmt] = sorted[0];
    const pct     = Math.round(topAmt / totalSpent * 100);
    const catMeta = CATEGORIES[topCat];
    if (catMeta && catMeta.warehouseSuit === 'high') {
      recs.push({ type: 'tip', icon: '🏪', title: 'Bulk savings opportunity', text: `${catMeta.name} is your top spend at $${topAmt.toFixed(2)} (${pct}%). Warehouse bulk buying typically saves 25–40% in this category — worth a Costco or Sam's run.` });
    } else if (catMeta && catMeta.warehouseSuit === 'conditional') {
      recs.push({ type: 'info', icon: '💡', title: 'Smart buying mix', text: `${catMeta.name} leads your spend at ${pct}%. Mix fresh local buys with selective bulk for the best value on longer-shelf-life items.` });
    }
  }

  // 3. Snacks + beverages insight
  const snackBev = (catTotals['snacks'] || 0) + (catTotals['beverages'] || 0);
  if (totalSpent > 0 && snackBev / totalSpent > 0.2) {
    recs.push({ type: 'tip', icon: '🍿', title: 'Bulk wins for beverages & snacks', text: `Snacks and beverages make up ${Math.round(snackBev / totalSpent * 100)}% of your spending. Both categories see outstanding per-unit savings at warehouse clubs.` });
  }

  // 4. Protein + frozen combo
  const meatSpend   = catTotals['meat']   || 0;
  const frozenSpend = catTotals['frozen'] || 0;
  if (meatSpend > 15 && frozenSpend < 5) {
    recs.push({ type: 'tip', icon: '❄️', title: 'Extend your protein budget', text: `You spent $${meatSpend.toFixed(2)} on protein. Supplementing with frozen fish, shrimp, or chicken can cut your protein cost by 20–30% with zero nutrition trade-off.` });
  }

  // 5. Good pantry discipline
  const pantrySpend = catTotals['pantry'] || 0;
  if (totalSpent > 30 && pantrySpend > 0 && pantrySpend / totalSpent < 0.12) {
    recs.push({ type: 'positive', icon: '✨', title: 'Strong pantry management', text: `You\'re keeping pantry spend lean at ${Math.round(pantrySpend / totalSpent * 100)}%. When you do restock, buying staples in bulk delivers some of the best long-term savings.` });
  }

  if (label) label.style.display = '';
  listEl.innerHTML = recs.slice(0, 4).map(rec => `
    <div class="budget-rec-card card">
      <div class="budget-rec-icon-wrap budget-rec-type-${rec.type}">${rec.icon}</div>
      <div class="budget-rec-body">
        <div class="budget-rec-title">${escHtml(rec.title)}</div>
        <div class="budget-rec-text">${escHtml(rec.text)}</div>
      </div>
    </div>`).join('');
}

function renderReceiptHistory() {
  const listEl = document.getElementById('budget-receipts-list');
  const label  = document.getElementById('budget-receipts-label');
  if (!listEl) return;
  const receipts = getReceipts();
  if (receipts.length === 0) {
    listEl.style.display  = 'none';
    if (label) label.style.display = 'none';
    return;
  }
  listEl.style.display  = '';
  if (label) label.style.display = '';

  listEl.innerHTML = `<div class="receipt-history-list">` + receipts.slice(0, 10).map(r => {
    const d = new Date(r.date);
    const dateStr  = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const itemCount = r.items.length;
    const catSet = [...new Set(r.items.map(i => i.category))];
    const catDots = catSet.slice(0, 4).map(c => `<span class="cat-dot-sm" style="background:${catColor(c)};border-radius:50%;display:inline-block;width:8px;height:8px;margin-right:2px"></span>`).join('');
    return `
      <div class="receipt-history-item card">
        <div class="receipt-history-info">
          <div class="receipt-history-store">${escHtml(r.store)}</div>
          <div class="receipt-history-meta">${escHtml(dateStr)} &nbsp;·&nbsp; ${itemCount} items &nbsp; ${catDots}</div>
        </div>
        <div class="receipt-history-total">$${r.total.toFixed(2)}</div>
        <button class="receipt-history-del" data-receipt-id="${escHtml(r.id)}" aria-label="Delete receipt" title="Delete">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>`;
  }).join('') + `</div>`;

  listEl.querySelectorAll('.receipt-history-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.receiptId;
      const all = getReceipts().filter(r => r.id !== id);
      localStorage.setItem(RECEIPTS_KEY, JSON.stringify(all));
      renderReceiptHistory();
      renderBudgetSummary();
      renderSpendingCategories();
      renderBudgetRecommendations();
      showToast('Receipt removed');
    });
  });
}

// ── Receipt capture flow ──────────────────────────────────────────────────────

function startReceiptScan(file) {
  const reader = new FileReader();
  reader.onload = e => {
    // Show preview + scanning state
    document.getElementById('receipt-idle-state').style.display    = 'none';
    document.getElementById('receipt-scanning-state').style.display = '';
    document.getElementById('receipt-parsed-state').style.display   = 'none';
    const img = document.getElementById('receipt-preview-img');
    if (img) img.src = e.target.result;

    // Simulate AI parse delay
    setTimeout(() => showParsedReceipt(), 2000);
  };
  reader.readAsDataURL(file);
}

function showParsedReceipt() {
  // Pick a random template
  const tpl = RECEIPT_TEMPLATES[Math.floor(Math.random() * RECEIPT_TEMPLATES.length)];
  const now  = new Date();
  pendingReceipt = {
    id:    Date.now().toString(),
    date:  now.toISOString(),
    store: tpl.store,
    items: tpl.items.map(i => ({ ...i })),
    total: tpl.items.reduce((s, i) => s + i.total, 0),
  };

  document.getElementById('receipt-scanning-state').style.display = 'none';
  document.getElementById('receipt-parsed-state').style.display   = '';

  const storeEl = document.getElementById('receipt-parsed-store');
  const dateEl  = document.getElementById('receipt-parsed-date');
  const itemsEl = document.getElementById('receipt-parsed-items');
  const totalEl = document.getElementById('receipt-parsed-total-amt');

  if (storeEl) storeEl.textContent = pendingReceipt.store;
  if (dateEl)  dateEl.textContent  = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  if (totalEl) totalEl.textContent = '$' + pendingReceipt.total.toFixed(2);

  if (itemsEl) {
    itemsEl.innerHTML = pendingReceipt.items.map(item => `
      <div class="receipt-parsed-item">
        <span class="cat-dot" style="background:${catColor(item.category)};width:8px;height:8px;border-radius:50%;flex-shrink:0;display:inline-block"></span>
        <span class="receipt-item-name">${escHtml(item.name)}</span>
        <span class="receipt-item-qty">${item.qty > 1 ? '×' + item.qty : ''}</span>
        <span class="receipt-item-total">$${item.total.toFixed(2)}</span>
      </div>`).join('');
  }
}

function confirmReceipt() {
  if (!pendingReceipt) return;
  addReceipt(pendingReceipt);
  pendingReceipt = null;
  resetReceiptCapture();
  renderBudgetSummary();
  renderSpendingCategories();
  renderBudgetRecommendations();
  renderReceiptHistory();
  showToast('Receipt added to budget!');
}

function resetReceiptCapture() {
  pendingReceipt = null;
  document.getElementById('receipt-idle-state').style.display     = '';
  document.getElementById('receipt-scanning-state').style.display  = 'none';
  document.getElementById('receipt-parsed-state').style.display    = 'none';
  // Reset file inputs
  const cam  = document.getElementById('receipt-camera-input');
  const upl  = document.getElementById('receipt-upload-input');
  if (cam) cam.value  = '';
  if (upl) upl.value  = '';
  const img = document.getElementById('receipt-preview-img');
  if (img) img.src = '';
}

// ── Profile status ────────────────────────────────────────────────────────────

function renderProfileStatus() {
  const bar          = document.getElementById('profile-status-bar');
  const saveLabelEl  = document.getElementById('save-profile-btn-label');
  const saveBtn      = document.getElementById('save-profile-btn');
  if (!bar) return;

  const profile = getProfile();
  const hasName = profile?.name?.trim();

  if (!profile || !hasName) {
    bar.className = 'profile-status-bar profile-status-bar--new';
    bar.innerHTML = `<div class="container"><div class="profile-status-inner">
      <div class="profile-status-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div class="profile-status-text">
        <div class="profile-status-headline">No profile yet</div>
        <div class="profile-status-sub">Fill in the form below and click <strong>Create Profile</strong> to personalize your SmartCart experience.</div>
      </div>
    </div></div>`;
    bar.style.display = '';
    if (saveLabelEl) saveLabelEl.textContent = 'Create Profile';
    if (saveBtn) saveBtn.classList.add('btn-create-profile');
  } else {
    const parts = [];
    const firstName = hasName.split(' ')[0];
    if (firstName) parts.push(firstName);
    if (profile.householdSize) parts.push(profile.householdSize + (profile.householdSize === 1 ? ' person' : ' people'));
    if (profile.zip) parts.push(profile.zip);
    bar.className = 'profile-status-bar profile-status-bar--active';
    bar.innerHTML = `<div class="container"><div class="profile-status-inner">
      <div class="profile-status-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="profile-status-text">
        <div class="profile-status-headline">Profile active &nbsp;·&nbsp; ${escHtml(parts.join(' · '))}</div>
        <div class="profile-status-sub">Edit the details below and click <strong>Update Profile</strong> to save changes.</div>
      </div>
    </div></div>`;
    bar.style.display = '';
    if (saveLabelEl) saveLabelEl.textContent = 'Update Profile';
    if (saveBtn) saveBtn.classList.remove('btn-create-profile');
  }
}

// ─── EVENT WIRING ─────────────────────────────────────────────────────────

// ─── TAB NAVIGATION ──────────────────────────────────────────────────────────

function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(p => { p.style.display = 'none'; });
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const panel = document.getElementById('tab-' + tabName);
  if (panel) panel.style.display = '';
  const btn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected', 'true'); }
  if (tabName === 'saved')   renderSavedLists();
  if (tabName === 'budget')  renderBudgetTab();
  if (tabName === 'profile') { populateProfileForm(getProfile()); renderProfileHistory(); renderProfileStatus(); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── SAVED LISTS ─────────────────────────────────────────────────────────────

function getSavedLists() {
  try { return JSON.parse(localStorage.getItem('smartcart_lists') || '[]'); } catch (e) { return []; }
}

function persistLists(lists) {
  localStorage.setItem('smartcart_lists', JSON.stringify(lists));
}

function saveListAs(name) {
  if (!name.trim() || state.groceryList.length === 0) return null;
  const lists = getSavedLists();
  const existingIdx = lists.findIndex(l => l.name.toLowerCase() === name.toLowerCase().trim());
  const existing = existingIdx >= 0 ? lists[existingIdx] : null;
  // Capture goal context from current session (if goal was generated) or preserve existing
  const hasCurrentGoal = !!currentGoalState.goalText;
  const entry = {
    id: existing ? existing.id : Date.now().toString(),
    name: name.trim(),
    items: state.groceryList.map(i => ({ name: i.name, quantity: i.quantity })),
    savedAt: new Date().toISOString(),
    goalText:         hasCurrentGoal ? currentGoalState.goalText         : (existing ? existing.goalText         : ''),
    goalProfileKey:   hasCurrentGoal ? (currentGoalState.baseProfile ? currentGoalState.baseProfile.key : null) : (existing ? existing.goalProfileKey   : null),
    activeRefinements: hasCurrentGoal ? Array.from(currentGoalState.activeRefinements) : (existing ? existing.activeRefinements : []),
    manualAdditions:   hasCurrentGoal ? [...currentGoalState.manualAdditions]           : (existing ? existing.manualAdditions   : []),
  };
  if (existingIdx >= 0) { lists[existingIdx] = entry; } else { lists.unshift(entry); }
  persistLists(lists);
  return entry;
}

function updateListGoal(id) {
  if (!currentGoalState.baseProfile) return;
  const lists = getSavedLists();
  const idx = lists.findIndex(l => l.id === id);
  if (idx < 0) return;
  lists[idx] = {
    ...lists[idx],
    goalText:          currentGoalState.goalText,
    goalProfileKey:    currentGoalState.baseProfile.key,
    activeRefinements: Array.from(currentGoalState.activeRefinements),
    manualAdditions:   [...currentGoalState.manualAdditions],
  };
  persistLists(lists);
  renderSavedLists();
  showToast('Goal saved to list!');
}

function openGoalForList(id) {
  const list = getSavedLists().find(l => l.id === id);
  if (!list) return;
  currentEditingListId = id;

  const goalInput = document.getElementById('goal-input');
  if (goalInput) goalInput.value = list.goalText || '';

  if (list.goalProfileKey && GOAL_PROFILES[list.goalProfileKey]) {
    const baseProfile = { key: list.goalProfileKey, ...GOAL_PROFILES[list.goalProfileKey] };
    currentGoalState = {
      baseProfile,
      activeRefinements: new Set(list.activeRefinements || []),
      goalText: list.goalText || '',
      manualAdditions: list.manualAdditions || [],
    };
    _renderGoalResults(true);
  } else if (list.goalText) {
    const goal = parseGoal(list.goalText);
    renderGoalSuggestions(goal, list.goalText);
  }

  showGoalEditingBanner(list.name);
  switchTab('goals');
}

function showGoalEditingBanner(listName) {
  let banner = document.getElementById('goal-editing-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'goal-editing-banner';
    banner.className = 'goal-editing-banner';
    const goalsMain = document.querySelector('#tab-goals .main');
    if (goalsMain) goalsMain.insertBefore(banner, goalsMain.firstChild);
  }
  banner.innerHTML = `
    <div class="container">
      <div class="goal-editing-banner-inner">
        <div class="goal-editing-banner-info">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span>Editing goal for <strong>${escHtml(listName)}</strong> — update the goal below and regenerate, then save changes back.</span>
        </div>
        <div class="goal-editing-banner-actions">
          <button class="btn-save-goal-update" id="save-goal-to-list-btn">Save Goal Update</button>
          <button class="btn-cancel-goal-edit" id="cancel-goal-edit-btn">Dismiss</button>
        </div>
      </div>
    </div>`;
  banner.style.display = '';

  document.getElementById('save-goal-to-list-btn').addEventListener('click', () => {
    if (!currentGoalState.baseProfile) { showToast('Generate a plan first, then save'); return; }
    updateListGoal(currentEditingListId);
    currentEditingListId = null;
    banner.style.display = 'none';
  });

  document.getElementById('cancel-goal-edit-btn').addEventListener('click', () => {
    currentEditingListId = null;
    banner.style.display = 'none';
  });
}

function deleteList(id) {
  if (!confirm('Delete this saved list?')) return;
  persistLists(getSavedLists().filter(l => l.id !== id));
  renderSavedLists();
}

function loadList(id) {
  const list = getSavedLists().find(l => l.id === id);
  if (!list) return;
  state.groceryList = list.items.map(i => ({ name: i.name, quantity: i.quantity, id: state.nextId++, catalogItem: findExactItem(i.name) || null }));
  renderList();
  switchTab('optimizer');
  setTimeout(() => { const s = document.getElementById('section-list'); if (s) s.scrollIntoView({ behavior: 'smooth' }); }, 320);
  showToast(`"${list.name}" loaded — ${list.items.length} items`);
}

function renderSavedLists() {
  const lists = getSavedLists();
  const container = document.getElementById('saved-lists-container');
  const empty = document.getElementById('saved-empty');
  if (!container) return;
  if (lists.length === 0) {
    if (empty) empty.style.display = '';
    container.innerHTML = '';
    return;
  }
  if (empty) empty.style.display = 'none';
  container.innerHTML = lists.map(l => {
    const date = new Date(l.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const count = l.items.length;
    const preview = l.items.slice(0, 5).map(i => escHtml(i.name)).join(', ') + (l.items.length > 5 ? ` +${l.items.length - 5} more` : '');
    const hasGoal = !!(l.goalText && l.goalProfileKey);
    const goalProfile = hasGoal ? GOAL_PROFILES[l.goalProfileKey] : null;
    const goalBadge = goalProfile ? `
      <div class="saved-list-goal-badge">
        <span class="saved-list-goal-icon" aria-hidden="true">${goalProfile.badge}</span>
        <span class="saved-list-goal-label">${escHtml(goalProfile.headline)}</span>
      </div>` : '';
    const editGoalBtn = `
      <button class="btn-edit-goal" onclick="openGoalForList('${escHtml(l.id)}')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${hasGoal ? 'Edit Goal' : 'Set Goal'}
      </button>`;
    return `
      <div class="saved-list-card card fade-in">
        <div class="saved-list-info">
          <div class="saved-list-name-row">
            <div class="saved-list-name">${escHtml(l.name)}</div>
            ${goalBadge}
          </div>
          <div class="saved-list-meta">${count} item${count !== 1 ? 's' : ''} &nbsp;·&nbsp; Saved ${date}</div>
          <div class="saved-list-preview">${preview}</div>
        </div>
        <div class="saved-list-actions">
          <button class="btn-load-list" onclick="loadList('${escHtml(l.id)}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            Load
          </button>
          ${editGoalBtn}
          <button class="btn-delete-list" onclick="deleteList('${escHtml(l.id)}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Delete
          </button>
        </div>
      </div>`;
  }).join('');
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

function showToast(msg) {
  let toast = document.getElementById('sc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sc-toast';
    toast.className = 'sc-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

// ─── FITNESS GOALS ────────────────────────────────────────────────────────────

const GOAL_PROFILES = {
  weightLoss: {
    keywords: ['lose weight', 'weight loss', 'lose', 'slim', 'diet', 'calorie deficit', 'cut calories', 'fat loss', 'drop weight', 'pounds'],
    items: [
      { name: 'Chicken Breast', qty: 3 }, { name: 'Spinach', qty: 2 }, { name: 'Broccoli', qty: 2 },
      { name: 'Greek Yogurt', qty: 4 }, { name: 'Eggs', qty: 2 }, { name: 'Almonds', qty: 1 },
      { name: 'Carrots', qty: 2 }, { name: 'Blueberries', qty: 1 }, { name: 'Apples', qty: 1 },
      { name: 'Ground Turkey', qty: 2 }, { name: 'Oatmeal', qty: 1 }, { name: 'Cucumbers', qty: 2 },
    ],
    mealPrep: [
      'Grilled chicken breast with steamed broccoli and roasted carrots',
      'Overnight oats with blueberries and a drizzle of honey',
      'Turkey lettuce wraps with spinach and cucumber',
      'Greek yogurt parfait with fresh fruit',
    ],
    snacks: [
      'Apple slices with 1 tbsp almond butter',
      'Greek yogurt (plain, no added sugar)',
      'Carrot sticks with hummus',
      'Hard-boiled eggs (2)',
      'A small handful of almonds (~22 nuts)',
    ],
    headline: 'Weight Loss Plan', badge: '🥗',
    tip: 'Focus on lean protein and fiber-rich vegetables to stay full while maintaining a calorie deficit.',
    suggestions: [
      { name: 'Bell Peppers', qty: 2, reason: 'Low-calorie and high in vitamin C — great for stir-fries or raw snacking' },
      { name: 'Cottage Cheese', qty: 2, reason: 'High-protein, low-fat snack that keeps hunger at bay for hours' },
      { name: 'Canned Tuna', qty: 4, reason: 'Quick, cheap lean protein — perfect for no-cook lunches' },
      { name: 'Zucchini', qty: 2, reason: 'Very low calorie — spiralize it or bulk up any meal without extra calories' },
      { name: 'Celery', qty: 1, reason: 'Almost zero calories — pairs perfectly with almond butter as a filling snack' },
    ],
  },
  muscleGain: {
    keywords: ['build muscle', 'gain muscle', 'bulk', 'bulking', 'muscle mass', 'high protein', 'muscle building', 'bodybuilding', 'strength', 'protein intake', 'gain weight'],
    items: [
      { name: 'Chicken Breast', qty: 4 }, { name: 'Eggs', qty: 2 }, { name: 'Canned Tuna', qty: 6 },
      { name: 'Greek Yogurt', qty: 4 }, { name: 'Oatmeal', qty: 1 }, { name: 'Rice', qty: 3 },
      { name: 'Broccoli', qty: 2 }, { name: 'Spinach', qty: 1 }, { name: 'Olive Oil', qty: 1 },
      { name: 'Almonds', qty: 1 }, { name: 'Ground Beef', qty: 2 }, { name: 'Butter', qty: 1 },
    ],
    mealPrep: [
      'Chicken and rice bowls with steamed broccoli (prep 5 servings)',
      'Ground beef stir-fry with rice and spinach',
      'Scrambled eggs with spinach and cheese on the side',
      'Tuna pasta with olive oil, garlic, and herbs',
    ],
    snacks: [
      'Greek yogurt with granola and berries',
      'Hard-boiled eggs (2–3)',
      'Almonds and a banana',
      'Tuna on whole grain crackers',
      'Oatmeal with milk and a spoonful of nut butter',
    ],
    headline: 'Muscle Building Plan', badge: '💪',
    tip: 'Prioritize protein at every meal (aim for 0.7–1g per lb of bodyweight). Rice and oats provide the sustained energy your training demands.',
    suggestions: [
      { name: 'Cottage Cheese', qty: 2, reason: 'Slow-digesting casein protein — ideal before bed for overnight muscle recovery' },
      { name: 'Sweet Potatoes', qty: 3, reason: 'Complex carbs that fuel long training sessions and replenish glycogen' },
      { name: 'Milk', qty: 2, reason: 'Classic post-workout protein + carbs in one glass' },
      { name: 'Peanut Butter', qty: 1, reason: 'Calorie-dense and protein-rich — easy way to hit your calorie surplus' },
      { name: 'Frozen Vegetables', qty: 2, reason: 'Quick nutrition without any prep — toss into any protein bowl' },
    ],
  },
  cutting: {
    keywords: ['cutting', 'lean out', 'get lean', 'shred', 'shredded', 'cut phase', 'reduce body fat', 'low calorie high protein', 'competition prep'],
    items: [
      { name: 'Chicken Breast', qty: 4 }, { name: 'Eggs', qty: 2 }, { name: 'Spinach', qty: 2 },
      { name: 'Broccoli', qty: 3 }, { name: 'Carrots', qty: 2 }, { name: 'Cucumbers', qty: 2 },
      { name: 'Greek Yogurt', qty: 4 }, { name: 'Canned Tuna', qty: 6 }, { name: 'Almonds', qty: 1 },
      { name: 'Ground Turkey', qty: 2 }, { name: 'Bell Peppers', qty: 3 }, { name: 'Celery', qty: 1 },
    ],
    mealPrep: [
      'Chicken breast with roasted bell peppers and broccoli',
      'Tuna salad on a bed of fresh spinach (no mayo)',
      'Turkey and veggie stir-fry with minimal oil',
      'Egg white scramble with spinach and mushrooms',
    ],
    snacks: [
      'Cucumber slices and cherry tomatoes',
      'Hard-boiled eggs (2)',
      'Celery with a small amount of almond butter',
      'Greek yogurt (plain, 0% fat)',
      'A handful of raw almonds',
    ],
    headline: 'Cutting / Fat Loss Plan', badge: '🔥',
    tip: 'Keep carbs low, protein high, and lean on fibrous vegetables to fill your plate without exceeding your calorie target.',
    suggestions: [
      { name: 'Cottage Cheese', qty: 2, reason: 'High protein, very low fat — one of the best cutting-phase foods' },
      { name: 'Zucchini', qty: 2, reason: 'Extremely low calorie — use as noodles or bulk up any meal for free' },
      { name: 'Mushrooms', qty: 2, reason: 'Low calorie with satisfying texture — great for making meals more filling' },
      { name: 'Frozen Vegetables', qty: 2, reason: 'Quick volume eating — fill your plate without blowing your calorie budget' },
      { name: 'Apples', qty: 1, reason: 'High-fiber fruit that curbs sweet cravings at very low calorie cost' },
    ],
  },
  mealPrep: {
    keywords: ['meal prep', 'batch cook', 'prep meals', 'food prep', 'prep for the week', 'weekly prep', 'cook ahead', 'prep sunday'],
    items: [
      { name: 'Chicken Breast', qty: 4 }, { name: 'Rice', qty: 3 }, { name: 'Broccoli', qty: 3 },
      { name: 'Eggs', qty: 2 }, { name: 'Spinach', qty: 2 }, { name: 'Oatmeal', qty: 1 },
      { name: 'Greek Yogurt', qty: 4 }, { name: 'Carrots', qty: 2 }, { name: 'Olive Oil', qty: 1 },
      { name: 'Canned Beans', qty: 4 }, { name: 'Ground Turkey', qty: 2 }, { name: 'Frozen Vegetables', qty: 3 },
    ],
    mealPrep: [
      'Classic chicken + rice + broccoli bowls (make 5 for the week)',
      'Turkey and bean chili — batch and freeze in portions',
      'Sheet-pan roasted vegetables with olive oil and garlic',
      'Overnight oats in mason jars (prep 5 jars at once)',
    ],
    snacks: [
      'Pre-portioned almonds in snack bags',
      'Cut vegetables (carrots, celery, peppers) in fridge containers',
      'Greek yogurt cups',
      'Hard-boiled eggs (batch cook 6–8)',
      'Fruit containers with berries or apple slices',
    ],
    headline: 'Weekly Meal Prep Plan', badge: '📦',
    tip: 'Block 2–3 hours on Sunday. Cook grains and proteins in bulk; store in portioned containers for easy grab-and-go meals all week.',
    suggestions: [
      { name: 'Sweet Potatoes', qty: 3, reason: 'Batch-roast on Sunday — they keep well all week as a nutritious side' },
      { name: 'Bell Peppers', qty: 3, reason: 'Prep raw for snacking or roast with olive oil — adds color and crunch to any bowl' },
      { name: 'Peanut Butter', qty: 1, reason: 'Quick protein addition to oatmeal, smoothies, or snack bags' },
      { name: 'Cottage Cheese', qty: 2, reason: 'High-protein, no-prep snack — just grab from the fridge' },
      { name: 'Apples', qty: 2, reason: 'Perfect grab-and-go snack to round out any meal prep container' },
    ],
  },
  keto: {
    keywords: ['keto', 'ketogenic', 'low carb', 'no carb', 'carnivore', 'ketosis', 'keto diet', 'high fat low carb'],
    items: [
      { name: 'Eggs', qty: 2 }, { name: 'Bacon', qty: 2 }, { name: 'Butter', qty: 1 },
      { name: 'Chicken Breast', qty: 3 }, { name: 'Ground Beef', qty: 3 }, { name: 'Steak', qty: 2 },
      { name: 'Spinach', qty: 2 }, { name: 'Broccoli', qty: 2 }, { name: 'Avocados', qty: 5 },
      { name: 'Shredded Cheese', qty: 2 }, { name: 'Heavy Cream', qty: 1 }, { name: 'Almonds', qty: 1 },
    ],
    mealPrep: [
      'Bacon and egg scramble with sautéed spinach',
      'Ground beef patties with avocado and cheese (no bun)',
      'Sheet-pan chicken thighs with roasted broccoli',
      'Steak strips with butter-sautéed mushrooms and greens',
    ],
    snacks: [
      'Cheese slices (cheddar, mozzarella)',
      'Avocado halves with salt and pepper',
      'Almonds or macadamia nuts',
      'Hard-boiled eggs',
      'Bacon strips',
    ],
    headline: 'Keto / Low-Carb Plan', badge: '🥑',
    tip: "Aim for under 20g net carbs per day. Fat is your fuel — don't fear butter, cheese, and fatty cuts of meat.",
    suggestions: [
      { name: 'Cauliflower', qty: 2, reason: 'The ultimate keto staple — rice it, mash it, or roast it instead of grains' },
      { name: 'Pork Rinds', qty: 1, reason: 'Zero carbs, satisfying crunch — a perfect keto snack alternative to chips' },
      { name: 'Walnuts', qty: 1, reason: 'High in healthy fats and omega-3s — an easy keto-friendly snack' },
      { name: 'Zucchini', qty: 2, reason: 'Great noodle substitute — pairs well with ground beef for a low-carb pasta dish' },
      { name: 'Salmon', qty: 2, reason: 'Rich in fat and protein — one of the best whole foods for a ketogenic diet' },
    ],
  },
  healthyEating: {
    keywords: ['healthy', 'balanced', 'nutritious', 'whole foods', 'clean eating', 'wellness', 'better eating', 'eat better', 'wholesome', 'well rounded'],
    items: [
      { name: 'Spinach', qty: 2 }, { name: 'Broccoli', qty: 2 }, { name: 'Carrots', qty: 2 },
      { name: 'Apples', qty: 1 }, { name: 'Blueberries', qty: 1 }, { name: 'Eggs', qty: 2 },
      { name: 'Chicken Breast', qty: 2 }, { name: 'Oatmeal', qty: 1 }, { name: 'Rice', qty: 2 },
      { name: 'Olive Oil', qty: 1 }, { name: 'Greek Yogurt', qty: 4 }, { name: 'Almonds', qty: 1 },
    ],
    mealPrep: [
      'Grain bowls with roasted vegetables and a lean protein',
      'Overnight oats with blueberries and almonds',
      'Baked chicken breast with a side salad',
      'Stir-fried vegetables with eggs and brown rice',
    ],
    snacks: [
      'Fresh fruit with nut butter',
      'Greek yogurt with a handful of granola',
      'Carrots and cucumber with hummus',
      'A small handful of almonds',
      'Apple slices',
    ],
    headline: 'Balanced Healthy Eating Plan', badge: '🌿',
    tip: 'Fill half your plate with vegetables, a quarter with lean protein, and a quarter with whole grains for a simple, balanced approach.',
    suggestions: [
      { name: 'Sweet Potatoes', qty: 2, reason: 'Nutrient-dense complex carb — one of the most nutritious vegetables you can eat' },
      { name: 'Avocados', qty: 3, reason: 'Healthy fats and fiber — great on toast, in salads, or as a snack' },
      { name: 'Walnuts', qty: 1, reason: 'Rich in omega-3s and antioxidants — a simple nutritional upgrade' },
      { name: 'Bell Peppers', qty: 2, reason: 'High in vitamin C and fiber — easy to add color and nutrition to any meal' },
      { name: 'Salmon', qty: 2, reason: 'Heart-healthy omega-3 protein — a great alternative to chicken twice a week' },
    ],
  },
};

// ─── GOAL REFINEMENTS ─────────────────────────────────────────────────────────

const REFINEMENT_DEFS = {
  'budget-friendly': {
    label: 'Budget-friendly', icon: '💰',
    swaps: {
      'Steak':        { name: 'Ground Turkey',    qty: 2 },
      'Ground Beef':  { name: 'Canned Beans',     qty: 3 },
      'Heavy Cream':  { name: 'Milk',             qty: 1 },
      'Avocados':     { name: 'Frozen Vegetables',qty: 2 },
    },
    addItems: [],
    extraMealPrep: [
      'Canned tuna lettuce wraps — no cooking required',
      'Egg fried rice with leftover rice — fast, cheap, filling',
    ],
    extraSnacks: [
      'Banana with peanut butter',
      'Bulk peanuts or sunflower seeds',
    ],
    tipAppend: ' Look for store-brand items and buy proteins in larger packs to lower your per-unit cost.',
  },
  'higher-protein': {
    label: 'Higher protein', icon: '🥩',
    boostQty: ['Chicken Breast', 'Ground Turkey', 'Ground Beef', 'Eggs', 'Canned Tuna'],
    addItems: [
      { name: 'Cottage Cheese', qty: 2 },
      { name: 'Canned Tuna',    qty: 4 },
    ],
    extraMealPrep: [
      'Egg muffins — bake a dozen, freeze, and reheat all week',
      'Cottage cheese bowl with berries — high protein, zero cooking',
    ],
    extraSnacks: [
      'Cottage cheese with a drizzle of honey',
      'Hard-boiled eggs (3)',
      'Tuna on celery sticks',
    ],
    tipAppend: ' Aim for 30–40g protein per meal. Cottage cheese and canned tuna are fast, affordable protein boosts.',
  },
  'easier-meal-prep': {
    label: 'Easier meal prep', icon: '⏱️',
    addItems: [
      { name: 'Frozen Vegetables', qty: 3 },
      { name: 'Canned Beans',      qty: 3 },
    ],
    mealPrepReplace: [
      'Sheet-pan chicken + frozen veggies — toss in oil, 25 min at 400°F, done',
      'Rice cooker rice with canned beans — set it and walk away',
      'Scrambled eggs with frozen spinach — under 10 minutes start to finish',
      '5-ingredient overnight oats — mix before bed, ready by morning',
    ],
    extraSnacks: [
      'String cheese — no prep, just grab and go',
      'Individual yogurt cups — ready in the fridge all week',
    ],
    tipAppend: ' Sheet-pan dinners and a rice cooker cut active prep time dramatically. Frozen veg are just as nutritious as fresh.',
  },
  'more-snacks': {
    label: 'More snacks', icon: '🍎',
    addItems: [
      { name: 'Apples',      qty: 2 },
      { name: 'Almonds',     qty: 1 },
      { name: 'Greek Yogurt',qty: 2 },
    ],
    snacksReplace: [
      'Apple slices with almond butter',
      'String cheese + rice cakes',
      'Greek yogurt with a drizzle of honey',
      'A handful of almonds or mixed nuts',
      'Hard-boiled eggs — prep a batch of 6 for the week',
      'Cucumber slices with hummus',
      'Banana with peanut butter',
    ],
    tipAppend: ' Pre-portion snacks into bags or containers on Sunday so they\'re ready to grab throughout the week.',
  },
  'lower-carb': {
    label: 'Lower carb', icon: '🥦',
    swaps: {
      'Rice':    { name: 'Cauliflower', qty: 2 },
      'Oatmeal': { name: 'Eggs',        qty: 1 },
    },
    removeItems: ['Rice', 'Oatmeal'],
    addItems: [
      { name: 'Cauliflower', qty: 2 },
      { name: 'Zucchini',    qty: 2 },
    ],
    extraMealPrep: [
      'Cauliflower rice stir-fry with chicken and veggies — easy low-carb swap',
      'Egg scramble with zucchini, spinach, and cheese — under 15 minutes',
    ],
    extraSnacks: [
      'Celery with almond butter',
      'Cheese slices with deli turkey',
      'Cucumber rounds with cream cheese',
    ],
    tipAppend: ' Swap rice for cauliflower rice and oats for eggs to significantly cut carbohydrate intake.',
  },
};

let currentGoalState = { baseProfile: null, activeRefinements: new Set(), goalText: '', manualAdditions: [] };
let currentEditingListId = null; // id of saved list whose goal is being edited in Goals tab

function applyRefinements(baseProfile, activeRefinements) {
  const profile = {
    ...baseProfile,
    items:    baseProfile.items.map(i => ({ ...i })),
    mealPrep: [...baseProfile.mealPrep],
    snacks:   [...baseProfile.snacks],
    tip:      baseProfile.tip,
  };

  for (const refKey of activeRefinements) {
    const def = REFINEMENT_DEFS[refKey];
    if (!def) continue;

    // Swap items
    if (def.swaps) {
      for (const [fromName, toItem] of Object.entries(def.swaps)) {
        const fromIdx = profile.items.findIndex(i => i.name.toLowerCase() === fromName.toLowerCase());
        if (fromIdx >= 0) {
          const toIdx = profile.items.findIndex(i => i.name.toLowerCase() === toItem.name.toLowerCase());
          if (toIdx >= 0) {
            profile.items.splice(fromIdx, 1); // target already present, just remove source
          } else {
            profile.items[fromIdx] = { name: toItem.name, qty: toItem.qty };
          }
        }
      }
    }

    // Remove items (without a swap target)
    if (def.removeItems) {
      const removeLower = def.removeItems.map(n => n.toLowerCase());
      profile.items = profile.items.filter(i => !removeLower.includes(i.name.toLowerCase()));
    }

    // Boost quantity on named items
    if (def.boostQty) {
      const boostLower = def.boostQty.map(n => n.toLowerCase());
      profile.items = profile.items.map(i =>
        boostLower.includes(i.name.toLowerCase()) ? { ...i, qty: i.qty + 1 } : i
      );
    }

    // Add items not already present
    if (def.addItems) {
      for (const item of def.addItems) {
        if (!profile.items.some(i => i.name.toLowerCase() === item.name.toLowerCase())) {
          profile.items.push({ ...item });
        }
      }
    }

    // Replace all meal prep ideas
    if (def.mealPrepReplace) {
      profile.mealPrep = [...def.mealPrepReplace];
    }
    // Append additional meal prep ideas
    if (def.extraMealPrep) {
      const existingLower = new Set(profile.mealPrep.map(s => s.toLowerCase()));
      for (const idea of def.extraMealPrep) {
        if (!existingLower.has(idea.toLowerCase())) profile.mealPrep.push(idea);
      }
      profile.mealPrep = profile.mealPrep.slice(0, 6);
    }

    // Replace all snack ideas
    if (def.snacksReplace) {
      profile.snacks = [...def.snacksReplace];
    }
    // Append additional snack ideas
    if (def.extraSnacks) {
      const existingLower = new Set(profile.snacks.map(s => s.toLowerCase()));
      for (const snack of def.extraSnacks) {
        if (!existingLower.has(snack.toLowerCase())) profile.snacks.push(snack);
      }
    }

    // Append to tip
    if (def.tipAppend) {
      profile.tip = profile.tip + def.tipAppend;
    }
  }

  return profile;
}

function renderPlannerThread() {
  const threadEl = el('planner-thread');
  if (!threadEl) return;
  if (plannerThread.length === 0) {
    threadEl.style.display = 'none';
    return;
  }
  threadEl.style.display = '';
  threadEl.innerHTML = plannerThread.map((turn, i) => {
    const previewItems = turn.items.slice(0, 4).map(item => item.name).join(', ');
    const extra = turn.items.length > 4 ? ` +${turn.items.length - 4} more` : '';
    const actionLine = i === 0
      ? `Generated ${turn.items.length} items &mdash; <em>${escHtml(turn.label)}</em>`
      : (turn.items.length > 0
          ? `Added ${turn.items.length} item${turn.items.length !== 1 ? 's' : ''}`
          : 'Your list already covers that — check the suggested items below');
    return `
      <div class="thread-turn${i === 0 ? ' thread-turn-first' : ''}">
        <div class="thread-user-bubble">
          <span class="thread-you-label">You</span>
          <span class="thread-user-msg">${escHtml(turn.userMsg)}</span>
        </div>
        <div class="thread-response-bubble">
          <span class="thread-bot-label">SmartCart</span>
          <div class="thread-response-body">
            <div class="thread-action-line">${actionLine}</div>
            ${turn.items.length > 0 ? `<div class="thread-items-preview">${escHtml(previewItems)}${escHtml(extra)}</div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function handleUpdateWish() {
  const input = el('update-wish-input');
  const text = (input ? input.value : '').trim();
  if (!text) { if (input) input.focus(); return; }
  if (!currentGoalState.baseProfile) return;

  const updateGoal = parseGoal(text);

  // Build set of names already in the plan
  const existingNames = new Set([
    ...(currentGoalState.baseProfile.items || []).map(i => i.name.toLowerCase()),
    ...currentGoalState.manualAdditions.map(i => i.name.toLowerCase()),
  ]);

  // Candidates: items from the matched update profile + its suggestions
  const candidates = [
    ...(updateGoal.items || []),
    ...((updateGoal.suggestions || []).map(s => ({ name: s.name, qty: s.qty }))),
  ];

  const newItems = [];
  const seen = new Set(existingNames);
  for (const item of candidates) {
    if (!seen.has(item.name.toLowerCase())) {
      seen.add(item.name.toLowerCase());
      newItems.push(item);
      if (newItems.length >= 5) break;
    }
  }

  // Fallback: try base profile suggestions if nothing new found
  if (newItems.length === 0) {
    for (const s of (currentGoalState.baseProfile.suggestions || [])) {
      if (!existingNames.has(s.name.toLowerCase())) {
        newItems.push({ name: s.name, qty: s.qty });
        if (newItems.length >= 3) break;
      }
    }
  }

  currentGoalState.manualAdditions = [...currentGoalState.manualAdditions, ...newItems];

  plannerThread.push({
    userMsg: text,
    action: 'update',
    items: newItems,
    label: updateGoal.headline,
  });

  renderPlannerThread();
  _renderGoalResults(false);
  if (input) input.value = '';
}

function parseGoal(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const [key, profile] of Object.entries(GOAL_PROFILES)) {
    let score = 0;
    for (const kw of profile.keywords) {
      if (lower.includes(kw)) score += kw.split(' ').length;
    }
    if (score > bestScore) { bestScore = score; best = { key, ...profile }; }
  }
  return best || { key: 'healthyEating', ...GOAL_PROFILES.healthyEating };
}

function renderGoalSuggestions(baseProfile, goalText) {
  currentGoalState = { baseProfile, activeRefinements: new Set(), goalText, manualAdditions: [] };
  _renderGoalResults(true);
}

function _renderGoalResults(initial = false) {
  const { baseProfile, activeRefinements, goalText, manualAdditions } = currentGoalState;
  const goal = applyRefinements(baseProfile, activeRefinements);
  const results = document.getElementById('goal-results');
  const truncated = goalText.length > 90 ? goalText.slice(0, 90) + '…' : goalText;

  // Banner
  document.getElementById('goal-banner').innerHTML = `
    <div class="goal-banner-inner">
      <div class="goal-banner-badge">${goal.badge}</div>
      <div class="goal-banner-content">
        <div class="goal-banner-title">${escHtml(goal.headline)}</div>
        <div class="goal-banner-sub">"${escHtml(truncated)}"</div>
      </div>
    </div>
    <div class="goal-tip">${escHtml(goal.tip)}</div>`;

  // Refinement chips
  document.getElementById('goal-refinements').innerHTML = `
    <div class="refinements-row">
      <span class="refinements-label">Refine:</span>
      <div class="refinements-chips">
        ${Object.entries(REFINEMENT_DEFS).map(([key, def]) => `
          <button class="refinement-chip${activeRefinements.has(key) ? ' active' : ''}" data-refinement="${key}">
            <span aria-hidden="true">${def.icon}</span>${escHtml(def.label)}
          </button>`).join('')}
      </div>
    </div>`;

  // Items list: base (possibly refined) + manually added suggestions
  const baseItemNames = new Set(goal.items.map(i => i.name.toLowerCase()));
  const extraItems = manualAdditions.filter(i => !baseItemNames.has(i.name.toLowerCase()));
  const allItems = [...goal.items, ...extraItems];

  document.getElementById('goal-items-list').innerHTML = allItems.map(item => `
    <label class="goal-item-check">
      <input type="checkbox" class="goal-item-checkbox" data-name="${escHtml(item.name)}" data-qty="${item.qty}" checked>
      <span class="goal-item-name">${escHtml(item.name)}</span>
      <span class="goal-item-qty">×${item.qty}</span>
    </label>`).join('');

  // Suggestions: items from baseProfile.suggestions not already in allItems
  const allItemNames = new Set(allItems.map(i => i.name.toLowerCase()));
  const suggestions = (baseProfile.suggestions || []).filter(s => !allItemNames.has(s.name.toLowerCase()));
  const suggestEl = document.getElementById('goal-suggestions');
  if (suggestions.length > 0) {
    suggestEl.style.display = '';
    suggestEl.innerHTML = `
      <div class="card goal-suggestions-card">
        <div class="goal-suggestions-header">
          <div class="card-title">You might also want to add</div>
          <div class="card-sub">Foods that work well with your ${escHtml(goal.headline.toLowerCase())}</div>
        </div>
        <div class="goal-suggest-list">
          ${suggestions.slice(0, 5).map(s => `
            <div class="goal-suggest-item">
              <div class="goal-suggest-info">
                <span class="goal-suggest-name">${escHtml(s.name)}</span>
                <span class="goal-suggest-reason">${escHtml(s.reason)}</span>
              </div>
              <button class="btn-suggest-add" data-name="${escHtml(s.name)}" data-qty="${s.qty}">+ Add</button>
            </div>`).join('')}
        </div>
      </div>`;
  } else {
    suggestEl.style.display = 'none';
  }

  // Meal prep + snacks
  document.getElementById('meal-prep-ideas').innerHTML = goal.mealPrep.map(idea =>
    `<div class="idea-item"><span class="idea-dot"></span><span>${escHtml(idea)}</span></div>`).join('');
  document.getElementById('snack-ideas').innerHTML = goal.snacks.map(snack =>
    `<div class="idea-item"><span class="idea-dot"></span><span>${escHtml(snack)}</span></div>`).join('');

  results.style.display = '';
  if (initial) setTimeout(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── Household size
  const sizePicker = el('size-picker');
  const hintMessages = {
    1: 'Solo shopper — bulk non-perishables only. Fresh produce and dairy are almost always better locally.',
    2: 'Small household — strong for pantry, cleaning, and proteins. Perishables should be bought fresh.',
    3: 'Medium household — good mix. Dairy in bulk works well; most produce still better local.',
    4: 'Great size for warehouse clubs — most categories make financial sense in bulk.',
    5: 'Large household — warehouse clubs are almost always the right call across the board.',
    6: 'Big family — warehouse clubs are built for you. Buy everything bulk except specialty items.',
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

  // ── Tab navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // ── [data-goto-tab] buttons (overview CTAs, empty state links, etc.)
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-goto-tab]');
    if (btn) switchTab(btn.dataset.gotoTab);
  });

  // ── Save list bar (in optimizer tab)
  const saveListBtn = document.getElementById('save-list-btn');
  const saveListBar = document.getElementById('save-list-bar');
  const saveListName = document.getElementById('save-list-name');
  const saveConfirmBtn = document.getElementById('save-confirm-btn');
  const saveCancelBtn = document.getElementById('save-cancel-btn');

  saveListBtn?.addEventListener('click', () => {
    if (state.groceryList.length === 0) return;
    const open = saveListBar.style.display !== 'none' && saveListBar.style.display !== '';
    saveListBar.style.display = open ? 'none' : '';
    if (!open) saveListName.focus();
  });

  function doSaveList(name) {
    const trimmed = name.trim();
    if (!trimmed) { saveListName.focus(); return; }
    const existing = getSavedLists().find(l => l.name.toLowerCase() === trimmed.toLowerCase());
    if (existing && !confirm(`A list named "${existing.name}" already exists. Overwrite it?`)) return;
    saveListAs(trimmed);
    saveListBar.style.display = 'none';
    saveListName.value = '';
    showToast('List saved!');
  }

  saveConfirmBtn?.addEventListener('click', () => doSaveList(saveListName?.value || ''));
  saveCancelBtn?.addEventListener('click', () => {
    saveListBar.style.display = 'none';
    if (saveListName) saveListName.value = '';
  });
  saveListName?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSaveList(saveListName.value);
    if (e.key === 'Escape') saveCancelBtn?.click();
  });

  // ── Save current list (from Saved Lists tab)
  const saveCurrentBtn = document.getElementById('save-current-btn');
  const saveForm = document.getElementById('save-form');
  const saveNameInput = document.getElementById('save-name-input');
  const saveSubmitBtn = document.getElementById('save-submit-btn');
  const saveFormCancel = document.getElementById('save-form-cancel');
  const noCurrentNote = document.getElementById('no-current-list-note');

  saveCurrentBtn?.addEventListener('click', () => {
    if (state.groceryList.length === 0) {
      if (noCurrentNote) { noCurrentNote.style.display = ''; setTimeout(() => { noCurrentNote.style.display = 'none'; }, 4000); }
      return;
    }
    const open = saveForm?.style.display !== 'none' && saveForm?.style.display !== '';
    if (saveForm) saveForm.style.display = open ? 'none' : '';
    if (!open && saveNameInput) saveNameInput.focus();
  });

  function doSaveCurrentList(name) {
    const trimmed = name.trim();
    if (!trimmed) { saveNameInput?.focus(); return; }
    const existing = getSavedLists().find(l => l.name.toLowerCase() === trimmed.toLowerCase());
    if (existing && !confirm(`A list named "${existing.name}" already exists. Overwrite it?`)) return;
    saveListAs(trimmed);
    if (saveForm) saveForm.style.display = 'none';
    if (saveNameInput) saveNameInput.value = '';
    renderSavedLists();
    showToast('List saved!');
  }

  saveSubmitBtn?.addEventListener('click', () => doSaveCurrentList(saveNameInput?.value || ''));
  saveFormCancel?.addEventListener('click', () => {
    if (saveForm) saveForm.style.display = 'none';
    if (saveNameInput) saveNameInput.value = '';
  });
  saveNameInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSaveCurrentList(saveNameInput.value);
    if (e.key === 'Escape') saveFormCancel?.click();
  });

  // ── Fitness goals — generate
  document.getElementById('generate-btn')?.addEventListener('click', () => {
    const text = (document.getElementById('goal-input')?.value || '').trim();
    if (!text) { document.getElementById('goal-input')?.focus(); return; }
    const goal = parseGoal(text);

    // Save previous session to history before resetting
    savePlannerHistory();

    // Reset thread on each new plan
    plannerThread = [];
    plannerThread.push({
      userMsg: text,
      action: 'generate',
      items: goal.items || [],
      label: goal.headline,
    });

    renderGoalSuggestions(goal, text);
    renderPlannerThread();

    const updateWishEl = el('update-wish-section');
    if (updateWishEl) updateWishEl.style.display = '';
  });

  // ── Fitness goals — example pills
  document.querySelectorAll('.goal-example-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const input = document.getElementById('goal-input');
      if (input) input.value = pill.dataset.goal;
      document.getElementById('generate-btn')?.click();
    });
  });

  // ── Fitness goals — add to optimizer
  document.getElementById('add-to-optimizer-btn')?.addEventListener('click', () => {
    const checked = document.querySelectorAll('.goal-item-checkbox:checked');
    let added = 0;
    checked.forEach(cb => {
      const name = cb.dataset.name;
      const qty = parseInt(cb.dataset.qty, 10) || 1;
      if (!state.groceryList.some(i => i.name.toLowerCase() === name.toLowerCase())) {
        addItem(name, qty);
        added++;
      }
    });
    switchTab('optimizer');
    setTimeout(() => { const s = document.getElementById('section-list'); if (s) s.scrollIntoView({ behavior: 'smooth' }); }, 320);
    if (added > 0) showToast(`${added} item${added !== 1 ? 's' : ''} added to your list`);
  });

  // ── Fitness goals — refinement chips (event delegation)
  document.getElementById('goal-refinements')?.addEventListener('click', e => {
    const chip = e.target.closest('.refinement-chip');
    if (!chip || !currentGoalState.baseProfile) return;
    const key = chip.dataset.refinement;
    if (currentGoalState.activeRefinements.has(key)) {
      currentGoalState.activeRefinements.delete(key);
    } else {
      currentGoalState.activeRefinements.add(key);
    }
    _renderGoalResults();
  });

  // ── Fitness goals — add suggested item to the checked list
  document.getElementById('goal-suggestions')?.addEventListener('click', e => {
    const btn = e.target.closest('.btn-suggest-add');
    if (!btn || !currentGoalState.baseProfile) return;
    const name = btn.dataset.name;
    const qty = parseInt(btn.dataset.qty, 10) || 1;
    if (!currentGoalState.manualAdditions.some(i => i.name.toLowerCase() === name.toLowerCase())) {
      currentGoalState.manualAdditions.push({ name, qty });
    }
    _renderGoalResults();
  });

  // ── Update wish list
  el('update-wish-btn')?.addEventListener('click', handleUpdateWish);
  el('update-wish-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleUpdateWish();
  });

  // ── Profile tab — household size picker
  document.querySelectorAll('#profile-size-picker .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#profile-size-picker .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Profile tab — membership toggles
  document.getElementById('profile-toggle-yes')?.addEventListener('click', () => {
    document.getElementById('profile-toggle-yes')?.classList.add('active');
    document.getElementById('profile-toggle-no')?.classList.remove('active');
  });
  document.getElementById('profile-toggle-no')?.addEventListener('click', () => {
    document.getElementById('profile-toggle-no')?.classList.add('active');
    document.getElementById('profile-toggle-yes')?.classList.remove('active');
  });

  // ── Profile tab — save profile button
  document.getElementById('save-profile-btn')?.addEventListener('click', () => {
    const profile = readProfileForm();
    const isNew = !getProfile()?.name?.trim();
    saveProfile(profile);
    syncProfileToState(profile);
    renderProfileGreeting();
    renderProfileGoalHint();
    renderProfileStatus();
    const badge = document.getElementById('profile-saved-badge');
    if (badge) {
      badge.style.display = 'flex';
      setTimeout(() => { badge.style.display = 'none'; }, 2500);
    }
    showToast(isNew ? 'Profile created!' : 'Profile updated!');
  });

  // ── Profile tab — clear history button
  document.getElementById('clear-history-btn')?.addEventListener('click', () => {
    if (confirm('Clear all planning history?')) {
      localStorage.removeItem(HISTORY_KEY);
      plannerThread = [];
      renderPlannerThread();
      renderProfileHistory();
      const updateWishEl = el('update-wish-section');
      if (updateWishEl) updateWishEl.style.display = 'none';
      showToast('History cleared');
    }
  });

  // ── Goals tab — profile hint bar
  document.getElementById('profile-goal-hint-use')?.addEventListener('click', () => {
    const profile = getProfile();
    if (!profile?.fitnessGoal) return;
    const input = document.getElementById('goal-input');
    if (input) input.value = profile.fitnessGoal;
    document.getElementById('profile-goal-hint')?.style && (document.getElementById('profile-goal-hint').style.display = 'none');
    document.getElementById('generate-btn')?.click();
  });
  document.getElementById('profile-goal-hint-dismiss')?.addEventListener('click', () => {
    const hint = document.getElementById('profile-goal-hint');
    if (hint) hint.style.display = 'none';
  });

  // ── Budget — period chips
  document.querySelectorAll('.budget-period-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.budget-period-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // ── Budget — save budget button
  document.getElementById('save-budget-btn')?.addEventListener('click', () => {
    const period = document.querySelector('.budget-period-chip.active')?.dataset.period || 'weekly';
    const amount = parseFloat(document.getElementById('budget-amount-input')?.value || '0');
    if (!amount || amount <= 0) { showToast('Enter a spend target amount'); return; }
    saveBudget({ period, amount });
    renderBudgetSummary();
    renderBudgetRecommendations();
    showToast('Budget saved!');
  });

  // ── Receipt — file inputs (camera + upload share same handler)
  function handleReceiptFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    startReceiptScan(file);
  }
  document.getElementById('receipt-camera-input')?.addEventListener('change', handleReceiptFile);
  document.getElementById('receipt-upload-input')?.addEventListener('change', handleReceiptFile);

  // ── Receipt — confirm / discard
  document.getElementById('btn-confirm-receipt')?.addEventListener('click', confirmReceipt);
  document.getElementById('btn-cancel-receipt')?.addEventListener('click', () => {
    resetReceiptCapture();
    showToast('Receipt discarded');
  });

  // ── Init
  const savedProfile = getProfile();
  if (savedProfile) {
    syncProfileToState(savedProfile);
  }
  renderProfileGreeting();
  renderProfileGoalHint();
  loadLastPlannerSession();
  renderList();
});

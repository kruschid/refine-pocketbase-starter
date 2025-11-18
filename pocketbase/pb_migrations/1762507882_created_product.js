/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1843675174",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3402113753",
        "max": null,
        "min": null,
        "name": "price",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_1174553048",
        "hidden": false,
        "id": "relation105650625",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "category",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_1108966215",
    "indexes": [],
    "listRule": null,
    "name": "product",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  app.save(collection);

  // fetch categories
  
  const categories = arrayOf(new DynamicModel({ id: "" }));

  app.db().select("id").from("category").all(categories);

  [
    {
      name: "Cotopaxi Allpa 35L Travel Pack",
      description: "Durable and stylish backpack made from recycled materials. Versatile design, organization compartments.",
      price: 179,
      material: "Recycled nylon, polyester"
    },
    {
      name: "Osprey Farpoint 40L Backpack",
      description: "Lightweight and comfortable backpack with multiple compartments for travel and daily use.",
      price: 160,
      material: "Nylon, mesh"
    },
    {
      name: "Patagonia Black Hole Pack 32L",
      description: "Weather-resistant and spacious backpack designed for outdoor adventures and commuting.",
      price: 149,
      material: "Recycled polyester"
    },
    {
      name: "The North Face Borealis Backpack",
      description: "Ergonomic backpack with padded laptop sleeve and multiple storage compartments.",
      price: 129,
      material: "Nylon, polyester"
    },
    {
      name: "Deuter Transit 40L Travel Pack",
      description: "Sturdy backpack ideal for travel, featuring adjustable straps and organized storage.",
      price: 180,
      material: "Polyester, nylon"
    },
    {
      name: "Gregory Border 35L Carry-On Pack",
      description: "Compact travel backpack with laptop compartment and versatile storage options.",
      price: 175,
      material: "Recycled polyester, nylon"
    },
    {
      name: "REI Co-op Ruckpack 40L",
      description: "Functional backpack with ergonomic support, designed for hiking and city travel.",
      price: 155,
      material: "Ripstop nylon, polyester"
    },
    {
      name: "Timbuk2 Uptown Laptop Backpack",
      description: "Professional and casual backpack with padded laptop section and water-resistant exterior.",
      price: 145,
      material: "Polyester, recycled fabric"
    },
    {
      name: "Thule Subterra Backpack 34L",
      description: "Modern and durable backpack with smart organization and easy-access compartments.",
      price: 165,
      material: "Nylon, polyester blend"
    },
    {
      name: "Fjällräven Räven 28L Backpack",
      description: "Classic backpack with simple design, durable fabric, and multiple pockets for organization.",
      price: 140,
      material: "Recycled polyester, G-1000 fabric"
    },
    {
      name: "Mystery Ranch Urban Assault 21L",
      description: "Tactical-inspired backpack with durable materials and smart internal organization.",
      price: 200,
      material: "Cordura nylon, polyester"
    },
    {
      name: "Herschel Little America Backpack",
      description: "Stylish backpack with padded laptop sleeve and signature front pocket.",
      price: 120,
      material: "Polyester, nylon"
    },
    {
      name: "Arc'teryx Granville 16L Backpack",
      description: "Sleek, weatherproof backpack with minimalist design and laptop storage.",
      price: 210,
      material: "Recycled nylon, polyester"
    },
    {
      name: "Columbia Tamolitch Daypack 30L",
      description: "Compact, versatile backpack for outdoor adventures and daily commuting.",
      price: 110,
      material: "Polyester, recycled fabrics"
    },
    {
      name: "Kelty Redwing 32L Backpack",
      description: "Durable backpack with multiple compartments and ergonomic shoulder straps.",
      price: 130,
      material: "Nylon, polyester"
    },
    {
      name: "Black Diamond Trail Pro 35L",
      description: "Adventure-ready backpack with durable construction and lightweight design.",
      price: 175,
      material: "Ripstop nylon, polyester"
    },
    {
      name: "Vaude Brenta 28L Backpack",
      description: "Sustainable backpack with practical compartments and ergonomic design.",
      price: 155,
      material: "Recycled polyester, nylon"
    },
    {
      name: "CamelBak Fourteener 24L Pack",
      description: "Hydration-ready backpack with multiple pockets for organized storage.",
      price: 140,
      material: "Polyester, nylon"
    },
    {
      name: "Marmot Kompressor 30L Backpack",
      description: "Lightweight backpack with durable fabric, perfect for outdoor activities.",
      price: 135,
      material: "Ripstop nylon, polyester"
    },
    {
      name: "North Face Surge 34L Backpack",
      description: "Spacious backpack with padded laptop sleeve and advanced organization options.",
      price: 160,
      material: "Recycled polyester, nylon"
    }
  ].forEach(product => {
    const category = categories[Math.floor(Math.random() * categories.length)].id;
    app.save(
      new Record(collection, {
        ...product,
        category
      })
    );
  });

}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1108966215");

  return app.delete(collection);
})

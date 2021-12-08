// Escriu una consulta per mostrar tots els documents en la col·lecció Restaurants
db.restaurants.find().pretty();

// Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine per tots els documents en la col·lecció Restaurants
db.restaurants.find({}, { restaurant_id: true, name: true, borough: true, cuisine: true }).pretty();

// Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine, però excloure el camp _id per tots els documents en la col·lecció Restaurants
db.restaurants.find({}, { _id: false, restaurant_id: true, name: true, borough: true, cuisine: true }).pretty();

// Escriu una consulta per mostrar restaurant_id, name, borough i zip code, però excloure el camp _id per tots els documents en la col·lecció Restaurants
db.restaurants.find({}, { _id: false, restaurant_id: true, name: true, borough: true, 'address.zipcode': true }).pretty();

// Escriu una consulta per mostrar tot els restaurants que estan en el Bronx
db.restaurants.find({ borough: 'Bronx' }).pretty();

// Escriu una consulta per mostrar els primers 5 restaurants que estan en el Bronx
db.restaurants.find({ borough: 'Bronx' }).limit(5).pretty();

// Escriu una consulta per mostrar el pròxim 5 restaurants després de saltar els primers 5 del Bronx
db.restaurants.find({ borough: 'Bronx' }).skip(5).limit(5).pretty();

// Escriu una consulta per trobar els restaurants que tenen un score de més de 90
db.restaurants.find({ 'grades.score': { $gt: 90 } }).pretty();

// Escriu una consulta per trobar els restaurants que tenen un score de més que 80 però menys que 100
db.restaurants.find(
    { 
        $and: [
            { 'grades.score': { $gt: 80 } },
            { 'grades.score': { $not: { $gt: 100 } } },
        ]
    }
).pretty();

// Escriu una consulta per trobar els restaurants quins localitzen en valor de latitud menys que -95.754168
db.restaurants.find({ 'address.coord.0': { $lt: -95.754168 } }).pretty();

// Escriu una consulta de MongoDB per a trobar els restaurants que no preparen cap cuisine de 'American' i el seu puntaje de qualificació superior a 70 i latitud inferior a -65.754168
db.restaurants.find(
    {
        $and: [
            { cuisine: { $ne: 'American ' } }, // American tiene un espacio en la data original
            { 'grades.score': { $gt: 70 } },
            { 'address.coord.0': { $lt: -65.754168 } }
        ]
    }
).pretty();

// Escriu una consulta per trobar els restaurants quins no preparen cap cuisine de 'American' i va aconseguir un marcador més que 70 i localitzat en la longitud menys que -65.754168. Nota : Fes aquesta consulta sense utilitzar $and operador
db.restaurants.find(
    {
        cuisine: { $ne: 'American ' }, // American tiene un espacio en la data original
        'grades.score': { $gt: 70 },
        'address.coord.0': { $lt: -65.754168 } 
    }
).pretty();

// Escriu una consulta per trobar els restaurants quins no preparen cap cuisine de 'American ' i va aconseguir un punt de grau 'A' no pertany a Brooklyn. S'ha de mostrar el document segons la cuisine en ordre descendent
db.restaurants.find(
    {
        $and: [
            { cuisine: { $ne: 'American ' } }, // American tiene un espacio en la data original
            { borough: { $ne: 'Brooklyn' } },
            { 'grades.grade': 'A' },
        ]
    }
).sort({cuisine: -1}).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants quin contenir 'Wil' com les tres primeres lletres en el seu nom
db.restaurants.find(
    { name: /^Wil/ },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants quin contenir 'ces' com les últim tres lletres en el seu nom
db.restaurants.find(
    { name: /ces$/ },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants quin contenir 'Reg' com tres lletres en algun lloc en el seu nom
db.restaurants.find(
    { name: /Reg/ },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar els restaurants quins pertanyen al Bronx i va preparar qualsevol plat American o xinès
db.restaurants.find(
    {
        borough: 'Bronx',
        $or: [
            { cuisine: 'American ' },
            { cuisine: 'Chinese' }
        ]
    }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que pertanyen a Staten Island o Queens o Bronxor Brooklyn
db.restaurants.find(
    {
        $or: [
            { borough: 'Staten Island' },
            { borough: 'Queens' },
            { borough: 'Bronx' },
            { borough: 'Brooklyn' },
        ]
    },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que no pertanyen a Staten Island o Queens o Bronxor Brooklyn
db.restaurants.find(
    {
        borough: {
            $nin: ['Staten Island','Queens','Bronx','Brooklyn']
        }
    },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin un marcador quin no és més que 10
db.restaurants.find(
    {
        $and: [
            { 
                'grades.score': { $lt: 10 } 
            },
            {
                'grades.score': { $not: { $gt: 10 } }
            }
        ]
    },
    { restaurant_id: true, name: true, borough: true, cuisine: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que preparen peix excepte 'American' i 'Chinees' o el name del restaurant comença amb lletres 'Wil'
db.restaurants.find(
    {
        $or: [
            {
                cuisine: {
                    $nin: ['American ', 'Chinese', 'Bagels/Pretzels', 'Bakery', 'Barbecue', 'Bottled beverages, including water, sodas, juices, etc.', 'CafÃ©/Coffee/Tea', 'Caf\u00e9/Coffee/Tea', 'Café/Coffee/Tea', 'Chicken', 'Delicatessen', 'Donuts', 'Hamburgers', 'Hotdogs', 'Ice Cream, Gelato, Yogurt, Ices', 'Juice, Smoothies, Fruit Salads', 'Not Listed/Not Applicable', 'Other', 'Pancakes/Waffles', 'Pizza', 'Pizza/Italian', 'Salads', 'Sandwiches', 'Sandwiches/Salads/Mixed Buffet', 'Seafood', 'Soups & Sandwiches', 'Steak', 'Vegetarian']
                }
            },
            {
                name: /^Wil/
            }
        ]
    }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, i grades per a aquells restaurants que aconsegueixin un grau "A" i un score 11 en dades d'estudi ISODate "2014-08-11T00:00:00Z"
db.restaurants.find(
    {
        grades: {
            $elemMatch: {
                $and: [
                    { grade: 'A' },
                    { score: 11 },
                    { date: ISODate("2014-08-11T00:00:00Z") }
                ]
            }
        }
    },
    { restaurant_id: true, name: true, grades: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants on el 2n element de varietat de graus conté un grau de "A" i marcador 9 sobre un ISODate "2014-08-11T00:00:00Z"
db.restaurants.find(
    {
        $and: [
            { 'grades.1.grade': 'A' },
            { 'grades.1.score': 9 },
            { 'grades.1.date': ISODate("2014-08-11T00:00:00Z") }
        ]
    },
    { restaurant_id: true, name: true, grades: true }
).pretty();

// Escriu una consulta per trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants on el segon element del array coord conté un valor quin és més que 42 i fins a 52
db.restaurants.find(
    {
        $and: [
            {'address.coord.1': { $gt: 42}},
            {'address.coord.1': { $lte: 52}},
        ]
    },
    {
        restaurant_id: true, name: true, address: true, borough: true
    }
).pretty();

// Escriu una consulta per organitzar el nom dels restaurants en ordre ascendent juntament amb totes les columnes
db.restaurants.aggregate(
    [
        {
            $sort: { name: 1 }
        }
    ]
).pretty();

// Escriu una consulta per organitzar el nom dels restaurants en descendir juntament amb totes les columnes
db.restaurants.aggregate(
    [
        {
            $sort: { name: -1 }
        }
    ]
).pretty();

// Escriu una consulta a organitzar el nom de la cuisine en ordre ascendent i per el mateix barri de cuisine. Ordre descendint
db.restaurants.aggregate(
    [
        {
            $sort: { cuisine: 1, borough: -1 }
        }
    ]
).pretty();

// Escriu una consulta per saber tant si totes les direccions contenen el carrer o no
db.restaurants.find({ 'address.street': { $exists: true } }).pretty();

// Escriu una consulta quin seleccionarà tots el documents en la col·lecció de restaurants on el valor del camp coord és Double
// No tiene mucho sentido esta query con la data actual, usando count(), devuelve 3772 documentos, igual que haciendo un find global.
db.restaurants.find(
    { 'address.coord': { $type: 'double' } }
).pretty();

// Escriu una consulta quin seleccionarà el restaurant_id, name i grade per a aquells restaurants quins retorns 0 com a resta després de dividir el marcador per 7
db.restaurants.aggregate(
    [
        {
            $project: {
                restaurant_id: true, 
                name: true, 
                grades: true,
                newScores: {
                    $map: {
                        input: '$grades.score',
                        as: 'score',
                        in: {
                            $divide: ['$$score', 7]
                        }
                    }
                }
            }
        },
        {
            $match: {
                newScores: 0
            }
        },
        {
            $project: {
                newScores: false
            }
        }
    ]
).pretty();

// Escriu una consulta per trobar el name de restaurant, borough, longitud i altitud i cuisine per a aquells restaurants que contenen 'mon' com tres lletres en algun lloc del seu name
db.restaurants.find(
    {
        name: /mon/
    },
    {
        name: true,
        borough: true,
        'address.coord': true,
        cuisine: true,
    }
).pretty();

// Escriu una consulta per trobar el name de restaurant, borough, longitud i latitud i cuisine per a aquells restaurants que conteinen 'Mad' com primeres tres lletres del seu name
db.restaurants.find(
    {
        name: /^Mad/
    },
    {
        name: true,
        borough: true,
        'address.coord': true,
        cuisine: true,
    }
).pretty();


const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author : '60d34e51ad28d431312075c0',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus accusamus, temporibus itaque dignissimos numquam autem ab tempore eligendi corporis culpa cupiditate exercitationem, rerum iste dolore deserunt vel praesentium aliquid id.',
            price,
            geometry : {
                type : "Point",
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images : [
                {
                    url : 'https://res.cloudinary.com/xentro-sam/image/upload/v1625033794/YelpCamp/ktevlhy6jkobmtmiorqc.jpg',
                    filename : 'YelpCamp/ktevlhy6jkobmtmiorqc'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
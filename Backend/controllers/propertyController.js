
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');
const Property = require('../models/propertyModel');
const cloudinary = require('cloudinary')

//property create
exports.createProperty = catchAsyncErrors( async (req, res, next) => {
        let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'properties',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;
        req.body.user = req.user.id;

        const property = await Property.create(req.body)

        console.log('property created', property)
        res.status(201).json({
            success: true,
            property
        })


    })


//get all properties
exports.getProperties = catchAsyncErrors( async (req, res, next) => {
   
        const properties = await Property.find()
        res.status(200).json(properties)
   
})

//speccific property details
exports.getProperyById = catchAsyncErrors(async (req, res, next) => {
   
        const property = await Property.findById(req.params.id)
        res.status(200).json(property);
    
})
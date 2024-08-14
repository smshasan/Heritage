const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Apartment, Villa, etc.
  location: { type: String, required: true },
  environment: { type: String }, // e.g., Urban, Suburban, Rural
  status: { type: String, required: true },
  price: { type: Number, required: true },
  numberOfBeds: { type: Number, required: true },
  numberOfBaths: { type: Number, required: true },
  numberOfBalconies: { type: Number, default: 0 },
  decorationType: { type: String }, // e.g., Furnished, Semi-Furnished, Unfurnished
  carpetArea: { type: Number }, // in square feet or meters
  totalArea: { type: Number }, // in square feet or meters
  floor: { type: String }, // e.g., 1st floor, 2nd floor
  numberOfLifts: { type: Number, default: 0 },
  facingDirection: { type: String }, // e.g., North, South, East, West
  additionalRooms: { type: String }, // e.g., Study Room, Gym, etc.
  ageOfConstruction: { type: String }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true  }, //
  images: [
    {
        public_id: {
            type: String,
            // required: false,
        },
        url: {
            type: String,
            // required: false,
        },
    }
],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);


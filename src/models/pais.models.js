import mongoose, { Schema, model } from "mongoose";

const paisSchema = new Schema(
  {
    name: {
      common: { type: String, required: true },
      official: { type: String, required: true },
      nativeName: Schema.Types.Mixed,
    },

    dificultad: {
      type: String,
      enum: ["normal", "dificil"],
      default: "dificil",
    },

    normalizedName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },

    cca2: {
      type: String,
    },

    cca3: {
      type: String,
    },

    ccn3: String,
    cioc: String,

    region: String,
    subregion: String,
    continents: [String],

    capital: [String],

    normalizedCapital: [String],

    capitalInfo: Schema.Types.Mixed,

    languages: Schema.Types.Mixed,

    currencies: Schema.Types.Mixed,

    flag: String,
    flags: Schema.Types.Mixed,

    coatOfArms: Schema.Types.Mixed,

    maps: Schema.Types.Mixed,

    population: Number,

    area: Number,

    latlng: [Number],

    borders: [String],

    timezones: [String],

    demonyms: Schema.Types.Mixed,

    startOfWeek: String,

    independent: Boolean,

    unMember: Boolean,

    car: Schema.Types.Mixed,

    tld: [String],

    fifa: String,

    postalCode: Schema.Types.Mixed,

    wordLength: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Pais = mongoose.model("pais", paisSchema);

export default Pais;

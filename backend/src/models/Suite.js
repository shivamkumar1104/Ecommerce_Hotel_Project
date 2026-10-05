import mongoose from "mongoose";

const suiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Suite name is required"],
      trim: true,
      maxlength: [100, "Suite name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["signature", "ocean", "penthouse", "villa", "suite"],
      default: "suite",
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
    },
    maxGuests: {
      type: Number,
      required: true,
      default: 2,
      min: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
      min: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 1,
    },
    size: {
      sqft: { type: Number },
      sqm: { type: Number },
    },
    floor: {
      type: Number,
    },
    view: {
      type: String,
      enum: ["ocean", "garden", "mountain", "city", "pool", "private"],
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    // Additional services available as add-ons during booking
    addons: [
      {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        icon: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug from name before saving
suiteSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Virtual: primary image
suiteSchema.virtual("primaryImage").get(function () {
  const primary = this.images.find((img) => img.isPrimary);
  return primary || this.images[0] || null;
});

// Index for fast filtering
suiteSchema.index({ category: 1, isAvailable: 1, pricePerNight: 1 });
suiteSchema.index({ isFeatured: -1, averageRating: -1 });

const Suite = mongoose.model("Suite", suiteSchema);
export default Suite;

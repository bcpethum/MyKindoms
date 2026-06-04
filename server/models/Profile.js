import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    socialLinks: [socialLinkSchema],

    theme: {
      type: String,
      enum: ["light", "dark", "glass", "gradient"],
      default: "glass",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    totalClicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
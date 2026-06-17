import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },   // e.g. 'visit_page', 'youtube_subscribe'
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    icon: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  { _id: false }
);

const linkSchema = new mongoose.Schema(
  {
    title: String,
    linkType: { type: String, enum: ['url', 'file', 'snippet'], default: 'url' },
    url: { type: String, default: '' },
    content: { type: String, default: '' }, // for snippet type
    description: { type: String, default: '' }, // AdSense: publisher-created content
    category: { type: String, default: 'General' }, // e.g. Programming, Education, Business
    clicks: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    actions: { type: [actionSchema], default: [] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Link",
  linkSchema
);
import mongoose, { Schema, model, models } from "mongoose";

export const VideoDimension={
    width:1080,
    height:1920
}
export interface IVIDEO {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,

  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  transformation: {
    height: {
      type: Number,
      default: VideoDimension.height,
    },
    width: {
      type: Number,
      default: VideoDimension.width,
    },
    quality:{
        type:Number,
        min:1,
        max:100
    }
  },
},
{
    timestamps:true
});

const Video=models.Video || model<IVIDEO>("Video", VideoSchema);
export default Video;
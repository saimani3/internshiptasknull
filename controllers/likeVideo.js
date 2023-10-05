import likedVideo from '../models/likedVideo.js'
import mongoose from 'mongoose'


export const likeVideoController =async(req,res)=>{
    const likedVideoDate=req.body;

    // console.log(likedVideoDate)
    const addToLikeVideo = new likedVideo(likedVideoDate);

    try {
        await addToLikeVideo.save();
        res.status(200).json('added to likedVideo')
        // console.log("Done");
    } catch (error) {
        res.status(400).json(error)
        
    }
}

export const getAlllikeVideoController = async(req,res)=>{
    try {
        const files = await likedVideo.find();
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export const deleteLikeVideoController = async(req,res)=>{
    const {videoId:videoId,Viewer:Viewer} = req.params;
    try {
        await likedVideo.findOneAndDelete({
            videoId:videoId,Viewer:Viewer
        })
        res.status(200).json({message:"Removed from your Likedvideo"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
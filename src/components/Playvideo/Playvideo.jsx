import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import share from '../../assets/share.png'
import dislike from '../../assets/dislike.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const Playvideo = () => {

    const {videoId} = useParams();

    const [apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [commentData,setCommentData] = useState(null);
    
    const fetchVideoData = async ()=>
    {
        // fetching videos data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url)
        .then(res=>res.json())
        .then(data=>setApiData(data.items[0]));
    }

    const fetchOtherData = async ()=>
    {
        //fetching subscribers data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url)
        .then(res=>res.json())
        .then(data=>setChannelData(data.items[0]))

        //fetching comment data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url)
        .then(res=>res.json())
        .then(data=>setCommentData(data.items))
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
        fetchOtherData();
    },[apiData])
    
    return (
    <div className='play-video'>
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        {/* <video src={video1} controls autoplay muted></video> */}

        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>

        <div className='play-video-info'>
        <p>{apiData?value_converter(apiData.statistics.viewCount):"10k"} views &bull; {moment(apiData?apiData.snippet.publishedAt:"").fromNow()}</p>
        <div>
            <span><img src={like} />{apiData?value_converter(apiData.statistics.likeCount):120}</span>
            <span><img src={dislike} /></span>
            <span><img src={share} />Share</span>
            <span><img src={save} />Save</span>
        </div>
        </div>
        <hr />

        <div className='publisher'>
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} />
        <div>
            <p>{apiData?apiData.snippet.channelTitle:"Sonu"}</p>
            <span >{value_converter(channelData?channelData.statistics.subscriberCount:"200k")} subscribers</span>
        </div>
        <button> subscribe </button>
        </div>

        <div className='vid-description'>
        <p>{apiData?apiData.snippet.description.slice(0,250):"Nikhilesh is the best"}</p>
        <hr/>
        <h4>{value_converter(apiData?apiData.statistics.commentCount:100000)} Comments</h4>
        
        {commentData?.map((item,index)=>
        {
            return (
            <div key={index} className='comment'>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} />
            <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> 1 day ago </span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className='comment-action'>
                <img src={like}></img>
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} />
                <span></span>
                </div>
            </div>
        </div>)
        })}
        

        
        </div>
    </div>
  )
}

// import { response } from 'express'

export default Playvideo

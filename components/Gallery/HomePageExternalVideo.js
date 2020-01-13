import { useEffect } from 'react';
import Link from 'next/link'
import Gallery from "react-photo-gallery";

function HomePageExternalVideo({ data }) {
    // useEffect(() => {
    //     console.log(data)
    // }, [])
    return (
        <React.Fragment>
            <div className="section-title mb-60 text-center">
                <h4 className="title mb-4">{data.name}</h4>
            </div>
            <Gallery photos={data.mediaItems.map(media => {
                return {
                    src: media.externalVideo.thumbnailUrl,
                    width: 3,
                    height: 2
                }
            })} onClick={e => {
                console.log(e.target)
            }} />
        </React.Fragment>
    )
};

export default HomePageExternalVideo;
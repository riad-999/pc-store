import { Review } from ".";
import { useState } from "react";

const Feedback = ({comment,totalReviews}) => {
    const {user,score,comment: desc} = comment;
    const [description,setDescription] = useState(desc.length > 140 ? `${desc.slice(0,140)}...` : desc);
    const [fullDesc,setFullDesc] = useState(false);
    
    const read = () => {
        if(fullDesc)
            setDescription(`${desc.slice(0,140)}...`);
        else
            setDescription(desc);
        setFullDesc(!fullDesc)
    }
    return (
        <article className="feedback">
            <h5>{user}</h5>
            <Review review={true} score={score} totalReviews={totalReviews}/>
            <p className="feedback__desc">
                {description}
                {
                    desc.length > 140 &&  <button type="button">
                        <small className="green ml-1" onClick={read}>
                            {fullDesc ? 'read less' : 'read more'}
                        </small>
                    </button>
                }
            </p>
        </article>
    );
}

export default Feedback;
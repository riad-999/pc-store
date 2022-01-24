import { Review } from ".";
import { useState } from "react";

const Feedback = ({comment,totalReviews}) => {
    const {user,score,comment: desc} = comment;
    const [description,setDescription] = useState(`${desc.slice(0,140)}...`);

    return (
        <article className="feedback">
            <h5>{user}</h5>
            <Review review={true} score={score} totalReviews={totalReviews}/>
            <p className="feedback__desc">
                {description}
                <button type="button">
                    <small className="green">read more</small>
                </button>
            </p>
        </article>
    );
}

export default Feedback;
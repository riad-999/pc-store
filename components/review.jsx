import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

const Review = (props) => {
    const {score,totalReviews,review} = props;
    return (
        <>
            <div className="review">
                {
                    [1,2,3,4,5].map((number,index) => {
                        if(score >= number)
                            return <BsStarFill key={index}/>
                        else {
                            let diff = number - score;
                            diff = diff.toFixed(1);
                            diff = parseFloat(diff);
                            if(diff <= 0.2)
                                return <BsStarFill key={index}/>
                            if(diff <= 0.6)
                                return <BsStarHalf key={index}/>
                            return <BsStar key={index}/>
                        }
                    })
                }
                <span className="ml-1 inline-block">
                    {score}
                </span>
            </div>
            {   
                !review ?
                <div className='mb-1'>
                    ({totalReviews} custmer review)
                </div> : null
            }
        </>
    );
}

export default Review;
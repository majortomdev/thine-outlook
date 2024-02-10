import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ReviewItem from './ReviewItem';
import './ReviewList.css';

const ReviewList = props => {
    if (props.items.length ===0) {
        return (
            <div className="review-list center">
                <Card>
                    <h2>No reviews here yet. Maybe add one?</h2>
                    <button>Add Review</button>
                </Card>
            </div>
        );
    }

    return <ul className="review-list">
        {props.items.map(review => (
        <ReviewItem 
        key={review.id} 
        id={review.id} 
        image={review.imageUrl}
        title={review.title}
        description={review.description} 
        reviewerId={review.reviewer}
        />
        ))}
    </ul>
};


export default ReviewList;
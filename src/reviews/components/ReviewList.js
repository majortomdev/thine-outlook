import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ReviewItem from './ReviewItem';
import Button from "../../shared/components/FormElements/Button";
import './ReviewList.css';

const ReviewList = props => {
    if (props.items.length ===0) {
        return (
            <div className="review-list center">
                <Card>
                    <h2>No reviews here yet. Maybe add one?</h2>
                    <Button to="/reviews/new">Add first Review</Button>
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
            review={review.review} 
            reviewerId={review.reviewer}
        />
        ))}
    </ul>
};


export default ReviewList;
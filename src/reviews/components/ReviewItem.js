import React from "react";

import  Card   from "../../shared/components/UIElements/Card";
import './ReviewItem.css';

const ReviewItem = props => {
    return <li className="review-item">
        <Card className="review-item__content">
        <div className="review-item__image">
            <img src={props.image} alt={props.title} />
        </div>
        <div className="review-item__info">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
        <div className="review-item__actions">
            <button>EDIT</button>
            <button>DELETE</button>
        </div>
        </Card>
    </li>
};

export default ReviewItem;
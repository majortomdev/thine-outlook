import React from "react";
import { useParams } from "react-router-dom";

import myPic from '../../user/images/The_Wind_That_Shakes_The_Barley_-_panoramio.jpg';
import ReviewList from "../components/ReviewList";

const DUMMY_REVIEWS = [
    {
    id: 'r1',
    title: 'The Wind That Shakes the Barley',
    description: 'Sed ut perspiciatis unde omnis iste natus',
    imageUrl: myPic,
    reviewer: 'user1'
}
,
{
    id: 'r2',
    title: 'The Wind That Shakes the Barley',
    description: 'Sed ut perspiciatis unde omnis iste natus',
    imageUrl: myPic,
    reviewer: 'user2'
}
];

const  UserReviews = () => {
    const userId = useParams().userId;
    const loadedReviews = DUMMY_REVIEWS.filter(review => review.reviewer === userId);
    return (
    <ReviewList items={loadedReviews}/>
    );
};

export default UserReviews;
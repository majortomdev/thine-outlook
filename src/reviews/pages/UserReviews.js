import React from "react";
import { useParams } from "react-router-dom";

import myPic from '../../user/images/The_Wind_That_Shakes_The_Barley_-_panoramio.jpg';
import ReviewList from "../components/ReviewList";

const DUMMY_REVIEWS = [
    {
    id: 'r1',
    title: 'The Wind That Shakes the Barley',
    review: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    imageUrl: myPic,
    reviewer: 'user1'
}
,
{
    id: 'r2',
    title: 'Harry the HIPPO',
    review: 'Sed ut perspiciatis unde omnis iste natus',
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
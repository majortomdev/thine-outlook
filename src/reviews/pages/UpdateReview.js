import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import myPic from '../../user/images/The_Wind_That_Shakes_The_Barley_-_panoramio.jpg';

const DUMMY_REVIEWS = [
    {
    id: 'r1',
    title: 'The Wind That Shakes the Barley',
    review: 'Sed ut perspiciatis unde omnis iste natus',
    imageUrl: myPic,
    reviewer: 'user1'
}
,
{
    id: 'r2',
    title: 'The Wind That Shakes the Barley',
    review: 'Sed ut perspiciatis unde omnis iste natus',
    imageUrl: myPic,
    reviewer: 'user2'
}
];

const UpdateReview = () => {
    const reviewId = useParams().reviewId;//..will be no. at end of url

    const identifiedReview = DUMMY_REVIEWS.find(r => r.id === reviewId);

    if(!identifiedReview) {
        return <div className='center'>
            <h2>Could not find review</h2>
        </div>
    }

  return (
    <form className='review-form'>
      <Input 
      id="title" 
      element="input" 
      type="text" 
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a vaild title."
      onInput={() => {}}
      value={identifiedReview.title}
      valid={true}
      />

    <Input 
        id="review" 
      element="textarea" 
      label="Review"
      validators={[VALIDATOR_MINLENGTH(25)]}
      errorText="Please enter a review(min 25 characters)."
      onInput={() => {}}
      value={identifiedReview.review}
      valid={true}
      />
      <Button type="submit" disabled={true}>UPDATE REVIEW</Button>
    </form>
  )
}

export default UpdateReview;

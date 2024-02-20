import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import myPic from '../../user/images/The_Wind_That_Shakes_The_Barley_-_panoramio.jpg';
import { useForm } from '../../shared/hooks/form-hook';


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
    title: 'Marley and me',
    review: 'Sed ut perspiciatis unde omnis iste natus',
    imageUrl: myPic,
    reviewer: 'user2'
}
];

const UpdateReview = () => {
    const[isLoading, setIsLoading] = useState(true);
    const reviewId = useParams().reviewId;//..will be no. at end of url

    const [formState, inputHandler, setFormData] = useForm({
      title: {
        value: '',
        isValid: false
      },
      review: {
        value: '',
        isValid: false
      }
    }, false);

    const identifiedReview = DUMMY_REVIEWS.find(r => r.id === reviewId);

    useEffect(() => {
      if (identifiedReview) {
        setFormData({
          title: {
            value: identifiedReview.title,
            isValid: true
          },
          review: {
            value: identifiedReview.review,
            isValid: true
          }
        }, true);
      }
      setIsLoading(false);
    }, [setFormData, identifiedReview]);


    const reviewUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);// here i hit ep.
    }

    if(!identifiedReview) {
        return <div className='center'>
            <h2>Could not find review</h2>
        </div>
    }

    if(isLoading){
      return (
        <div className='center'>
          <h2>.....loading....</h2>
        </div>
      )
    }
  return ( 
    <form className='review-form' onSubmit={reviewUpdateSubmitHandler}>
      <Input 
      id="title" 
      element="input" 
      type="text" 
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialIsValid={formState.inputs.title.isValid}
      />

    <Input 
        id="review" 
      element="textarea" 
      label="Review"
      validators={[VALIDATOR_MINLENGTH(25)]}
      errorText="Please enter a review(min 25 characters)."
      onInput={inputHandler}
      initialValue={formState.inputs.review.value}
      initialIsValid={formState.inputs.review.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>UPDATE REVIEW</Button>
    </form>
  )
}

export default UpdateReview;

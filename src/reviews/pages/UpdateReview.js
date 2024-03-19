import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';


const UpdateReview = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedReview, setLoadedReview] = useState();
    //const[isLoading, setIsLoading] = useState(true);
    const reviewId = useParams().reviewId;//..will be no. at end of url
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [formState, inputHandler, setFormData] = useForm({
      title: {
        value: '',
        isValid: false
      },
      content: {
        value: '',
        isValid: false
      }
    }, false);

    useEffect(() => {
      const fetchReview = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/reviews/${reviewId}`);
            setLoadedReview(responseData.review);
            setFormData({
              title: {
                value: responseData.review.title,
                isValid: true
              },
              content: {
                value: responseData.review.content,
                isValid: true
              }
            }, true);
        } catch (err) {}
      };
      fetchReview();
    }, [sendRequest, reviewId, setFormData]);


    const reviewUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
          await sendRequest(
            `http://localhost:5000/api/reviews/${reviewId}`,
            'PATCH',
            JSON.stringify({
              title: formState.inputs.title.value,
              content: formState.inputs.content.value
            }),
            {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            }
          );
          history.push('/' + auth.userId + '/reviews');
        } catch (err) {}
    };

    if(isLoading){
      return (
        <div className='center'>
          <LoadingSpinner />
        </div>
      );
    }

    if(!loadedReview && !error) {
        return (
        <div className='center'>
            <h2>Could not finnd review</h2>
        </div>
        );
    }

  return ( 
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    {!isLoading && loadedReview &&<form className='review-form' onSubmit={reviewUpdateSubmitHandler}>
      <Input 
      id="title" 
      element="input" 
      type="text" 
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={inputHandler}
      initialValue={loadedReview.title}
      initialIsValid={true}
      />

    <Input 
      id="content" 
      element="textarea" 
      label="Review"
      validators={[VALIDATOR_MINLENGTH(25)]}
      errorText="Please enter a review(min 25 characters)."
      onInput={inputHandler}
      initialValue={loadedReview.content}
      initialIsValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>UPDATE REVIEW</Button>
    </form>}
    </React.Fragment>
  )
}

export default UpdateReview;

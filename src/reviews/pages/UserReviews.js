import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ReviewList from "../components/ReviewList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const  UserReviews = () => {
    const [ loadedReviews, setLoadedReviews] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/reviews/user/${userId}`);
                setLoadedReviews(responseData.reviews);
            } catch (err) {}
        };
        fetchReviews();
    }, [sendRequest, userId]);
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>)}
            {!isLoading && loadedReviews &&<ReviewList items={loadedReviews}/>}
        </React.Fragment>
    );
};

export default UserReviews;
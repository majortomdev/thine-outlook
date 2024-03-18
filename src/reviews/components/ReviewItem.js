import React, { useState, useContext } from "react";

import  Card   from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import './ReviewItem.css';

const ReviewItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        console.log('DELETING....');


        try {
            await sendRequest(
              `http://localhost:5000/api/reviews/${props.id}`,
              'DELETE'
            );
            props.onDelete(props.id);
            //history.push('/' + auth.userId + '/reviews');
          } catch (err) {}

    }

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure" 
            footerClass="review-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }
            >
                <p>Do you really want to delete this review?</p>
        </Modal>
        <li className="review-item">
        <Card className="review-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="review-item__image">
                <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
            </div>
            <div className="review-item__info">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                {/* <p>{props.review}</p> */}
                <p>{props.content}</p>
            </div>
            <div className="review-item__actions">
            {auth.userId === props.reviewerId && <Button to={`/reviews/${props.id}`}>EDIT</Button>}
            {/* {auth.isLoggedIn && <Button to={`/api/reviews/${auth.userId}`}>EDIT</Button>} */}
            {auth.userId === props.reviewerId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
            </div>
        </Card>
        </li>


</React.Fragment>
);

};

export default ReviewItem;
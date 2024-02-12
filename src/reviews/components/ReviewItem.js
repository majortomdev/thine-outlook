import React, { useState } from "react";

import  Card   from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import './ReviewItem.css';

const ReviewItem = props => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }
    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log('DELETING....');
    }

    return (
        <React.Fragment>

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
                <div className="review-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="review-item__info">
                    <h2>{props.title}</h2>
                    <p>{props.review}</p>
                </div>
                <div className="review-item__actions">
                    <Button to={`/reviews/${props.id}`}>EDIT</Button>
                    <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                </div>
            </Card>
        </li>















</React.Fragment>
);






};

export default ReviewItem;
import React, { useState, useContext } from "react";

import  Card   from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import './ReviewItem.css';

const ReviewItem = props => {
    const auth = useContext(AuthContext);
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
                    <p>{props.description}</p>
                    {/* <p>{props.review}</p> */}
                    <p>{props.content}</p>
                </div>
                <div className="review-item__actions">
                {auth.isLoggedIn && <Button to={`/reviews/${props.id}`}>EDIT</Button>}
                {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
                </div>
            </Card>
        </li>















</React.Fragment>
);






};

export default ReviewItem;
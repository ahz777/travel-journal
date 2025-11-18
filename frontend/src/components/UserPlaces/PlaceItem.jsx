import { useState, useContext } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { AuthContext } from '../../context/auth-context';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => setDeleteConfirmModal(true);
  const cancelDeleteHandler = () => setDeleteConfirmModal(false);
  const confirmDeleteHandler = () => console.log('DELETING...');

  return (
    <>
      <Modal
        show={showDeleteConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }>
        <p>
          Do you want to proceed and delete this place? Please note that it can't be undone
          thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
export default PlaceItem;

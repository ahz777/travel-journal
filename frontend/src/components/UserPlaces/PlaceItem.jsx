import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Map from "../UI/Map";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setDeleteConfirmModal(true);
  const cancelDeleteHandler = () => setDeleteConfirmModal(false);
  const confirmDeleteHandler = () => console.log("DELETING...");

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
        <div className="map-container">
          {/* <Map center={props.coordinates} zoom={16}/> */}
          <h4>THE MAP</h4>
        </div>
      </Modal>
      <Modal
        show={showDeleteConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button
              inverse
              onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button
              danger
              onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }>
        <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter</p>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img
              src={props.image}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button
              inverse
              onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button
              danger
              onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};
export default PlaceItem;

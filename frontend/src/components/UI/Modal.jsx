import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { forwardRef, useRef } from "react";
import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = forwardRef((props, ref) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style} ref={ref}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

const Modal = (props) => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}{" "}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}>
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </>
  );
};
export default Modal;

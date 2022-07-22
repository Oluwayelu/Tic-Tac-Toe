import React from "react";
import { MdCancel } from "react-icons/md";

const Modal = ({ id, close, show, children }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={show}
        readOnly
      />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative overflow-hidden">
          {children}
          <div
            onClick={close}
            htmlFor={id}
            className="absolute top-3 right-5 cursor-pointer"
          >
            <MdCancel className="w-5 h-5" />
          </div>
        </label>
      </label>
    </>
  );
};

export default Modal;


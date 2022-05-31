import React from "react";

const Modal = ({ close, show }) => {
  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={show}
      />
      <label htmlFor="my-modal" className="modal  cursor-pointer">
        <label className="modal-box relati">
          <h1 className="text-2xl md:text-4xl text-success font-medium cursor-pointer">
            How to Play?
          </h1>

          <p className="">- First: You sh</p>
          <div className="modal-action">
            <label onClick={close} htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </label>
      </label>

      {/* <div onClick={close} className="absolute inset-0 bg-white opacity-20" />
      <div className="relative p-4 w-full max-w-screen-md h-full ">
        <div className="relative w-full bg-white px-10 py-5 rounded-lg text-center text-primary">
          <h1 className="text-2xl md:text-4xl text-success font-medium cursor-pointer">
            How to Play?
          </h1>

          <p className="">- First: You sh</p>
        </div>
      </div> */}
    </>
  );
};

export default Modal;

// <div
//   data-modal-placement="top-left"
//   className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
// >
//   <div className="relative p-4 w-full max-w-md h-full md:h-auto">
//     <div
//       onClick={close}
//       className="absolute inset-0 bg-white shadow opacity-20"
//     />
//     <div className="relative w-full bg-white px-10 py-5 rounded-lg text-center text-primary">
//       <h1 className="text-2xl md:text-4xl text-success font-medium">
//         How to Play?
//       </h1>

//       <p className="">- First: You sh</p>
//     </div>
//   </div>
// </div>;

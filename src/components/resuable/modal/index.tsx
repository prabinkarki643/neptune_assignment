import React, { forwardRef, useState, useImperativeHandle } from "react";

export interface ModalProps {
  children?: JSX.Element;
  anchorElement?: JSX.Element;
  title?: string | JSX.Element;
  titleClassName?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  showCloseIcon?: boolean;
  closeIconClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
  dialogContentBodyClassName?: string;
  dialogContentClassName?: string;
  footerSettings?: {
    okText?: string;
    onClickOk?: () => void;
    okButtonClassName?: string;
    closeModalWhenClickedOk?: boolean;
    cancelText?: string;
    onClickCancel?: () => void;
    closeModalWhenClickedCancel?: boolean;
    cancelButtonClassName?: string;
  };
}

export interface ModalRefHandler {
  show: () => void;
  hide: () => void;
}

const Modal = forwardRef<ModalRefHandler, ModalProps>(
  (
    {
      children,
      title,
      titleClassName,
      anchorElement,
      hideFooter,
      hideHeader,
      showCloseIcon,
      closeIconClassName,
      footerClassName,
      headerClassName,
      dialogContentClassName,
      dialogContentBodyClassName,
      footerSettings,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      show: showModal,
      hide: hideModal,
    }));
    const [show, setShow] = useState(false);

    const showModal = () => {
      setShow(true);
    };

    const hideModal = () => {
      setShow(false);
    };

    const renderAnchorElementWithHandleShowModal = () => {
      if (!anchorElement) return null;
      return React.cloneElement(anchorElement, {
        onClick: () => {
          anchorElement?.props?.onClick?.();
          showModal();
        },
        style: {
          cursor: "pointer",
          ...anchorElement?.props?.style,
        },
      });
    };
    return (
      <React.Fragment>
        {renderAnchorElementWithHandleShowModal()}
        {show && (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
              <div className="relative w-full h-full max-w-lg md:h-auto ">
                {/* Modal content */}
                <div
                  className={[
                    "relative bg-white rounded-lg shadow",
                    dialogContentClassName,
                  ].join(" ")}
                >
                  {/* Modal header */}
                  {!hideHeader && (
                    <div
                      className={[
                        "flex items-center justify-between  p-2 px-6  rounded-t",
                        headerClassName,
                      ].join(" ")}
                    >
                      <h3
                        className={[
                          "text-xl font-medium text-gray-900",
                          titleClassName,
                        ].join(" ")}
                      >
                        {title}
                      </h3>
                      <button
                        type="button"
                        className={[
                          "text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center",
                          closeIconClassName,
                        ].join(" ")}
                        data-modal-hide="medium-modal"
                        onClick={hideModal}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                  )}

                  {hideHeader && showCloseIcon && (
                    <button
                      type="button"
                      className={[
                        "text-gray-400 bg-transparent rounded-lg text-sm p-2 float-right inline-flex items-center",
                        closeIconClassName,
                      ].join(" ")}
                      data-modal-hide="medium-modal"
                      onClick={hideModal}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  )}

                  {/* Modal body */}
                  <div
                    className={[
                      "p-6 space-y-6",
                      dialogContentBodyClassName,
                    ].join(" ")}
                  >
                    {children}
                  </div>
                  {/* Modal footer */}
                  {!hideFooter && (
                    <div
                      className={[
                        "flex justify-end items-center p-6 space-x-2 rounded-b ",
                        footerClassName,
                      ].join(" ")}
                    >
                      <button
                        data-modal-hide="medium-modal"
                        type="button"
                        className={[
                          "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10",
                          footerSettings?.cancelButtonClassName,
                        ].join(" ")}
                        onClick={() => {
                          footerSettings?.closeModalWhenClickedCancel &&
                            hideModal();
                          footerSettings?.onClickCancel?.();
                        }}
                      >
                        {footerSettings?.cancelText}
                      </button>
                      <button
                        data-modal-hide="medium-modal"
                        type="button"
                        className={[
                          "text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
                          footerSettings?.okButtonClassName,
                        ].join(" ")}
                        onClick={() => {
                          footerSettings?.closeModalWhenClickedOk &&
                            hideModal();
                          footerSettings?.onClickOk?.();
                        }}
                      >
                        {footerSettings?.okText}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
);

export default Modal;

Modal.defaultProps = {
  footerSettings: {
    okText: "Done",
    onClickOk: undefined,
    okButtonClassName: undefined,
    closeModalWhenClickedOk: true,
    cancelText: "Cancel",
    onClickCancel: undefined,
    closeModalWhenClickedCancel: true,
    cancelButtonClassName: undefined,
  },
};

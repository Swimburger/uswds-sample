import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { modal } from '../uswds/src/js/components';

export default function App() {
  const path = window.location.pathname;
  return (
    <>
    <div>
      <a href="/modal1">Show modal component 1</a>&nbsp;
      <a href="/modal2">Show modal component 2</a>&nbsp;
      <a href="/modal3">Show modal component 3</a>
      <br />
      <br />
    </div>
      {(path === '/modal1' || path === '/') &&
        <>
          <ModalButton modalId="modal1">Open Modal</ModalButton>
          <Modal1 id="modal1" />
        </>
      }
      {path === '/modal2' &&
        <>
          Modal 2 has been removed, it doesn't make sense with the fixes in place.
        </>
      }
      {path === '/modal3' &&
        <>
          <ModalContainer>
            <button
              type="button"
              className="usa-button"
              aria-controls="modal3"
              data-open-modal
            >
              Open Modal
            </button>
            <div
              className="usa-modal"
              id="modal3"
              aria-labelledby="modal3-heading"
              aria-describedby="modal3-description"
            >
              <div className="usa-modal__content">
                <div className="usa-modal__main">
                  <h2 className="usa-modal__heading" id="modal3-heading">
                    Lorem
                  </h2>
                  <div className="usa-prose">
                    <p id="modal3-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus molestiae incidunt, sit eos reprehenderit, debitis culpa, omnis laboriosam repellat quas dolorem! Consequuntur nihil modi dolorum temporibus itaque? Pariatur, sunt itaque?</p>
                  </div>
                  <div className="usa-modal__footer">
                    <ul className="usa-button-group">
                      <li className="usa-button-group__item">
                        <button type="button" className="usa-button" data-close-modal>
                          Continue without saving
                        </button>
                      </li>
                      <li className="usa-button-group__item">
                        <button
                          type="button"
                          className="usa-button usa-button--unstyled padding-105 text-center"
                          data-close-modal
                        >
                          Go back
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ModalContainer>
        </>
      }
    </>
  );
}

const ModalButton = function ({ modalId, children }) {
  const modalButtonRef = useRef();
  useEffect(() => {
    const modalButtonElement = modalButtonRef.current;
    modal.on(modalButtonElement);
    return () => {
      modal.off(modalButtonElement);
    };
  });
  return (
    <button
      type="button"
      className="usa-button"
      aria-controls={modalId}
      data-open-modal
      ref={modalButtonRef}
    >
      {children}
    </button>
  );
}

const Modal1 = function ({ id }) {
  const modalRef = useRef();
  useLayoutEffect(() => {
    const modalElement = modalRef.current;
    modal.on(modalElement);
    return () => modal.off(modalElement);
  });
  // empty div because React will try to remove .usa-modal from this components parent, but USWDS already moved .usa-modal elsewhere
  return (
    <div style={{ display: 'none' }}>
      <div
        className="usa-modal"
        id={id}
        aria-labelledby={`${id}-heading`}
        aria-describedby={`${id}-description`}
        ref={modalRef}
      >
        <div className="usa-modal__content">
          <div className="usa-modal__main">
            <h2 className="usa-modal__heading" id={`${id}-heading`}>
              Lorem
            </h2>
            <div className="usa-prose">
              <p id={`${id}-description`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus molestiae incidunt, sit eos reprehenderit, debitis culpa, omnis laboriosam repellat quas dolorem! Consequuntur nihil modi dolorum temporibus itaque? Pariatur, sunt itaque?</p>
            </div>
            <div className="usa-modal__footer">
              <ul className="usa-button-group">
                <li className="usa-button-group__item">
                  <button type="button" className="usa-button" data-close-modal>
                    Continue without saving
                  </button>
                </li>
                <li className="usa-button-group__item">
                  <button
                    type="button"
                    className="usa-button usa-button--unstyled padding-105 text-center"
                    data-close-modal
                  >
                    Go back
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalContainer = function ({ children }) {
  const modalContainerRef = useRef();
  useLayoutEffect(() => {
    const modalContainerElement = modalContainerRef.current;
    modal.on(modalContainerElement);
    return () => modal.off(modalContainerElement);
  });
  return (
    <div ref={modalContainerRef}>{children}</div>
  );
};
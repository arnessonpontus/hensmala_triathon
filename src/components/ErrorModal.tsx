import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useErrorModal } from "../context/ErrorModalContext";

export const ErrorModal = () => {
  const { isOpen, errorMessage, errorTitle, closeErrorModal } = useErrorModal();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => isOpen && closeErrorModal()}
      style={{
        minWidth: "60vw",
      }}
    >
      <ModalHeader toggle={closeErrorModal}>
        {errorTitle}
      </ModalHeader>
      <ModalBody>
        {errorMessage}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeErrorModal}>
          Stäng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

import React from "react";
import { Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

interface DeleteEventModalProps {
  showDeleteModal: boolean;
  handleDeleteEvent: () => void;
  handleCloseModal: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  showDeleteModal,
  handleDeleteEvent,
  handleCloseModal,
}) => {
  return (
    <Transition.Root show={showDeleteModal} as="div">
      {/* Le contenu du modal supprimé pour la brièveté */}
    </Transition.Root>
  );
};

export default DeleteEventModal;

import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.tsx";
import EventForm from "./EventForm.tsx";
import { createNewEvent, CustomError, queryClient } from "../../util/http.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";

export default function NewEvent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  const customError = error as CustomError;

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  function handleClose() {
    setIsModalOpen(false);
    navigate("../");
  }

  return (
    <Modal onClose={handleClose} isOpen={isModalOpen}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <LoadingIndicator />}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event."
          message={
            customError.info?.message ||
            "Please check your inputs and try again later"
          }
        />
      )}
    </Modal>
  );
}

import { ComponentPropsWithoutRef, FormEvent, useState } from "react";

import ImagePicker from "../ImagePicker.tsx";
import { EventType } from "./EventItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { CustomError, fetchSelectableImages } from "../../util/http.ts";
import ErrorBlock from "../UI/ErrorBlock.tsx";

type EventFormProps = ComponentPropsWithoutRef<"form"> & {
  inputData?: EventType;
};

export default function EventForm({
  inputData,
  onSubmit,
  children,
}: EventFormProps) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);
  const {
    data: images,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchSelectableImages,
  });

  const customError = error as CustomError;

  function handleSelectImage(image: string) {
    setSelectedImage(image);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    if (onSubmit) {
      onSubmit({ ...data, image: selectedImage });
    }
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>
      {isPending && <p>Loading images...</p>}
      {isError && (
        <ErrorBlock
          title="Error loading images!"
          message={customError.info?.message || "Something went wrong."}
        />
      )}
      {images && (
        <div className="control">
          <ImagePicker
            images={images}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}

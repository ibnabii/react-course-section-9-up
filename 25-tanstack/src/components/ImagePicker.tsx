export type ImageType = {
  path: string;
  caption: string;
};

type ImagePickerProps = {
  images: ImageType[];
  selectedImage?: string;
  onSelect: (imagePath: string) => void;
};

export default function ImagePicker({
  images,
  selectedImage,
  onSelect,
}: ImagePickerProps) {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? "selected" : undefined}
          >
            <img
              src={`http://localhost:3000/${image.path}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

type ErrorProps = {
  title: string;
  message: string;
};
export default function Error({ title, message }: ErrorProps) {
  return (
    <div className="error-container">
      <div className="error">
        <h2>{title}</h2>
        <strong>{message}</strong>
      </div>
    </div>
  );
}

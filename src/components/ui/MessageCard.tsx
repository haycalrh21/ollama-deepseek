type MessageProps = {
  role: "assisten" | "user";
  message: string;
};

export default function MessageCard(props: MessageProps) {
  return (
    <div
      className={`rounded-lg px-4 py-2 max-w-md w-fit whitespace-pre-line ${
        props.role === "user"
          ? "self-end bg-blue-600 text-white"
          : "bg-gray-600 text-white"
      }`}
    >
      {props.message}
    </div>
  );
}

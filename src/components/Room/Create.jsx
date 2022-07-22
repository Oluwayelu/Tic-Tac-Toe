const CreateRoom = ({ info, onChange, onSubmit }) => {
  const { roomName, userName, loading } = info;

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center space-y-3"
    >
      <h1 className="text-2xl md:text-3xl">Create Room</h1>
      <input
        value={roomName}
        name="roomName"
        onChange={onChange}
        placeholder="Room name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />

      <input
        value={userName}
        name="userName"
        onChange={onChange}
        placeholder="Your name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-1/2 py-1 bg-success rounded"
      >
        {loading ? "Creating" : "Create"}
      </button>
    </form>
  );
};

export default CreateRoom;

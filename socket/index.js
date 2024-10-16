const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("newUser", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    io.emit("getUsers", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("getUsers", activeUsers);
  });

  // Handle sending messages
  socket.on("sendMessage", (data) => {
    const { receiverId } = data;
    data.status = "sent"; // Set initial status
    const user = activeUsers.find((user) => user.userId === receiverId);

    console.log("Sending message to:", receiverId);
    console.log("Data:", data);

    if (user) {
      // Send the message to the receiver
      io.to(user.socketId).emit("receiveMessage", data);

      // Update the status to 'delivered' and inform the sender
      data.status = "delivered";
      io.to(socket.id).emit("messageDelivered", data);
    } else {
      // Inform the sender that the message is 'sent' if receiver is offline
      io.to(socket.id).emit("messageSent", data);
    }
  });

  // Handle message read status
  socket.on("messageRead", (data) => {
    const { senderId } = data;
    const user = activeUsers.find((user) => user.userId === senderId);

    console.log("Marking message as read:", data);

    // Update the status to 'read'
    data.status = "read";

    if (user) {
      // Inform the sender that the message has been read
      io.to(user.socketId).emit("messageRead", data);
    }
  });
});

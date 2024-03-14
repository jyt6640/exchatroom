module.exports=function(io){
  io.on("connected", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async(userName, cb)=> {
      console.log("backend",userName);
    })

    socket.on("disconnect", () => {
      console.log("client is disconnected", socket.id);
    });
  });
};
function animationScroll() {
    $('body,html').animate({ scrollTop: document.body.scrollHeight });
  }
  
  const time = (timestamp) => {
    const dateConv = (diff) => Math.floor(diff / (86400000));
    let day, date = new Date(timestamp).getDay(), diff = Date.now() - timestamp;
    let ref = dateConv(diff);
  
    if (ref <= 0) {
      if (date == new Date().getDay()) day = "Today"
      else day = "Yesterday"
    }
    else if (ref == 1) {
      if (date == new Date().getDay() + 1) day = "Yesterday"
      else day = "1 day ago"
    }
    else day = `${ref} days ago`
  
    return day;
  }
  
  const Avatar = (username) => `https://avatars.dicebear.com/api/adventurer/${username}.svg`;

  function sent (username, message, created){

    return $("#chats").append(
      `<div class="chat-message-right pb-4">
            <div>
              <img src=${Avatar(username)}
              class="rounded-circle border border-dark mr-1" alt="" width="42" height="42">
            </div>
            <div class="flex-shrink-1 bg-primary text text-light rounded py-2 px-3 mr-3 mx-2">
              <div class="mb-1"><em> ${time(created)} at ${new Date(created).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} </em></div>
              <b> ${message} </b>
            </div>
          </div>`
    )
  }
  
  function received(username, message, created) {
  
    return `<div class="chat-message-left pb-4">
      <div>
        <img src=${Avatar(username)}
        class="rounded-circle border border-dark mr-1" alt="" width="42" height="42">
        <div class="small text-nowrap"> <b> ${username} </b> </div>
      </div>
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 mx-3">
        <div class="mb-1"> <em> ${time(created)} at ${new Date(created).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} </em> </div>
        <b> ${message} </b>
      </div>
    </div>`
  
  }
  
  socket.on("global", function (data) {

    if(data.from == client) $("#chats").append(sent(data.from, data.body, data.created))
    else $("#chats").append(received(data.from, data.body, data.created))
      
    animationScroll();
  
  })
  
  
  $(document).ready(function () {
  
    animationScroll()
  
    $("#mail").on("submit", (e) => {
      e.preventDefault();
  
      const value = $("#input").val().toString().trim()
      if(value.length == 0) return;
      let stamp = new Date().getTime()
  
      // $("#chats").append(
      //   `<div class="chat-message-right pb-4">
      //         <div>
      //           <img src=${Avatar(client)}
      //           class="rounded-circle border border-dark mr-1" alt="" width="42" height="42">
      //         </div>
      //         <div class="flex-shrink-1 bg-primary text text-light rounded py-2 px-3 mr-3 mx-2">
      //           <div class="mb-1"><em> ${time(created)} at ${new Date(stamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} </em></div>
      //           <b> ${value} </b>
      //         </div>
      //       </div>`
      // )
  
      
      // animationScroll()
      
      socket.emit("global", {
        from: client,
        to: receiver,
        body: value,
        created: stamp,
      })
      
      $("#input").val("")
    
    })
  
    $("#home").on("click", () => location.replace("/"))
  
  })
  
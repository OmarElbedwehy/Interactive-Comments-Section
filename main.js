
// REMOVE PRE LOADER

window.onload = ()=>{
  document.querySelector("#pre_loader").style.opacity = "0";
  setTimeout(()=>{
    document.querySelector("#pre_loader").remove();
  }, 100)
}

// CONTENT OF MSGS FROM JSON FILE

fetch("data.json").then((result) => {
  let data = result.json();
  return data
}).then((users) => {
  let comments = users.comments;
  for (let i = 0; i < Object.keys(comments).length; i++) {
    let msg = document.createElement("div");
    msg.classList.add("msg");
    msg.id = comments[i].id;
    msg.innerHTML = `
        <div class="counter">
          <span class="plus">+</span>
          <h3>${comments[i].score}</h3>
          <span class="minus">-</span>
        </div>
        <div class="text_content">
          <div class="top">
            <div class="user">
              <img src="${comments[i].user.image.png}" alt="">
              <h3>${comments[i].user.username}</h3>
              <p class="time">${comments[i].createdAt}</p>
            </div>
            <div class="user_options">
              <div class="replay">
                <img src="./images/icon-reply.svg" alt="">
                <p>Reply</p>
              </div>
            </div>
          </div>
          <div class="text">
            <p>${comments[i].content}</p>
          </div>
        </div>
        `;
    document.querySelector(".container").appendChild(msg);
    if (comments[i].replies.length > 0) {
      let replies = comments[i].replies;
      for (let j = 0; j < replies.length; j++) {
        let replies_ele = document.createElement("div");
        replies_ele.classList.add("reply_msgs");
        replies_ele.innerHTML = `
                <div class="msg" id="${replies[j].id}">
                <div class="counter">
                  <span class="plus">+</span>
                  <h3>${replies[j].score}</h3>
                  <span class="minus">-</span>
                </div>
                <div class="text_content">
                  <div class="top">
                    <div class="user">
                      <img src="${replies[j].user.image.png}" alt="">
                      <h3>${replies[j].user.username}</h3>
                      <p class="time">${replies[j].createdAt}</p>
                    </div>
                    <div class="user_options">
                      <div class="replay">
                        <img src="./images/icon-reply.svg" alt="">
                        <p>Reply</p>
                      </div>
                    </div>
                  </div>
                  <div class="text">
                    <p><span class="replyingTo">@${replies[j].replyingTo}</span> ${replies[j].content}</p>
                  </div>
                </div>
              </div>
                `;
        document.querySelector(".container").appendChild(replies_ele)
      }
    }
  }
  // MAKE COMMENT FILED
  let currentUser = users.currentUser;
  let write_comment = document.createElement("div");
  write_comment.classList.add("comment");
  write_comment.innerHTML = `
    <img src="${currentUser.image.png}" alt="">
    <input type="text" id="comment_input" placeholder="Add a comment...">
    <button type="submit" id="send_comment" class="send">Send</button>
    `;
  document.querySelector(".container").appendChild(write_comment);
  // MAKE A REPLY ON CLICK ON REPLY
  document.querySelectorAll(".replay").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let unactive_ele = e.target.parentElement;
      unactive_ele.classList.add("unactive");
      let targeted_msg = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      let reply_msg = document.createElement("div");
      reply_msg.classList.add("reply_msg")
      reply_msg.innerHTML = `
        <img src="${currentUser.image.png}" alt="">
        <input type="text" id="user_input" placeholder="Add a Reply...">
        <button type="submit" id="send_reply" class="send">Reply</button>
        `
      targeted_msg.after(reply_msg);
      // SEND REPLY ON CLICK ON ENTER BUTTON
      document.querySelectorAll(".reply_msg input").forEach((ele) => {
        ele.focus();
        ele.addEventListener("keydown", (e) => {
          if (e.key == "Enter") {
            if (e.target.value !== "") {
              unactive_ele.classList.remove("unactive")
              e.target.parentElement.remove();
              let reply_msgs = document.createElement("div");
              reply_msgs.classList.add("reply_msgs")
              reply_msgs.innerHTML = `
                <div class="msg">
                <div class="counter">
                  <span class="plus">+</span>
                  <h3>2</h3>
                  <span class="minus">-</span>
                </div>
                <div class="text_content">
                  <div class="top">
                    <div class="user">
                      <img src="${currentUser.image.png}" alt="">
                      <h3>${currentUser.username}</h3>
                      <p class="time">Now</p>
                    </div>
                    <div class="user_options">
                      <div class="delete">
                        <img src="./images/icon-delete.svg" alt="">
                        <p>Delete</p>
                      </div>
                      <div class="edit">
                        <img src="./images/icon-edit.svg" alt="">
                        <p>Edit</p>
                      </div>
                    </div>
                  </div>
                  <div class="text">
                    <p> <span class="replyingTo">@${targeted_msg.querySelector(".user h3").textContent}</span> ${e.target.value}</p>
                  </div>
                </div>
              </div>
                `
              targeted_msg.after(reply_msgs);
            }
          }
        })
      })
      // SEND REPLY ON CLICK ON REPLY BUTTON
      document.querySelectorAll("#send_reply").forEach((btn) => {
        btn.addEventListener("click", (ee) => {
          if (ee.target.parentElement.querySelector("input").value !== "") {
            unactive_ele.classList.remove("unactive")
            ee.target.parentElement.remove();
            let reply_msgs = document.createElement("div");
            reply_msgs.classList.add("reply_msgs")
            reply_msgs.innerHTML = `
              <div class="msg">
              <div class="counter">
                <span class="plus">+</span>
                <h3>2</h3>
                <span class="minus">-</span>
              </div>
              <div class="text_content">
                <div class="top">
                  <div class="user">
                    <img src="${currentUser.image.png}" alt="">
                    <h3>${currentUser.username}</h3>
                    <p class="time">Now</p>
                  </div>
                  <div class="user_options">
                    <div class="delete">
                      <img src="./images/icon-delete.svg" alt="">
                      <p>Delete</p>
                    </div>
                    <div class="edit">
                      <img src="./images/icon-edit.svg" alt="">
                      <p>Edit</p>
                    </div>
                  </div>
                </div>
                <div class="text">
                  <p> <span class="replyingTo">@${targeted_msg.querySelector(".user h3").textContent}</span> ${ee.target.parentElement.querySelector("input").value}</p>
                </div>
              </div>
            </div>
              `
            targeted_msg.after(reply_msgs);
          }
        })
      })
    })
  })
  // SEARCH ON CUREENT USER AND ADD YOU NEXT HIS NAME
  setInterval(() => {
    document.querySelectorAll(".msg").forEach((ele) => {
      if (ele.querySelector(".user h3").textContent == currentUser.username) {
        ele.querySelector(".user_options").innerHTML = `
          <div class="delete">
            <img src="./images/icon-delete.svg" alt="">
            <p>Delete</p>
          </div>
          <div class="edit">
            <img src="./images/icon-edit.svg" alt="">
            <p>Edit</p>
          </div>
          `
        ele.querySelector(".user h3").innerHTML += `
            <span class="you">You</span>
          `
      }
    });
  }, 500)
  // DELETE REPLYS AND MESSAGES IN PAGE 
  setInterval(() => {
    document.querySelectorAll(".delete").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let deleted_ele = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        if(deleted_ele.parentElement.getAttribute("class") == "reply_msgs"){
          document.querySelector("#delete_modal h3").textContent = "Delete Reply";
        }else{
          document.querySelector("#delete_modal h3").textContent = "Delete Comment";
        }
        document.querySelector("#delete_modal").classList.add("active");
        document.querySelectorAll("#delete_modal button").forEach((ele) => {
          ele.addEventListener("click", (e) => {
            if (e.target.id == "cancel") {
              document.querySelector("#delete_modal").classList.remove("active");
            }
            if (e.target.id == "ok") {
              document.querySelector("#delete_modal").classList.remove("active");
              deleted_ele.classList.add("deleted");
              setTimeout(() => {
                deleted_ele.style.position = "absolute";
                deleted_ele.remove();
              }, 500)
            }
          })
        })
      })
    })
  }, 500)
  // COMMENT INPUT EVENT ON CLICK ON ENTER BUTTON
  document.querySelector("#comment_input").addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      if (e.target.value !== "") {
        let comment = document.createElement("div");
        comment.classList.add("msg");
        comment.innerHTML = `
        <div class="counter">
          <img src="./images/icon-plus.svg" alt="">
          <h3>2</h3>
          <img src="./images/icon-minus.svg" alt="">
        </div>
        <div class="text_content">
          <div class="top">
            <div class="user">
              <img src="${currentUser.image.png}" alt="">
              <h3>${currentUser.username}</h3>
              <p class="time">Now</p>
            </div>
            <div class="user_options">
              <div class="delete">
                <img src="./images/icon-delete.svg" alt="">
                <p>Delete</p>
              </div>
              <div class="edit">
                <img src="./images/icon-edit.svg" alt="">
                <p>Edit</p>
              </div>
            </div>
          </div>
          <div class="text">
            <p>${e.target.value}</p>
          </div>
        </div>
        `
        document.querySelector(".comment").before(comment);
        e.target.value = "";
      }
    }
    setInterval(() => {
      document.querySelectorAll(".msg .edit").forEach((ele) => {
        ele.addEventListener("click", (e) => {
          let text = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".text");
          let textCont = text.querySelector("p")
          text.innerHTML += `
            <textarea style="height: ${text.scrollHeight + 50}px;" placeholder="Update text..." value="">${textCont.textContent}</textarea>
            <button class="update">Update</button>
          `
          e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".text p").remove()
          document.querySelectorAll(".update").forEach((btn) => {
            btn.addEventListener("click", (ee) => {
              let textAreaValue = ee.target.parentElement.querySelector("textarea").value;
              text.innerHTML = `
                <p>${textAreaValue}</p>
              `
            })
          })
        })
      })
    }, 500)
  })
  // COMMENT INPUT EVENT ON CLICK ON SEND COMMENT BUTTON
  document.querySelector("#send_comment").addEventListener("click", (e) => {
    let comment_input = e.target.parentElement.querySelector("input");
    if (comment_input.value !== "") {
      let comment = document.createElement("div");
      comment.classList.add("msg");
      comment.innerHTML = `
        <div class="counter">
          <img src="./images/icon-plus.svg" alt="">
          <h3>2</h3>
          <img src="./images/icon-minus.svg" alt="">
        </div>
        <div class="text_content">
          <div class="top">
            <div class="user">
              <img src="${currentUser.image.png}" alt="">
              <h3>${currentUser.username}</h3>
              <p class="time">Now</p>
            </div>
            <div class="user_options">
              <div class="delete">
                <img src="./images/icon-delete.svg" alt="">
                <p>Delete</p>
              </div>
              <div class="edit">
                <img src="./images/icon-edit.svg" alt="">
                <p>Edit</p>
              </div>
            </div>
          </div>
          <div class="text">
            <p>${comment_input.value}</p>
          </div>
        </div>
        `
      document.querySelector(".comment").before(comment);
      e.target.value = "";
    }
  })
  function edit() {
    document.querySelectorAll(".edit").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let text = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".text");
        let replyingTo = text.querySelector("p span").textContent;
        let textCont = text.querySelector("p")
        text.innerHTML += `
            <textarea style="height: ${text.scrollHeight + 50}px;" placeholder="Update text..." value="">${textCont.textContent}</textarea>
            <button class="update">Update</button>
          `
        document.querySelector("textarea").focus();
        e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".text p").remove()
        document.querySelectorAll(".update").forEach((btn) => {
          btn.addEventListener("click", (ee) => {
            let textAreaValue = ee.target.parentElement.querySelector("textarea").value;
            textAreaValue = textAreaValue.replace(textAreaValue.slice(textAreaValue.indexOf("@"), textAreaValue.indexOf(replyingTo[replyingTo.length - 1]), ""))
            textAreaValue = textAreaValue.replace("undefined", "");
            textAreaValue = textAreaValue.replace(replyingTo[replyingTo.length - 1], "");
            text.innerHTML = `
                <p><span class="replyingTo">${replyingTo}</span> ${textAreaValue}</p>
              `
          })
        })
      })
    })
  }
  setInterval(() => {
    edit()
  }, 500)
})


setTimeout(()=>{
  document.querySelector("footer").style.opacity = "0.5";
}, 10000)

setInterval(() => {
  console.info("Any Error That Exist In Console Developer Has Made It To Complete Working Process In Web Page")
}, 10000)

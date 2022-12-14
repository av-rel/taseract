$("form").on("submit", async (e) => {
  e.preventDefault();

  const username = $("#username").val().toString().toLowerCase().replaceAll(" ", "");
  const password = $("#password").val().toString().trim();

  try {

    if (username.length == 0 || password.length == 0) return;
    if (username.length > 191 || password.length > 191) throw new Error("Credentials length too long")

    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        username, password
      },
    })

    const result = await res.json()

    if (result.status == 200) return location.replace("/")
    return $("#warn").text(result.result)

  } catch (e) {
    return $("#warn").text(e.message);
  }

});


$("#register").on("click", async function () {

  const username = $("#username").val().toString().toLowerCase().replaceAll(" ", "");
  const password = $("#password").val().toString().trim();

  if (username.length == 0 || password.length == 0) return;

  try {

    if (username == name.toLowerCase() || username == "global") throw new Error("Forbidden 403")
    if (username.length > 191 || password.length > 191) throw new Error("Credentials length too long")

    const res = await fetch("/api/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        username, password
      },
    })

    const result = await res.json()
    if (result.status == 200) return location.replace("/");
    return $("#warn").text(result.result)

  } catch (e) {
    return $("#warn").text(e.message)
  }
})

$("#username, #password").on("input", function () {
  return $("#warn").text("");
})

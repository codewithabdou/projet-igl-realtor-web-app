const sendMessage = async (details) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `token ${localStorage.getItem("user_tok")}`
  );
  let data = new FormData();
  data.append("sent_to", details.sent_to);
  data.append("content", details.content);
  data.append("title", details.title);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  try {
    const res = await fetch(
      "https://annonces-immobilieres-hadjerl.vercel.app/send_message/",
      { ...requestOptions }
    );
    const ret = await res.json();
    console.log(ret)
  } catch (error) {
    throw error;
  }
};

export default sendMessage;

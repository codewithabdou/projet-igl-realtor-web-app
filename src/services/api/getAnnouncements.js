const getAnnouncements = (details) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `token ${localStorage.getItem("user_tok")}`
  );
  myHeaders.append("Content-Type", "application/json; charset=UTF-8");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(details),
    redirect: "follow",
  };

  fetch("https://annonces-immobilieres-hadjerl.vercel.app/search_filter/", {
    ...requestOptions,
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default getAnnouncements;

const createNewAnnouncement = async (details) => {
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

  console.log(requestOptions.body)

  try {
    const res = await fetch(
      "https://annonces-immobilieres-hadjerl.vercel.app/create/",
      {
        ...requestOptions,
      }
    );
    data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default createNewAnnouncement;

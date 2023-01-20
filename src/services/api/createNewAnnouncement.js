const createNewAnnouncement = async (details) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `token ${localStorage.getItem("user_tok")}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: details,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://annonces-immobilieres-hadjerl.vercel.app/create/",
      {
        ...requestOptions,
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default createNewAnnouncement;

const getReceivedMessages = async () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `token ${localStorage.getItem("user_tok")}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://annonces-immobilieres-hadjerl.vercel.app/get_recieved_messges/",
      {
        ...requestOptions,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default getReceivedMessages;

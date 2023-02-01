const deleteAnnouncement = async (id) => {
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
        `https://annonces-immobilieres-hadjerl.vercel.app/delete_announcement/${id}`,
        {
          ...requestOptions,
        }
      );
    } catch (error) {
      throw error;
    }
  };

export default deleteAnnouncement;
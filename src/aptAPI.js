import App from "./App";

class aptAPI {
  async getApts() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/appointment`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting appointments");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async newApt(formData) {
    // send fetch request
    const response = await fetch(`${App.apiBase}/appointment`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      body: formData,
    });

    // if response not ok
    if (!response.ok) {
      let message = "Problem adding appointment";
      if (response.status == 400) {
        const err = await response.json();
        message = err.message;
      }
      // throw error (exit this function)
      throw new Error(message);
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async updateApt(appointmentId) {
    // validate
    if (!appointmentId) return;

    // fetch the json data
    const response = await fetch(`${App.apiBase}/appointment/bookApt`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appointmentId: appointmentId }),
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem booking");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }
}

export default new AptAPI();

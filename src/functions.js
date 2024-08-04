import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL,
  process.env.REACT_APP_API_KEY
);

export async function logIn(email, password) {
  console.log(email, password);
  const { data, session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    return false;
  } else console.log(data);
  if (data === null) {
    return false;
  } else {
    return true;
  }
}

export function checkIfLogged() {
  const authToken = localStorage.getItem("sb-kutcjeqpldpwegtguask-auth-token");
  return authToken !== null;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getAllEvents() {
  let { data: Events, error } = await supabase.rpc("get_all_events");
  Events = parseDate(Events);
  console.log(Events);
  return Events;
}

export function parseDate(events) {
  events.forEach((event) => {
    const dateTimeStr = `${event.date}T${event.start_time}`;
    const date = new Date(dateTimeStr);
    const options = {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    event.date_time = date.toLocaleString("en-US", options).replace(",", "");
    delete event.date;
    delete event.start_time;
  });

  return events;
}

export async function getEvent(event_id) {
  let { data, error } = await supabase.rpc("get_event_details", {
    input_id: event_id,
  });

  data = parseDate(data);
  console.log(data);
  data = data[0];
  return data;
}

export function getUserID() {
  let id = localStorage.getItem("sb-kutcjeqpldpwegtguask-auth-token");
  if (id) {
    id = JSON.parse(id);
    id = id.user.id;
    return id;
  } else return false;
}

export async function getUserEvents() {
  const id = getUserID();
  if (id) {
    console.log("xd");
    let { data, error } = await supabase.rpc("get_user_events_details", {
      user_id: id,
    });
    if (error) console.error(error);
    data = parseDate(data);
    console.log(data);
    return data;
  }

  return [];
}
function hasEventById(userEvents, eventId) {
  return userEvents.some((event) => event.id === eventId);
}
export async function setUserEvent(event_id) {
  const id = getUserID();
  if (id) {
    const userEvents = await getUserEvents();
    if (hasEventById(userEvents, event_id)) return;
    let { data, error } = await supabase.rpc("insert_user_event", {
      event_id: event_id,
      user_id: id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
}

export async function deleteUserEvent(event_id) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("delete_user_event", {
      event_id_param: event_id,
      user_id_param: id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
}

export async function signUp(email, password, firstName, lastName, nickname) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        nickname: nickname,
        email: email,
      },
    },
  });
  console.log(data);
  console.log(error);
}

export async function getInviteLink() {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("get_invite_link", {
      user_id: id,
    });
    if (error) console.error(error);
    else console.log(data);
    return data;
  }
  return "Error";
}

export async function sendFriendInvitation(req_id) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("send_friend_request", {
      p_receiver_link: req_id,
      p_sender_id: id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
  return "Error";
}

export async function deleteFriendInvitation(req_id) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("remove_friend_request", {
      p_receiver_id: req_id,
      p_sender_id: id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
  return "Error";
}

export async function makeFriend(req_id) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("add_friend", {
      p_user1_id: id,
      p_user2_id: req_id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
  return "Error";
}

export async function deleteFriend(req_id) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("remove_friend", {
      p_user1_id: id,
      p_user2_id: req_id,
    });
    if (error) console.error(error);
    else console.log(data);
  }
  return "Error";
}

export async function getUserInvitations() {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("get_user_invitations", {
      p_user_id: id,
    });
    if (error) console.error(error);
    else {
      console.log(data);
      return data;
    }
  }
  return "Error";
}

export async function getUserSendInvitations() {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("get_user_send_invitations", {
      p_user_id: id,
    });
    if (error) console.error(error);
    else {
      console.log(data);
      return data;
    }
  }
  return "Error";
}

export async function getUserFriends() {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("get_user_friends", {
      p_user_id: id,
    });
    if (error) console.error(error);
    else {
      console.log(data);
      return data;
    }
  }

  return "Error";
}

export async function getEventsForMap() {
  let { data, error } = await supabase.rpc("geteventsformap");
  if (error) console.error(error);
  else console.log(data);
  return data;
}

export async function getCoordinates(address) {
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
    address
  )}&apiKey=${process.env.REACT_APP_HERE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const position = data.items[0].position;
      console.log(position.lat, position.lng);
      return { lat: position.lat, lng: position.lng };
    } else {
      console.log("No results found for the given address.");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

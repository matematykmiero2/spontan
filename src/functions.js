import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL,
  process.env.REACT_APP_API_KEY
);

export async function getUserLocations() {
  const id = getUserID();

  let { data, error } = await supabase.rpc("get_user_locations", {
    p_user_id: id,
  });
  if (error) console.error(error);
  else return data;
}

export async function getAllCategories() {
  let { data, error } = await supabase.rpc("get_all_categories");
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
}

export async function addEvent(newEvent, locations, categories) {
  const id = getUserID();
  newEvent.location = locations[newEvent.location_id].location_id;
  console.log(newEvent);
  const date = new Date(newEvent.start_time).toLocaleDateString();
  const time = new Date(newEvent.start_time).toLocaleTimeString();
  console.log(date, time);

  let { data, error } = await supabase.rpc("add_event", {
    p_date: newEvent.start_time,
    p_description: newEvent.description,
    p_duration: newEvent.duration,
    p_location_id: newEvent.location,
    p_long_description: "ccc",
    p_max_participants: newEvent.max_participants
      ? newEvent.max_participants
      : 0,
    p_name: newEvent.name,
    p_organizer_id: id,
    p_participants: 0,
    p_photo: newEvent.photo,
    p_price: newEvent.price,
    p_public: newEvent.public,
    p_start_time: time,
  });
  if (error) console.error(error);
  else console.log(data);
  const newEventId = data;

  let { data2, error2 } = await supabase.rpc("set_event_categories", {
    category_ids: categories,
    event_id: newEventId,
  });
  if (error) console.error(error);
  else console.log(data);
  return newEventId;
}
export async function addLocation(location) {
  location = Object.fromEntries(
    Object.entries(location).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );
  console.log(location);

  const cords = await getCoordinates(JSON.stringify(location));

  let { data, error } = await supabase.rpc("add_location", {
    p_apartment: location.apartment,
    p_city: location.city,
    p_latitude: String(cords.lat),
    p_longitude: String(cords.lng),
    p_number: location.number,
    p_street: location.street,
  });

  const id = getUserID();
  console.log(data);
  let { data2, error2 } = await supabase.rpc("add_user_location", {
    p_location_id: data,
    p_user_id: id,
  });
  if (error) console.error(error2);
  else console.log(data2);
}
export async function uploadPhoto(photo) {
  console.log(photo.name);
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`userphotos/${photo.name}`, photo);
  if (error) console.error(error);
  else console.log(data);
}

export async function getTasks(eventId) {
  let { data, error } = await supabase.rpc("get_tasks_for_event", {
    p_event_id: eventId,
  });
  if (error) console.error(error);
  else return data;
}
export async function addTask(eventId, newTask) {
  const id = getUserID();
  let { data, error } = await supabase.rpc("add_task", {
    p_description: newTask.description,
    p_event: eventId,
    p_reporter: id,
    p_summary: newTask.summary,
  });
  if (error) console.error(error);
  else console.log(data);
}
export async function changeTaskStatus(taskId, newStatus) {
  let { data, error } = await supabase.rpc("update_task_status", {
    p_status: newStatus,
    p_task_id: taskId,
  });
  if (error) console.error(error);
  else console.log(data);
}

export async function assignToTask(eventId) {
  const id = getUserID();
  let { data, error } = await supabase.rpc("assign_task", {
    p_assignee: id,
    p_task_id: eventId,
  });
  if (error) console.error(error);
  else console.log(data);
}

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

export async function sendMessage(event_id, body) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("add_message", {
      p_event_id: event_id,
      p_message: body,
      p_sender: id,
    });
    if (error) return 400;
    else {
      console.log(data);
      return 200;
    }
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

export async function getMessagesForEvent(eventId) {
  const id = getUserID();
  if (id) {
    let { data, error } = await supabase.rpc("get_messages_for_event", {
      p_event_id: eventId,
    });
    return data;
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

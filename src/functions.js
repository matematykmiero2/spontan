import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL,
  process.env.REACT_APP_API_KEY
);

export async function logIn(email, password) {
  console.log(email, password);
  let { data, error } = await supabase.rpc("auth", {
    p_email: email,
    p_password: password,
  });
  if (error) console.error(error);
  else console.log(data);
  if (data === null) {
    return false;
  } else {
    localStorage.setItem("authToken", data);
    return true;
  }
}

export function checkIfLogged() {
  const authToken = localStorage.getItem("authToken");
  return authToken !== null;
}

export function signOut() {
  localStorage.removeItem("authToken");
}

export async function registration(
  email,
  password,
  firstname,
  lastname,
  nicnkname
) {
  let { data, error } = await supabase.rpc("register", {
    p_email: email,
    p_firstname: firstname,
    p_lastname: lastname,
    p_nickname: nicnkname,
    p_password: password,
  });
  if (error) {
    console.error(error);
    return false;
  } else {
    console.log(data);
    localStorage.setItem("authToken", data);
    return true;
  }
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

export async function getUserEvents() {
  let { data, error } = await supabase.rpc("get_user_events_details", {
    user_id: localStorage.getItem("authToken"),
  });
  if (error) console.error(error);
  data = parseDate(data);
  console.log(data);
  return data;
}
function hasEventById(userEvents, eventId) {
  return userEvents.some((event) => event.id === eventId);
}
export async function setUserEvent(event_id) {
  const userEvents = await getUserEvents();
  if (hasEventById(userEvents, event_id)) return;
  let { data, error } = await supabase.rpc("insert_user_event", {
    event_id: event_id,
    user_id: localStorage.getItem("authToken"),
  });
  if (error) console.error(error);
  else console.log(data);
}

export async function deleteUserEvent(event_id) {
  let { data, error } = await supabase.rpc("delete_user_event", {
    event_id_param: event_id,
    user_id_param: localStorage.getItem("authToken"),
  });
  if (error) console.error(error);
  else console.log(data);
}

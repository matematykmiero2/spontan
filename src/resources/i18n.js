import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  //debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "Search...": "Search...",
        Description: "Description",
        "Start Time": "Start Time",
        Public: "Public",
        Categories: "Categories",
        Private: "Private",
        Price: "Price",
        Name: "Name",
        Duration: "Duration",
        Remove: "Remove",
        Accept: "Accept",
        Friends: "Friends",
        Profile: "Profile",
        Explore: "Explore",
        Invitations: "Invitations",
        Home: "Home",
        Signed: "Signed",
        Settings: "Settings",
        Decline: "Decline",
        Location: "Location",
        Invite: "Invite",
        Edit: "Edit",
        Cancel: "Cancel",
        Notifications: "Notifications",
        Send: "Send",
        Info: "Info",
        Chat: "Chat",
        Kanban: "Kanban",
        Organizer: "Organizer",
        "Loading ...": "Loading ...",
        Todo: "Todo",
        Done: "Done",
        Summary: "Summary",
        Assign: "Assign",
        Move: "Move",
        "Assignee:": "Assignee: ",
        "Add Task": "Add Task",
        "Add New Task": "Add New Task",
        "In progress": "In progress",
        "Type your message...": "Type your message...",
        "No messages yet": "No messages yet",
        "Change prefered categories": "Change prefered categories",
        "Change invitation link": "Change invitation link",
        "Change password": "Change password",
        "Change nickname": "Change nickname",
        "Change Language": "Change Language",
        "Send Invites": "Send Invites",
        "Submit Event": "Submit Event",
        "Upload photo": "Upload photo",
        "Max Participants": "Max Participants",
        "Photo URL": "Photo URL",
        "Log out": "Log out",
        "Loading...": "Loading...",
        "Scan friends QR or insert Link": "Scan friends QR code or insert Link",
        "Show your QR": "Show your QR code",
        "Your Link": "Your Link",
        "Send invitation": "Send invitation",
        "Insert friend invite Link": "Insert friend invite Link",
        "Send invitation for that link": "Send invitation for that link",
        "You have no permission to see that event":
          "You have no permission to see that event",
        "Add friend": "Add friend",
        "No invitations": "No invitations",
        "No send invitations": "No send invitations",
        "Your invitations": "Your invitations",
        "Show event invitations": "Show event invitations",
        "Create event": "Create event",
        "Manage events": "Manage events",
        "Invited by": "Invited by",
        "Please fill out all required fields.":
          "Please fill out all required fields.",
        "Create New Event": "Create New Event",
        "Add New Location": "Add New Location",
        "Login failed": "Login failed",
        "Email Address": "Email Address",
        Password: "Password",
        "Sign in": "Sign in",
        "Create account": "Create account",
        "Select Friends to Invite": "Select Friends to Invite",
        "Please enter a valid email address":
          "Please enter a valid email address",
        "First name": "First name",
        "Last name": "Last name",
        Nickname: "Nickname",
        "Please select a file first.": "Please select a file first.",
        "Upload Image": "Upload Image",
        "Uploading...": "Uploading...",
        Culture: "Culture",
        Art: "Art",
        Birthday: "Birthday",
        Outdoor: "Outdoor",
        Beer: "Beer",
        Clubbing: "Clubbing",
        "Movie Night": "Movie Night",
        Sport: "Sport",
        Alcohol: "Alcohol",
        Food: "Food",
        Networking: "Networking",
        Gaming: "Gaming",
        Indoor: "Indoor",
        Book: "Book",
        Dance: "Dance",
      },
    },
    pl: {
      translation: {
        Categories: "Kategorie",
        "Search...": "Szukaj...",
        Description: "Opis",
        "Start Time": "Czas rozpoczęcia",
        Public: "Publiczne",
        Private: "Prywatne",
        Price: "Cena",
        Name: "Nazwa",
        Duration: "Czas trwania",
        Remove: "Usuń",
        Accept: "Akceptuj",
        Friends: "Znajomi",
        Profile: "Profil",
        Explore: "Odkrywaj",
        Invitations: "Zaproszenia",
        Home: "Strona główna",
        Signed: "Biorę udział",
        Settings: "Ustawienia",
        Decline: "Odrzuć",
        Location: "Lokalizacja",
        Invite: "Zaproś",
        Edit: "Edytuj",
        Cancel: "Anuluj",
        Notifications: "Powiadomienia",
        Send: "Wyślij",
        Info: "Informacje",
        Chat: "Czat",
        Kanban: "Kanban",
        Organizer: "Organizator",
        "Loading ...": "Ładowanie ...",
        Todo: "Do zrobienia",
        Done: "Zrobione",
        Summary: "Podsumowanie",
        Assign: "Przypisz",
        Move: "Przenieś",
        "Assignee:": "Osoba odpowiedzialna: ",
        "Add Task": "Dodaj zadanie",
        "Add New Task": "Dodaj nowe zadanie",
        "In progress": "W trakcie",
        "Type your message...": "Wpisz swoją wiadomość...",
        "No messages yet": "Brak wiadomości",
        "Change prefered categories": "Zmień preferowane kategorie",
        "Change invitation link": "Zmień link zaproszenia",
        "Change password": "Zmień hasło",
        "Change nickname": "Zmień pseudonim",
        "Change Language": "Zmień język",
        "Send Invites": "Wyślij zaproszenia",
        "Submit Event": "Dodaj wydarzenie",
        "Upload photo": "Prześlij zdjęcie",
        "Max Participants": "Limit uczestników",
        "Photo URL": "URL zdjęcia",
        "Log out": "Wyloguj się",
        "Loading...": "Ładowanie...",
        "Scan friends QR or insert Link":
          "Zeskanuj QR znajomego lub wklej link",
        "Show your QR": "Pokaż swój QR",
        "Your Link": "Twój link",
        "Send invitation": "Wyślij zaproszenie",
        "Insert friend invite Link": "Wstaw link zaproszenia znajomego",
        "Send invitation for that link": "Wyślij zaproszenie na ten link",
        "You have no permission to see that event":
          "Nie masz uprawnień, aby zobaczyć to wydarzenie",
        "Add friend": "Dodaj znajomego",
        "No invitations": "Brak zaproszeń",
        "No send invitations": "Brak wysłanych zaproszeń",
        "Your invitations": "Twoje zaproszenia",
        "Show event invitations": "Pokaż zaproszenia na wydarzenia",
        "Create event": "Dodaj wydarzenie",
        "Manage events": "Zarządzaj wydarzeniami",
        "Invited by": "Zaproszony przez",
        "Please fill out all required fields.":
          "Proszę wypełnić wszystkie wymagane pola.",
        "Create New Event": "Dodaj nowe wydarzenie",
        "Add New Location": "Dodaj nową lokalizację",
        "Login failed": "Logowanie nieudane",
        "Email Address": "Adres email",
        Password: "Hasło",
        "Sign in": "Zaloguj się",
        "Create account": "Stwórz konto",
        "Select Friends to Invite": "Wybierz znajomych do zaproszenia",
        "Please enter a valid email address":
          "Proszę podać prawidłowy adres email",
        "First name": "Imię",
        "Last name": "Nazwisko",
        Nickname: "Pseudonim",
        "Please select a file first.": "Najpierw wybierz plik.",
        "Upload Image": "Prześlij obraz",
        "Uploading...": "Przesyłanie...",
        Culture: "Kultura",
        Art: "Sztuka",
        Birthday: "Urodziny",
        Outdoor: "Na świeżym powietrzu",
        Beer: "Piwo",
        Clubbing: "Klubowanie",
        "Movie Night": "Wieczór filmowy",
        Sport: "Sport",
        Alcohol: "Alkohol",
        Food: "Jedzenie",
        Networking: "Networking",
        Gaming: "Gry",
        Indoor: "W pomieszczeniu",
        Book: "Książka",
        Dance: "Taniec",
      },
    },
    de: {
      translation: {
        "Search...": "Suche...",
        Description: "Beschreibung",
        "Start Time": "Startzeit",
        Public: "Öffentlich",
        Categories: "Kategorien",
        Private: "Privat",
        Price: "Preis",
        Name: "Name",
        Duration: "Dauer",
        Remove: "Entfernen",
        Accept: "Akzeptieren",
        Friends: "Freunde",
        Profile: "Profil",
        Explore: "Entdecken",
        Invitations: "Einladungen",
        Home: "Startseite",
        Signed: "Unterzeichnet",
        Settings: "Einstellungen",
        Decline: "Ablehnen",
        Location: "Standort",
        Invite: "Einladen",
        Edit: "Bearbeiten",
        Cancel: "Abbrechen",
        Notifications: "Benachrichtigungen",
        Send: "Senden",
        Info: "Info",
        Chat: "Chat",
        Kanban: "Kanban",
        Organizer: "Organisator",
        "Loading ...": "Lädt ...",
        Todo: "ToDo",
        Done: "Fertig",
        Summary: "Zusammenfassung",
        Assign: "Zuweisen",
        Move: "Bewegen",
        "Assignee:": "Zugestellter:",
        "Add Task": "Aufgabe hinzufügen",
        "Add New Task": "Neue Aufgabe hinzufügen",
        "In progress": "In Bearbeitung",
        "Type your message...": "Geben Sie Ihre Nachricht ein...",
        "No messages yet": "Noch keine Nachrichten",
        "Change prefered categories": "Bevorzugte Kategorien ändern",
        "Change invitation link": "Einladungslink ändern",
        "Change password": "Passwort ändern",
        "Change nickname": "Spitznamen ändern",
        "Change Language": "Sprache ändern",
        "Send Invites": "Einladungen senden",
        "Submit Event": "Event einreichen",
        "Upload photo": "Foto hochladen",
        "Max Participants": "Maximale Teilnehmerzahl",
        "Photo URL": "Foto-URL",
        "Log out": "Abmelden",
        "Loading...": "Lädt...",
        "Scan friends QR or insert Link":
          "QR-Code von Freunden scannen oder Link einfügen",
        "Show your QR": "Zeige deinen QR-Code",
        "Your Link": "Ihr Link",
        "Send invitation": "Einladung senden",
        "Insert friend invite Link": "Freundseinladungslink einfügen",
        "Send invitation for that link": "Einladung für diesen Link senden",
        "You have no permission to see that event":
          "Sie haben keine Berechtigung, dieses Event zu sehen",
        "Add friend": "Freund hinzufügen",
        "No invitations": "Keine Einladungen",
        "No send invitations": "Keine Einladungen senden",
        "Your invitations": "Ihre Einladungen",
        "Show event invitations": "Eventeinladungen anzeigen",
        "Create event": "Event erstellen",
        "Manage events": "Events verwalten",
        "Invited by": "Eingeladen von",
        "Please fill out all required fields.":
          "Bitte füllen Sie alle erforderlichen Felder aus.",
        "Create New Event": "Neues Event erstellen",
        "Add New Location": "Neuen Standort hinzufügen",
        "Login failed": "Anmeldung fehlgeschlagen",
        "Email Address": "E-Mail-Adresse",
        Password: "Passwort",
        "Sign in": "Anmelden",
        "Create account": "Konto erstellen",
        "Select Friends to Invite":
          "Freunde auswählen, die eingeladen werden sollen",
        "Please enter a valid email address":
          "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        "First name": "Vorname",
        "Last name": "Nachname",
        Nickname: "Spitzname",
        "Please select a file first.":
          "Bitte wählen Sie zuerst eine Datei aus.",
        "Upload Image": "Bild hochladen",
        "Uploading...": "Hochladen...",
        Culture: "Kultur",
        Art: "Kunst",
        Birthday: "Geburtstag",
        Outdoor: "Draußen",
        Beer: "Bier",
        Clubbing: "Clubben",
        "Movie Night": "Filmabend",
        Sport: "Sport",
        Alcohol: "Alkohol",
        Food: "Essen",
        Networking: "Networking",
        Gaming: "Spiele",
        Indoor: "Drinnen",
        Book: "Buch",
        Dance: "Tanz",
      },
    },
  },
});

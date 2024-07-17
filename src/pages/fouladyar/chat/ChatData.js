import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User3 from "../../../images/avatar/d-sm.jpg";
import User4 from "../../../images/avatar/a-sm.jpg";

export const chatUserData = [
  {
    id: 1,
    user: "Illiash Hossain",
    active: true,
    theme: "primary",
  },
  {
    id: 2,
    user: "Abu Bin Ishtiak",
    active: true,
    theme: "blue",
  },
  {
    id: 3,
    user: "George Phillips",
    active: true,
    image: User,
    theme: "pink",
  },
  {
    id: 4,
    name: "Larry Hughes",
    image: User2,
    active: true,
    theme: "purple",
  },
  {
    id: 5,
    name: "Tammy Wilson",
    theme: "purple",
    active: true,
  },
  {
    id: 6,
    name: "Softnio Group",
    group: true,
    theme: "purple",
    active: false,
  },
  {
    id: 7,
    user: "Emile Clarke",
    active: true,
    image: User4,
  },
  {
    id: 8,
    user: "Shakel Krosser",
    theme: "info",
    active: true,
  },
  {
    id: 9,
    user: "Kumar Kamal",
    theme: "info",
    active: true,
  },
];

export const chatData = [
  {
    id: 1,
    name: "حسین گرامی",
    nickname: "",
    // theme: "purple",
    // chatTheme: "purple",
    favorite: true,
    active: "30m",
    date: "2023-09-09T18:59:33.628+00:00",
    unread: 12,
    archive: false,
    delivered: true,
    conversations: [
      {
        id: "chat_1",
        chat: ["سلام!", "هنگام تلاش برای خرید محصول، مشکلی پیدا کردم."],
        date: "29 Apr, 2020 4:28 PM",
      },
      {
        id: "chat_2",
        me: true,
        chat: ["ممنون از اطلاع رسانی ما فقط مسائل را حل کردیم. لطفا اکنون بررسی کنید."],
        date: "29 Apr, 2020 4:12 PM",
      },
      {
        id: "chat_3",
        chat: [
          "این واقعا عالی است.",
          "عالیه. متشکرم از اینکه مرا مطلع کردید.",
          "ش برای خرید محصول، مشکلی پ.",
          " بازنشانی کردیم. لطفا ایمیل خود را ",
          " از اطلاع رسانی ما فقط مسا.",
          " از اطلاع رسانی ما فقط مسا.",
        ],
        date: "29 Apr, 2020 4:28 PM",
      },
      {
        meta: {
          metaID: "meta_1",
          metaText: "12 May, 2020",
        },
      },
      {
        id: "chat_4",
        chat: ["عالیه. متشکرم از اینکه مرا مطلع کردید ؟"],
        date: "3:49 PM",
      },
      {
        id: "chat_5",
        me: true,
        date: "3:55 PM",
        chat: ["قطعا. ما خوشحالیم که به شما کمک می کنیم."],
      },
      {
        id: "chat_6",
        date: "3:55 PM",
        chat: ["متشکرم! وقتی انجام شد به من اطلاع دهید."],
      },
      {
        id: "chat_7",
        date: "3:55 PM",
        me: true,
        now: true,
        chat: [
          "ما فقط حساب شما را بازنشانی کردیم. لطفا ایمیل خود را برای تایید بررسی کنید.",
          "لطفاً تأیید کنید که ایمیل دریافت کرده اید",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "آرین عبدی",
    nickname: "",
    // theme: "blue",
    // chatTheme: "purple",
    date: "2023-09-09T18:59:33.628+00:00",
    active: "60m",
    unread: 145,
    archive: false,
    favorite: true,
    delivered: true,
    conversations: [
      {
        id: "chat_1",
        chat: ["سلام من ایشتیاک هستم، میشه در مورد چیزی کمکم کنید؟"],
        date: "4:49 AM",
      },
      {
        id: "chat_2",
        me: true,
        chat: ["ممنون از اطلاع رسانی ما فقط مسائل را حل کردیم. لطفا اکنون بررسی کنید."],
        date: "4:12 PM",
      },
      {
        id: "chat_3",
        chat: ["این واقعا عالی است.", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
  {
    id: 3,
    name: "نوید اباذری",
    nickname: "",
    image: User,
    favorite: true,
    date: "2023-09-09T18:59:33.628+00:00",
    archive: false,
    active: true,
    delivered: true,
    conversations: [
      {
        id: "chat_1",
        chat: ["آیا ادعای رز را دیده اید؟"],
        date: "6 Apr",
      },
      {
        id: "chat_3",
        me: true,
        chat: ["نه من ندارم. من آن را بررسی خواهم کرد", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
  {
    id: 4,
    name: "پویا رضایی",
    nickname: "",
    image: User2,
    favorite: true,
    archive: true,
    date: "2023-09-09T18:59:33.628+00:00",
    active: true,
    delivered: "unread",
    conversations: [
      {
        id: "chat_1",
        chat: ["سلام فرانک! حال شما چطور است؟"],
        date: "3 Apr",
      },
      {
        id: "chat_3",
        me: true,
        chat: ["هی من عالی بودم خیلی وقته گذشته.", "چه کار میکنی؟."],
        date: "29 Apr, 2020 4:28 PM",
      },
      {
        id: "chat_4",
        chat: ["عالی.", "کار چطوره؟ آیا به خارج از کشور می روید؟"],
        date: "29 Apr, 2020 4:28 PM",
      },
    ],
  },
  {
    id: 5,
    name: "علیرضا قربانی",
    nickname: "",
    // theme: "pink",
    // chatTheme: "purple",
    active: true,
    favorite: true,
    archive: true,
    date: "2023-09-09T18:59:33.628+00:00",
    delivered: "sent",
    conversations: [
      {
        id: "chat_1",
        me: true,
        chat: ["من به تازگی یک کامپیوتر جدید خریدم اما یک مشکل دارم"],
        date: "27 Mar",
      },
    ],
  },
  {
    id: 7,
    name: "امیر حسین آقاجونی",
    nickname: "",
    active: true,
    image: User4,
    archive: false,
    date: "2023-09-09T18:59:33.628+00:00",
    favorite: false,
    conversations: [
      {
        id: "chat_1",
        me: true,
        chat: ["من به تازگی یک کامپیوتر جدید خریدم اما یک مشکل دارم"],
        date: "27 Mar",
      },
    ],
  },
  {
    id: 8,
    name: "محمد رضا سبحان",
    nickname: "",
    active: true,
    archive: false,
    date: "Now",
    favorite: false,
    conversations: [],
  },
  {
    id: 9,
    name: "شیما کلانتر",
    nickname: "",
    date: "2023-09-09T18:59:33.628+00:00",
    archive: false,
    active: true,
    favorite: false,
    conversations: [

      {
        id: "chat_3",
        chat: ["این واقعا عالی است.", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
  {
    id: 10,
    name: "ثنا آقایی",
    nickname: "",
    active: true,
    image: User3,
    unread: false,
    archive: false,
    date: "2023-09-09T18:59:33.628+00:00",
    favorite: false,
    conversations: [

      {
        id: "chat_3",
        chat: ["این واقعا عالی است.", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
  {
    id: 11,
    name: "فریبا اشکی",
    nickname: "",
    active: true,
    unread: false,
    archive: false,
    date: "2023-09-09T18:59:33.628+00:00",
    favorite: false,
    conversations: [

      {
        id: "chat_3",
        chat: ["این واقعا عالی است.", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
  {
    id: 12,
    name: "ریما محسنی",
    nickname: "",
    date: "2023-09-09T18:59:33.628+00:00",
    unread: false,
    archive: false,
    active: true,
    favorite: false,
    conversations: [

      {
        id: "chat_3",
        chat: ["این واقعا عالی است.", "عالیه. متشکرم از اینکه مرا مطلع کردید."],
        date: "4:28 PM",
      },
    ],
  },
];

const sortedDataFunc = (array) => {
  chatData.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  return chatData.filter((item) => array.includes(item.name.split("")[0].toUpperCase()) && !item.group);
};

const sortedDataNotfavoriteFunc = (array) => {
  chatData.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  return chatData.filter((item) => array.includes(item.name.split("")[0].toUpperCase()) && item.favorite === false);
};

export const contacts = [
  {
    id: 1,
    title: "A",
    contacts: sortedDataFunc(["A"]),
  },
  {
    id: 2,
    title: "B",
    contacts: sortedDataFunc(["B"]),
  },
  {
    id: 3,
    title: "C",
    contacts: sortedDataFunc(["C"]),
  },
  {
    id: 3,
    title: "D",
    contacts: sortedDataFunc(["D"]),
  },
  {
    id: 4,
    title: "E-k",
    contacts: sortedDataFunc(["E", "F", "G", "H", "I", "J", "K"]),
  },
  {
    id: 5,
    title: "L-T",
    contacts: sortedDataFunc(["L", "M", "N", "O", "P", "Q", "R", "S", "T"]),
  },
  {
    id: 6,
    title: "U-Z",
    contacts: sortedDataFunc(["U", "V", "W", "X", "Y", "Z"]),
  },
];

export const addUserData = [
  {
    id: 50,
    role: "User",
    name: "Alissa Kate",
    theme: "purple",
  },
  {
    id: 51,
    role: "User",
    name: "Jasper Jordan",
    theme: "orange",
  },
  {
    id: 52,
    role: "User",
    name: "Winter Rays",
    theme: "pink",
  },
];

export const nonfavoriteContacts = [
  {
    id: 1,
    title: "A",
    contacts: sortedDataNotfavoriteFunc(["A"]),
  },
  {
    id: 2,
    title: "B",
    contacts: sortedDataNotfavoriteFunc(["B"]),
  },
  {
    id: 3,
    title: "C",
    contacts: sortedDataNotfavoriteFunc(["C"]),
  },
  {
    id: 3,
    title: "D",
    contacts: sortedDataNotfavoriteFunc(["D"]),
  },
  {
    id: 4,
    title: "E-k",
    contacts: sortedDataNotfavoriteFunc(["E", "F", "G", "H", "I", "J", "K"]),
  },
  {
    id: 5,
    title: "L-T",
    contacts: sortedDataNotfavoriteFunc(["L", "M", "N", "O", "P", "Q", "R", "S", "T"]),
  },
  {
    id: 6,
    title: "U-Z",
    contacts: sortedDataNotfavoriteFunc(["U", "V", "W", "X", "Y", "Z"]),
  },
];

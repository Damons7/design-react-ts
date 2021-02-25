import i18n from "i18next";
import { initReactI18next } from "react-i18next";


let lang = localStorage.getItem("lang")
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    common: {
      "name": "name1",
      "project": "project"
    },
    translation: {
      "nickname": "aiwa",

    }
  },
  "zh-CN": {
    common: {
      "name": "姓名",
      "project": "工程"
    },
    translation: {
      "nickname": "爱华",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang ? lang : "zh-CN",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
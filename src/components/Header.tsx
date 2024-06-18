import kiologo from "../assets/img/x.svg";
import { useLanguage } from "../LanguageProvider";
function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header>
      <img src={kiologo} alt="KIO Logo" />
      <ul className="language-options">
        <li>
          <button
            onClick={() => setLanguage("de")}
            className={language == "de" ? "active" : ""}
          >
            Deutsch
          </button>
        </li>
        <li>
          <button
            onClick={() => setLanguage("en")}
            className={language == "en" ? "active" : ""}
          >
            English
          </button>
        </li>
      </ul>
      <h1>BatchAR</h1>
    </header>
  );
}
export default Header;

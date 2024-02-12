export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">
        <span className="nav-title">
          Apparel<span className="color-contrast">Kart</span>
        </span>
      </div>
      <ul className="link-list">
        <li>
          <a href="https://twitter.com/Kaushal53362050" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/kaushal95" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/kaushal-kumar-019952170"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <div className="copyright-text">
        © No Copyright, Feel free to replicate.
      </div>
    </footer>
  );
}

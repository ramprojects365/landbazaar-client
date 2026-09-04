import Link from "next/link";

// SocialLinks Component
export function SocialLinks() {
  return (
    <div className="tp-hero-social">
      <Link href="https://www.instagram.com/dekho_land/" target="_blank">
        <span>
          <i className="fa-brands fa-instagram"></i>
        </span>
      </Link>
      <Link href="https://dribbble.com/" target="_blank">
        <span>
          <i className="fa-brands fa-dribbble"></i>
        </span>
      </Link>
      <Link href="https://wa.me/919866774319" target="_blank">
        <span>
          <i className="fa-brands fa-whatsapp"></i>
        </span>
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=61592897772107"
        target="_blank"
      >
        <span>
          <i className="fa-brands fa-facebook-f"></i>
        </span>
      </Link>
    </div>
  );
}

export function SocialLinksTwo() {
  return (
    <>
      <Link
        href="https://www.facebook.com/profile.php?id=61592897772107"
        target="_blank"
      >
        <span>
          <i className="fa-brands fa-facebook-f"></i>
        </span>
      </Link>{" "}
      <Link href="https://www.behance.net/" target="_blank">
        <span>
          <i className="fa-brands fa-behance"></i>
        </span>
      </Link>{" "}
      <Link href="https://www.linkedin.com/" target="_blank">
        <span>
          <i className="fa-brands fa-linkedin-in"></i>
        </span>
      </Link>{" "}
      <Link href="https://www.instagram.com/dekho_land/" target="_blank">
        <span>
          <i className="fa-brands fa-instagram"></i>
        </span>
      </Link>
    </>
  );
}
export function SocialLinksThree() {
  return (
    <>
      <Link
        href="https://www.facebook.com/profile.php?id=61592897772107"
        target="_blank"
      >
        <i className="fab fa-facebook-f"></i>
      </Link>{" "}
      <Link href="https://www.instagram.com/dekho_land/" target="_blank">
        <i className="fa-brands fa-instagram"></i>
      </Link>{" "}
      <Link href="https://www.youtube.com/@DekhoLand" target="_blank">
        <i className="fa-brands fa-youtube"></i>
      </Link>{" "}
      <Link href="https://www.pinterest.com/dekholand/dekholand-your-path-to-verified-land/" target="_blank">
        <i className="fa-brands fa-pinterest-p"></i>
      </Link>
    </>
  );
}

export function FooterSocialLinks() {
  return (
    <>
      <Link
        href="https://www.facebook.com/profile.php?id=61592897772107"
        target="_blank"
      >
        <i className="fab fa-facebook-f"></i>
      </Link>{" "}
      <Link href="https://www.instagram.com/dekho_land/" target="_blank">
        <i className="fa-brands fa-instagram"></i>
      </Link>{" "}
      <Link href="https://www.pinterest.com/dekholand/dekholand-your-path-to-verified-land/" target="_blank">
        <i className="fa-brands fa-pinterest-p"></i>
      </Link>{" "}
      <Link href="https://x.com/dekho_land" target="_blank">
        <i className="fa-brands fa-twitter"></i>
      </Link>
    </>
  );
}

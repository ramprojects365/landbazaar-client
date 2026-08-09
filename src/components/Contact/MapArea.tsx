const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.905094979!2d78.24323194335936!3d17.412608650000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

export default function MapArea() {
  return (
    <div className="tp-contact-map">
      <div className="tp-contact-map-content">
        <iframe
          src={MAP_URL}
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dekho Land office location in Hyderabad, Telangana"
        />
      </div>
    </div>
  );
}

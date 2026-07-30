const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4902.030604269124!2d101.68526107497111!3d3.1283924968470944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49eb996ef441%3A0x6de34fcd050ef0db!2s86%2C%20Jalan%20Berhala%2C%20Brickfields%2C%2050470%20Kuala%20Lumpur%2C%20Wilayah%20Persekutuan%20Kuala%20Lumpur!5e1!3m2!1sen!2smy!4v1780136583896!5m2!1sen!2smy";

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
        />
      </div>
    </div>
  );
}

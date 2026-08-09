const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31607268142!2d78.24323184999999!3d17.4126274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export default function LocationPickerMap() {
  return (
    <div className="tp-dashboard-new-map">
      <iframe
        src={MAP_URL}
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hyderabad, Telangana map"
      />
    </div>
  );
}

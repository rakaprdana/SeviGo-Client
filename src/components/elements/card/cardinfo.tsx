import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const CardInfo = () => {
  return (
    <>
      <ul className="list-none bg-slate-100 m-5 flex flex-col space-y-4 p-8 text-left text-md rounded-xl">
        <li
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex items-center"
        >
          <i className="bx bx-check-circle text-orange-400 text-4xl mr-4"></i>
          Layanan ini terbuka untuk seluruh masyarakat tanpa terkecuali.
        </li>
        <li
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex items-center"
        >
          <i className="bx bx-check-circle text-orange-400 text-4xl mr-4"></i>
          Anda dapat melaporkan segala bentuk keluhan terkait pelayanan publik
          seperti transportasi, kesehatan, pendidikan, dan lainnya.
        </li>
        <li
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex items-center"
        >
          <i className="bx bx-check-circle text-orange-400 text-4xl mr-4"></i>
          Cukup daftarkan akun, isi formulir pengaduan, dan kirimkan. Kami akan
          memprosesnya secepat mungkin.
        </li>
        <li
          data-aos="fade-right"
          data-aos-duration="1000"
          className="flex items-center"
        >
          <i className="bx bx-check-circle text-orange-400 text-4xl mr-4"></i>
          Setiap pengaduan akan diproses dalam waktu 2-5 hari kerja, tergantung
          kompleksitas masalah.
        </li>
      </ul>
    </>
  );
};

export default CardInfo;

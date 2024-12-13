import CardFeat from "../components/elements/card/cardfeat";
import "boxicons/css/boxicons.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const FeatureSection = () => {
  return (
    <>
      <div id="fitur" className="flex flex-col items-center">
        <h1 className="text-4xl font-bold py-4">Fitur Utama Kami</h1>
        <hr className="w-2/3 mb-6" />
        <p className=" lg:text-lg text-center lg:w-1/2 px-4 mb-4">
          Kami menyediakan berbagai fitur yang memudahkan Anda dalam melaporkan
          masalah dan memantau status pengaduan Anda.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 p-4 w-full max-w-4xl">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="grid grid-rows-2 gap-4"
          >
            <CardFeat
              icon="bx-notepad"
              title="Pengaduan Cepat dan Mudah"
              paragraph="Proses pengajuan pengaduan hanya dengan beberapa langkah sederhana."
            />
            <CardFeat
              icon="bxs-devices"
              title="Multi Platform"
              paragraph="Pengaduan dimana saja, kapan saja, dan dari perangkat apa saja"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="grid grid-rows-2 gap-4"
          >
            <CardFeat
              icon="bx-stats"
              title="Pantau Status Pengaduan"
              paragraph="Lacak perkembangan pengaduan Anda secara real-time dari dashboard pengguna."
            />
            <CardFeat
              icon="bx-message-error"
              title="Feedback dari Admin"
              paragraph="Terima tanggapan dan solusi dari admin terkait pengaduan Anda."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;

import AOS from "aos";
import "aos/dist/aos.css";
import CardAmount from "../components/elements/card/cardamount";
AOS.init();

const AmountSection = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Total Tindakan Pengaduan
      </h1>
      <hr className="w-2/3 mb-6" />
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-4xl"
      >
        <div className="grid grid-rows-2 gap-4">
          <CardAmount
            title="Total Pengaduan"
            endpoint="/statistics/complaints"
          />
          <CardAmount
            title="Pengaduan dalam proses"
            endpoint="/statistics/complaints-processing"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          <CardAmount
            title="Pengaduan terselesaikan"
            endpoint="/statistics/complaints-finished"
          />
          <CardAmount
            title="Tanggapan yang diberikan"
            endpoint="/statistics/feedbacks"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSection;

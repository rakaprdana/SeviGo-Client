import CardInfo from "../components/elements/card/cardinfo";

const InfoSection = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 text-center mt-4">
        <h1 className="text-4xl m-2 font-bold">
          Informasi Tentang Layanan Kami
        </h1>
        <hr className="w-2/3" />
        <p className="w-4/5 lg:w-full m-10 text-md">
          Layanan Pengaduan Masyarakat ini dirancang untuk memberikan saluran
          yang transparan dan mudah diakses oleh masyarakat.{" "}
        </p>
        <p className=" text-md">
          Berikut adalah informasi penting tentang penggunaan layanan:
        </p>
        <CardInfo />
      </div>
    </>
  );
};

export default InfoSection;

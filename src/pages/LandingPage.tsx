import Navbar from "../layout/Navbar";
import FeatureSection from "../layout/FeatSect";
import InfoSection from "../layout/InfoSect";
import FAQSection from "../layout/FAQSect.tsx";
import AmountSection from "../layout/AmountSection.tsx";
import backgroundImage from "../assets/image/section1-bg.jpg";
import Footer from "../layout/Footer.tsx";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <section
        className="flex items-center justify-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex flex-col items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4">SeviGo</h1>
          <p className=" px-8 lg:text-lg mb-8 max-w-xl mx-auto">
            Kami hadir untuk memudahkan masyarakat dalam menyampaikan keluhan
            dan pengaduan terkait pelayanan publik. Bersama kita wujudkan
            pelayanan yang lebih baik.
          </p>
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 duration-700"
            onClick={() =>
              document
                .getElementById("info-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-2 lg:p-4 w-12 lg:w-16 rounded-full bg-orange-500 active:bg-orange-600 text-white shadow-lg hover:shadow-xl active:shadow-none transition-all duration-500"
        >
          <i className="bx bx-chevron-up text-xl lg:text-2xl font-bold"></i>
        </button>
      </section>
      <AmountSection />
      <section id="feature-section">
        <FeatureSection />
      </section>
      <section id="info-section">
        <InfoSection />
      </section>
      <section id="faq-section">
        <FAQSection />
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;

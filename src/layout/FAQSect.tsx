import CardFAQ from "../components/elements/card/cardfaq";

const FAQSection = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 text-center my-4">
        <h1 className="text-4xl font-bold">
          Pertanyaan yang sering diajukan (FAQ)
        </h1>
        <hr className="w-2/3" />
        <p className="w-4/5 text-md">
          Berikut adalah beberapa pertanyaan umum terkait penggunaan layanan
          kami.
        </p>
        {/* Render Accordion FAQ */}
        <CardFAQ />
      </div>
    </>
  );
};

export default FAQSection;

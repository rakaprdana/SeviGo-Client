import { useState } from "react";

const CardFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Bagaimana cara membuat pengaduan?",
      answer:
        "Anda perlu mendaftar sebagai pengguna, masuk ke dashboard, dan mengisi formulir pengaduan di bagian 'Pengaduan Baru'.",
    },
    {
      question: "Apakah saya bisa melacak status pengaduan?",
      answer:
        "Ya, Anda bisa melacak status pengaduan dari dashboard pengguna. Setiap perubahan status akan diberitahukan melalui notifikasi.",
    },
    {
      question: "Berapa lama waktu respon dari admin?",
      answer:
        "Admin akan memberikan respon awal dalam waktu maksimal 2 hari setelah pengaduan diajukan.",
    },
    {
      question: "Apakah pengaduan saya bersifat rahasia?",
      answer:
        "Ya, semua pengaduan yang diajukan bersifat rahasia dan hanya dapat diakses oleh pihak terkait.",
    },
  ];

  return (
    <ul className="list-none w-full lg:w-4/5 flex flex-col px-4 lg:p-8 text-left text-md text-xl mb-16 font-sans">
      {faqData.map((faq, index) => (
        <li key={index} className="mb-3">
          {/* Pertanyaan */}
          <div
            className={`flex items-center justify-between cursor-pointer bg-orange-500 rounded-xl px-5 py-4 ${
              openIndex === index ? "bg-orange-600" : ""
            } text-white font-semibold`}
            onClick={() => toggleAccordion(index)}
          >
            <span>{faq.question}</span>
            <span
              className={`transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </div>
          {/* Jawaban */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
            style={{
              maxHeight: openIndex === index ? "200px" : "0",
            }}
          >
            <div className="bg-slate-100 rounded-xl px-5 py-4 mt-2 font-light text-gray-800">
              {faq.answer}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardFAQ;

interface CardFeatProps {
  icon: string;
  title: string;
  paragraph: string;
}

const CardFeat = ({ icon, title, paragraph }: CardFeatProps) => {
  return (
    <div className="bg-slate-100 flex flex-col items-center text-center lg:w-full py-4 rounded-lg">
      <div className="bg-white rounded-full p-4">
        <i className={`bx ${icon} text-7xl text-orange-400`}></i>
      </div>
      <h1 className="text-2xl font-bold w-3/5 my-4">{title}</h1>
      <p className="px-4">{paragraph}</p>
    </div>
  );
};

export default CardFeat;

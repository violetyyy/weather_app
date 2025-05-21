import { MapPin, House, Heart, User } from "lucide-react";

const Card = (props) => {
  return (
    <div
      className={`h-[828px] w-[414px] bg-${props.background} opacity-[0.75]  rounded-[48px] shadow-xl px-[48px] py-[56px] flex-col flex justify-between z-10`}
    >
      <div className="flex items-center justify-between backdrop-blur-lg">
        <div className="flex flex-col justify-start">
          <p className={` text-${props.date_text} text-[18px] font-semibold`}>
            {props.date}
          </p>
          <h2 className={`text-5xl text-${props.location_text} font-bold`}>
            {props.location}
          </h2>
        </div>
        <div>
          <MapPin size="32px" color={`${props.pin_color}`} />
        </div>
      </div>

      <div
        className={` h-[260px] w-[260px] bg-center bg-cover ml-[22px] opacity-100`}
      >
        <img src={`${props.image}`} alt="" />
      </div>

      <div>
        <h1
          className="text-transparent bg-clip-text font-extrabold text-[144px]"
          style={{
            background:
              "var(--Cool-Gray-Gradient, linear-gradient(180deg, #111827 0%, #6B7280 100%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {props.temp}
        </h1>
        <p
          className={`text-2xl font-extrabold `}
          style={{ color: `${props.state_color}` }}
        >
          {props.state}
        </p>
      </div>

      <div className="flex justify-between">
        <House color={`${props.pin_color}`} />
        <MapPin color={`${props.pin_color}`} />
        <Heart color={`${props.pin_color}`} />
        <User color={`${props.pin_color}`} />
      </div>
    </div>
  );
};

export default Card;

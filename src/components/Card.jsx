import { MapPin, House, Heart, User } from "lucide-react";

const Card = (props) => {
  return (
    <div
      className={`h-[828px] w-[414px] bg-${props.background} rounded-[48px] shadow-2xl px-[48px] py-[56px] flex flex-col justify-between z-10 backdrop-blur-lg border border-gray-800/20`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-start">
          <p 
            className="text-[18px] font-semibold opacity-80"
            style={{ color: props.date_text }}
          >
            {props.date || 'Loading...'}
          </p>
          <h2 
            className="text-5xl font-bold leading-tight"
            style={{ color: props.location_text }}
          >
            {props.location || 'Location'}
          </h2>
        </div>
        <div className="p-2">
          <MapPin size="32px" color={`${props.pin_color}`} />
        </div>
      </div>

      {/* Weather Icon Section */}
      <div className="flex justify-center items-center h-[260px] w-[260px] mx-auto">
        <img 
          src={`${props.image}`} 
          alt="Weather condition" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Temperature and Condition Section */}
      <div className="text-center">
        <h1
          className="text-transparent bg-clip-text font-extrabold text-[144px] leading-none"
          style={props.style}
        >
          {props.temp || '--'}
        </h1>
        <p
          className="text-2xl font-bold mt-2"
          style={{ color: `${props.state_color}` }}
        >
          {props.state || 'Clear'}
        </p>
      </div>

      {/* Footer Icons */}
      <div className="flex justify-between items-center px-4">
        <div className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer group">
          <House color={`${props.pin_color}`} size="24px" className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer group">
          <MapPin color={`${props.pin_color}`} size="24px" className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer group">
          <Heart color={`${props.pin_color}`} size="24px" className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer group">
          <User color={`${props.pin_color}`} size="24px" className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default Card;

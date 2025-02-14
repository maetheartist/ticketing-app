
import {logo} from "../../config/static"
const Logo = () => {
    return (
      <div className='w-[6rem] h-8 flex gap-2'>
        <img src={logo} alt='Logo Image' className='w-1/2 h-full' />
        <span className="text-shadow-md text-shadow-white text-[#08252B] text-2xl font-[]" >ticz</span>
      </div>
    );
  };
  export default Logo;
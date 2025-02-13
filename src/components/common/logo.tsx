import Image from "next/image";
import logoImage  from "../../../public/images/tickLogo.png";
const Logo = () => {
    return (
      <div className='w-[5rem] h-7 flex'>
        <Image src={logoImage} alt='Logo Image' className='w-1/2 h-full' />
        <span className="text-shadow-md text-shadow-white text-[#08252B] text-2xl font-[]" >ticz</span>
      </div>
    );
  };
  export default Logo;
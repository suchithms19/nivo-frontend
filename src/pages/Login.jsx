import { Auth } from "../components/Auth";
import imagelogin from "/src/assets/doctor_point.png";

export function Login(){
    return (
        <div className="h-screen w-screen grid grid-cols-3">
            <div className="col-span-1"><Auth/></div>
            <div className="col-span-2 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <img className="w-7/12 " src={imagelogin} alt="A happy doctor sitting on a tablet" />
                </div>
            </div>
        </div>
    );
}

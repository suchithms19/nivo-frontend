import TimeDifference from "./TimeDifference";

const AllPatientRow = ({ patient }) => {
  return (
    <div className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer transform hover:-translate-y-0.5 ">
      <div className="flex items-center justify-between ">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 capitalize">
            {patient.name} {patient.selfRegistered && <span className="text-xs text-cuspurple bg-purple-50 px-2 py-0.5 rounded-full">
                  Self-Reg
                </span>}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm">+91 {patient.phoneNumber}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm">{patient.age}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm"><TimestampFormatter isoTimestamp={patient.entryTime} /></div>
        </div>
        <div className="flex-1 min-w-0 ">
          <div className="text-sm ">
            {patient.canceled ? (
              <span className="text-red-500">Canceled {patient.selfCanceled && <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full font-medium">Self-Can</span>} </span>
            ) : (
              <TimeDifference entryTime={patient.entryTime} exitTime={patient.postConsultation}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const formatDate = ({isoTimestamp}) => {
  const date = new Date(isoTimestamp);
  const options = { month: 'short', day: 'numeric' }; 
  const datePart = date.toLocaleDateString('en-US', options);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; 
  const formattedMinutes = minutes.toString().padStart(2, '0'); 
  const timePart = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return { datePart, timePart };
};

const TimestampFormatter = ({ isoTimestamp }) => {
  const date = new Date(isoTimestamp);
  return `${date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
};


export default AllPatientRow;


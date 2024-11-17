import AllPatientRow from './AllPatientsRow';
import { getAllPatient } from '../hooks';

const AllPatientList = () => {
  const { dataall, loadingall, errorall } =getAllPatient();

  return (
    <div className="bg-gray-50 min-h-screen h-max">
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Customer List</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    {dataall.length} persons
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="my-3 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500">NAME</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500">PHONE NUMBER</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500">AGE</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500">ENTRY TIME</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500">TOTAL TIME WAITED</div>
                </div>
              </div>
            </div>
            <div className="patient-list">
              {loadingall ? (
                <PatientListSkeleton count={5} /> 
              ) : (
                dataall.map((item) => (
                  <AllPatientRow key={item._id} patient={item.patient} section="waitlist" />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatientList; 
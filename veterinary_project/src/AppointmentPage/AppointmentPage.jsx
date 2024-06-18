import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { Spinner } from "../../components/Spinner";

import appointmentModel from "../../api/appointments"; 
export const AppointmentPage = () => {
  let { id: appointment_id } = useParams();
  appointment_id = parseInt(appointment_id, 10);
  if (isNaN(appointment_id)) {
    appointment_id = 0;
  }

  const [appointment, setAppointment] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await appointmentModel.getAppointmentById(appointment_id);
        if (response.status !== 200) {
          setIsNotFound(true);
        } else {
          setAppointment(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
        setIsNotFound(true);
      }
    };

    fetchAppointment();
  }, [appointment_id]);

  const handleDetailsClick = () => {
    setActiveTab('details');
  };

  const handleEditClick = () => {
    setActiveTab('edit');
  };

  return (
    <div className="appointment-page">
      <div className="grid-container">
        <div className="grid-login-info-style">
          <div className="grid-item-grid-login-information">
            <h3>Appointment ID: {appointment_id}</h3>
            {isNotFound ? (
              <div>Appointment not found</div>
            ) : (
              <div>
                <div>Details: {appointment.details}</div>
                <div>Date: {appointment.date}</div>
                <div>Status: {appointment.status}</div>
              </div>
            )}
          </div>
        </div>
        <div className="grid-item-grid-side-navigation">
          <div className="grid-item-side-navigation-style">
            <Link to={`/appointments/${appointment_id}`} onClick={handleDetailsClick} className={activeTab === 'details' ? "active-link" : "passive-link"}>Details</Link>
            <Link to={`/appointments/${appointment_id}/edit`} onClick={handleEditClick} className={activeTab === 'edit' ? "active-link" : "passive-link"}>Edit</Link>
          </div>
        </div>
        <div className="grid-item-grid-main">
          {isNotFound ? (
            <div>Appointment not found</div>
          ) : (
            activeTab === 'details' ? (
              <div>
                <h4>Appointment Details</h4>
                <p>{appointment.details}</p>
              </div>
            ) : (
              <div>
                <h4>Edit Appointment</h4>
                {/* Placeholder for edit form */}
                <p>Edit form will go here</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// import { useContext, useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { AuthContext } from "../utils/AuthContext";
// import { Spinner } from "../../components/Spinner";
// // Import the correct model for fetching appointment data
// import appointmentModel from "../../api/appointments"; // Ensure this path is correct

// export const AppointmentPage = () => {
//   let { id: appointment_id } = useParams();
//   // Ensure the id is a number
//   appointment_id = parseInt(appointment_id, 10);
//   if (isNaN(appointment_id)) {
//     appointment_id = 0;
//   }

//   const [appointment, setAppointment] = useState({});
//   const [isNotFound, setIsNotFound] = useState(false);
//   const [activeTab, setActiveTab] = useState('details'); // Default to 'details' tab

//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     (async () => {
//       const appointment_response = await appointmentModel.getAppointmentById(appointment_id);
//       if (appointment_response.status !== 200) {
//         setIsNotFound(true);
//         return () => {};
//       }

//       setAppointment(appointment_response.data);
//     })();
//   }, [appointment_id]); // Corrected dependency array

//   const handleDetailsClick = () => {
//     setActiveTab('details');
//   };

//   const handleEditClick = () => {
//     setActiveTab('edit');
//   };

//   return (
//     <div className="appointment-page">
//       <div className="grid-container">
//         <div className="grid-login-info-style">
//           <div className="grid-item-grid-login-information">
//             <h3>Appointment ID: {appointment_id}</h3>
//             {isNotFound ? (
//               <div>Appointment not found</div>
//             ) : (
//               <div>
//                 <div>Details: {appointment.details}</div>
//                 <div>Date: {appointment.date}</div>
//                 <div>Status: {appointment.status}</div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="grid-item-grid-side-navigation">
//           <div className="grid-item-side-navigation-style">
//             {activeTab === 'details' ? (
//               <Link to={`/appointments/${appointment_id}`} onClick={handleDetailsClick} className="active-link">Details</Link>
//             ) : (
//               <Link to={`/appointments/${appointment_id}`} onClick={handleDetailsClick} className="passive-link">Details</Link>
//             )}
//             {activeTab === 'edit' ? (
//               <Link to={`/appointments/${appointment_id}/edit`} onClick={handleEditClick} className="active-link">Edit</Link>
//             ) : (
//               <Link to={`/appointments/${appointment_id}/edit`} onClick={handleEditClick} className="passive-link">Edit</Link>
//             )}
//           </div>
//         </div>
//         <div className="grid-item-grid-main">
//           {isNotFound ? (
//             <div>Appointment not found</div>
//           ) : (
//             activeTab === 'details' ? (
//               <div>
//                 <h4>Appointment Details</h4>
//                 <p>{appointment.details}</p>
//               </div>
//             ) : (
//               <div>
//                 <h4>Edit Appointment</h4>
//                 {/* Placeholder for edit form */}
//                 <p>Edit form will go here</p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
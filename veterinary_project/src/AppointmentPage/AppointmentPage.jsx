import { useContext, useState } from "react";
import appointmentModel from "../../../server/models/appointmentModel.mjs";

export const AppointmentPage = () => {
  let { id: appointment_id } = useParams();
  if (isNaN(appointment_id)) {
    appointment_id = 0;
  }

  const [appointment, setAppointment] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [activetab, setActiveTab] = useState('task');

  const {user} = useContext(AuthConte)
};

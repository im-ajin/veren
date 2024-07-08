import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DateDifferenter from "../components/DateDifferenter";

const Vehicle = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rentDays, setRentDays] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rentData, setRentData] = useState({});
  const [timeDifference, setTimeDifference] = useState(null);



  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setRentData({ ...rentData, [name]: value });
  }

  useEffect(() => {
    const difference = calculateTimeDifference(rentData.startTime, rentData.endTime);
    setTimeDifference(difference);
    setRentData({ ...rentData, timeDiff: difference });
}, [rentData.startTime,rentData.endTime]);

  const calculateTimeDifference = (start, end) => {
    if (start && end) {
        

        var splitted1 = start.split(":");
        var splitted2 = end.split(":");
        var time1 = parseInt(splitted1[0]) * 60 + parseInt(splitted1[1]);
        var time2 = parseInt(splitted2[0]) * 60 + parseInt(splitted2[1]);

        var diff;
        if (time1 < time2) {
            diff = time2 - time1;
        } else {
            diff = (24 * 60 - time1) + time2;
        }
        return diff;
    } else {
        return null;
    }
};

  
  
  
  

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/vehicle/getVehicle/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setVehicle(data);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);
  return (
    <>
      {vehicle && (
        <div className="flex flex-col mt-5">
          {/* top side */}
          <div className="h-[500px] w-[450px] mx-auto p-4">
            <img
              src={vehicle.vehicle.vehiclePicture}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* bottom side */}
          <div className="w-[450px] mx-auto py-5 rounded-lg">
            <div className="flex flex-col gap-2">
              <h5 className="text-3xl font-bold bsdblue text-center">
                {vehicle.vehicle.vehicleName}
              </h5>
              <div className="flex justify-between px-4">
                <h5 className="text-xl">
                  Type : <span>{vehicle.vehicle.vehicleType}</span>
                </h5>

                <h5 className="text-xl">
                  Model : <span>{vehicle.vehicle.vehicleModel}</span>
                </h5>
              </div>

              <div className="flex justify-between px-4">
                <h5 className="text-xl">
                  Power : <span>{vehicle.vehicle.vehiclePower}</span>
                </h5>
                

                <h5 className="text-xl">
                  Torque : <span>{vehicle.vehicle.vehicleTorque}</span>
                </h5>
              </div>

              <div className="flex justify-between px-4">
                <h5 className="text-xl">
                  Number : <span>{vehicle.vehicle.vehicleNumber}</span>
                </h5>

                <h5 className="text-xl">
                  Total Seats : <span>{vehicle.vehicle.vehicleSeats}</span>
                </h5>
              </div>
              <div className="flex justify-between px-4">
                <h5 className="text-xl">RPPM : <span>{vehicle.vehicle.vehicleRrpm}</span></h5>
                <h5 className="text-xl">
                  CC : <span>{vehicle.vehicle.vehicleCc}</span>
                </h5>
              </div>
            </div>
            <Button
              className="w-full mt-2 bg-bsblue"
              outline
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Book a {vehicle ? vehicle.vehicle.vehicleName : "vehcile"}
            </Button>
          </div>
         
          {showModal && (
            <div className="w-[450px] mx-auto py-5 rounded-lg px-3">
            <DateDifferenter vehicleRrpm={vehicle.vehicle.vehicleRrpm} vehicleId={id}/>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Vehicle;

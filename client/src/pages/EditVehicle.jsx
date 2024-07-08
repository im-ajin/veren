import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { useParams } from "react-router-dom";

const EditVehicle = () => {

  const [formData, setFormData] = useState({});
  const [uploadError, setUploadError] = useState(null)
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  const {id} = useParams();

 

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };

  useEffect(()=>{
    async function fetchVehicle(){
        try{
            const res = await fetch(`/api/vehicle/getVehicle/${id}`)
            const data = await res.json();
            setFormData(data.vehicle);
        }catch(error){
            console.log(error.message);
        }
    }
    fetchVehicle();
  },[id])
 

  const handleFileUpload = async () => {
    if(!image){
      enqueueSnackbar('Please choose the image',{ variant : 'error'})
      return
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error.message)
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, vehiclePicture: downloadURL })
        );
      }
    );
  };
  
async function handleSubmit(e){
     e.preventDefault();
     if(!formData.vehiclePicture){
        enqueueSnackbar('Please upload the image',{ variant : 'error'})
        return
     }
     if(isNaN(formData.vehicleModel)){
      enqueueSnackbar('Please upload the correct model',{ variant : 'error'});
      return;
     }
     try{
        const res = await fetch(`/api/vehicle/updateVehicle/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(!res.ok){
          setUploadError('error occured');
          enqueueSnackbar('Something wrong',{ variant : 'error'})
          return
        }
       
        if(res.ok){
          setUploadError(null)
          setFormData(formData)
          enqueueSnackbar('Vehicle Updated Successfully',{ variant : 'success'})
        }
  
      }catch(error){
        setUploadError('Something went wrong')    
      }
     
  }

  return (
    <>
    {formData ? (
    <div className="p-3 max-w-[600px] mx-auto mb-80">
      <h1 className="text-xl my-4">Edit Vehicle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex justify-between">
          <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-xl"/>
          <Button onClick={handleFileUpload} type="button">Upload</Button>
        </div>
        {formData.vehiclePicture && (
            <div className="my-2">
              <img
                src={formData.vehiclePicture}
                alt="Uploaded"
                style={{ width: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
          {imageUploadProgress && imageUploadProgress < 100 &&
          <p>Uploading <span>{imageUploadProgress} %</span></p>
          }
          {
            imageUploadProgress && imageUploadProgress === 100 &&
            <p className="text-green-400">Image uploaded Successfully</p>
          }
        <div className="flex flex-col gap-3">
          <TextInput
            type="text"
            value={formData.vehicleType}
            placeholder="Vehicle Type"
            required
            id="vehicleType"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleType: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehicleName}
            placeholder="Vehicle Name"
            required
            id="vehicleName"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleName: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehicleNumber}
            placeholder="Vehicle Number"
            required
            id="vehicleNumber"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleNumber: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehicleModel}
            placeholder="Vehicle Model"
            required
            id="vehicleModel"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleModel: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehiclePower}
            placeholder="Vehicle Power"
            required
            id="vehiclePower"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehiclePower: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehicleTorque}
            placeholder="Vehicle Torque"
            required
            id="vehicleTorque"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleTorque: e.target.value });
            }}
          />
          <TextInput
            type="text"
            value={formData.vehicleCc}
            placeholder="Vehicle CC"
            required
            id="vehicleCC"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleCc: e.target.value });
            }}
          />
          <TextInput
            type="Number"
            value={formData.vehicleSeats}
            placeholder="Vehicle Seats"
            required
            id="vehicleSeats"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleSeats: e.target.value });
            }}
          />
          <TextInput
            type="Number"
            value={formData.vehicleRrpm}
            placeholder="Vehicle Rrpm"
            required
            id="vehicleRrpm"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, vehicleRrpm: e.target.value });
            }}
          />
          <Button type='submit' outline>Update</Button>
        </div>
      </form>
    </div>
    ) : (
        null
    )}
    </>
  );
};

export default EditVehicle;

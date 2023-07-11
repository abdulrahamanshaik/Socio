import { useState, useRef } from "react";
import "./index.css";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import CircularProgress from "@mui/material/CircularProgress";

const UploadComponent = ({ closeModel, desc }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [cleared, setCleared] = useState(false);

  const [isUploading, setIsuploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setCleared(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewURL("");
    setCleared(true);
  };

  //   const handleUpload = () => {
  //     const fileRef = ref(storage,`postMedia/+${selectedFile.name + '_' +v4()}`);
  //     uploadBytes(fileRef, selectedFile).then((response) => {
  //         console.log(response);
  //         alert('Upload successful');
  //     });
  //     // console.log(selectedFile)
  //   };

  const handleUpload = () => {
    setIsuploading(true);
    const collectionRef = collection(db, "Posts");

    const fileRef = ref(storage, `postMedia/${selectedFile.name}_${uuidv4()}`);
    uploadBytes(fileRef, selectedFile)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            const userName = JSON.parse(localStorage.getItem("user"));
            const currentDate = new Date();
            const options = {
              weekday: "long", // Full weekday name (e.g., Monday)
              year: "numeric", // 4-digit year
              month: "long", // Full month name (e.g., January)
              day: "numeric", // Day of the month (e.g., 1, 2, 3)
              hour: "numeric", // Hour in 24-hour format (e.g., 13, 14, 15)
              minute: "numeric", // Minute (e.g., 30, 45)
            };
            const formattedDate = currentDate.toLocaleString("en-US", options);
            addDoc(collectionRef, {
              type: selectedFile.type,
              url: url,
              desc: desc,
              date: formattedDate,
              userName: userName.displayName,
              userPic: userName.photoURL,
              likes: 0,
              comments: 0,
            }).then((res) => {
              closeModel();
              // alert("Upload successful");
              setIsuploading(false);
            });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <div className="custom-button" onClick={handleButtonClick}>
        {selectedFile ? "Change File" : "Choose File"}
      </div>

      {selectedFile && !cleared && (
        <div className="preview-container">
          {selectedFile.type && selectedFile.type.startsWith("image/") ? (
            <img src={previewURL} alt="Preview" className="preview-image" />
          ) : (
            <video src={previewURL} className="preview-video" controls />
          )}
        </div>
      )}

      {selectedFile && !cleared && (
        // <button onClick={handleClearFile}>Clear File</button>
        <div>
          <div className="custom-button" onClick={handleClearFile}>
            Clear File
          </div>
          <div className="custom-button" onClick={handleUpload}>
            {isUploading ? <CircularProgress /> : "Upload"}
          </div>
        </div>
      )}

      {/* {selectedFile && !cleared && (
        <button onClick={handleUpload}>Upload</button>
      )} */}
    </div>
  );
};

export default UploadComponent;

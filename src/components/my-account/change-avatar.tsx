import React, { useState } from 'react';
import Image from '@/components/common/image';
// import ImageUploading, { ImageListType } from 'react-images-uploading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Button, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import { useFormik, useFormikContext } from 'formik';
// import { toast } from 'react-toastify';
// import { uploadFile } from '@/services/upload';

// type Props = {
//   multiple?: boolean;
// };

type ChangeAvatar = {
  avatarList: string[];
};

const ChangeAvatar = () => {
  // const [uploadRes, setUploadRes] = useState<string>('');
  const [image, setImage] = useState<string>('');
  // const [createObjectURL, setCreateObjectURL] = useState(null);
  // const onClose = () => {
  //   setPview(null);
  // };

  // const onCrop = (view: any) => {
  //   setPview(view);
  // };

  // const saveCropImage = () => {
  //   setProfile([...profile, { pview }]);
  //   setImagecrop(false);
  // };
  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      // setCreateObjectURL(URL.createObjectURL(i)); 
    }
  };

  // useEffect(()=> {

  // })
  const handleChangeAvatar = async () => {
    console.log('images[0]');
  };
  return (
    <>
      <div className="flex gap-4">
        <div className="relative">
          <div className="relative w-52 h-52 border border-teal-600 rounded-xl border-dashed">
            {image && (<Image
              src={image}
              alt="product-image"
              width="300" height="500"
              className="object-cover rounded-xl"
            />)}
          </div>
          <div className="absolute top-1 right-2 z-10 flex gap-2">
            <Tooltip title="Change image">
              <IconButton
                className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                onClick={() => setImage('')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete image">
              <IconButton
                className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                onClick={() => setImage('')}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChange}
          id="contained-button-file"
        />
        <label htmlFor="contained-button-file">
          <Button
            component="span"
            className={`${'bg-teal-200'} w-full h-36 border border-teal-600 border-dashed rounded-xl flex flex-col items-center text-teal-600 normal-case hover:bg-teal-100`}
            // onClick={onImageUpload}
          >
            <FileUploadIcon />
            <span>Click or drop here to upload</span>
          </Button>
        </label>
      </div>
      <Button
        onClick={handleChangeAvatar}
        className="mt-8 bg-teal-600 text-white hover:bg-teal-700 mx-auto">
        Save avatar
      </Button>
    </>
  );
};

export default ChangeAvatar;

import React, { useEffect, useState } from 'react';
import Image from '@/components/common/image';
// import ImageUploading, { ImageListType } from 'react-images-uploading';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Button, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import * as _ from 'lodash';
import { useUpdateInfoMutation } from '@/services/user';
// import { useFormik, useFormikContext } from 'formik';
// import { toast } from 'react-toastify';
import { uploadFile } from '@/services/upload';
import { toast } from 'react-toastify';

// type Props = {
//   multiple?: boolean;
// };

type ChangeAvatar = {
  avatarList: string[];
};

const ChangeAvatar = () => {
  // const [uploadRes, setUploadRes] = useState<string>('');
  const [image, setImage] = useState<any>();
  const [updateInfo, updateInfoRes] = useUpdateInfoMutation();
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
    console.log(event.target.files);
    const file = event.target.files;
    if (!file) return;
    setImage(file);
  };

  // useEffect(()=> {

  // })
  const handleChangeAvatar = async () => {
    const uploadRes = await uploadFile(image[0]);
    if (uploadRes && uploadRes.secure_url) {
      updateInfo({ body: { avatar: uploadRes.secure_url } });
    }
  };

  useEffect(()=>{
    if(updateInfoRes.isSuccess && !updateInfoRes.isError){
      toast.success('Update avatar successfully');
    }
  }, [updateInfoRes])
  return (
    <>
      <div className="flex gap-4">
        {image && (
          <div className="relative">
            <div className="relative w-52 h-52 border border-teal-600 rounded-xl border-dashed">
              <Image
                src={URL.createObjectURL(image[0])}
                alt="product-image"
                // width={100}
                // height={100}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div className="absolute top-1 right-2 z-10 flex gap-2">
              {/* <Tooltip title="Change image">
                <IconButton
                  className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                  onClick={() => setImage('')}>
                  <EditIcon />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Delete image">
                <IconButton
                  className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                  onClick={() => setImage('')}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
        {!image && (
          <>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleChange}
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file" className="w-full">
              <Button
                component="span"
                className={`${'bg-teal-200'} w-full h-36 border border-teal-600 border-dashed rounded-xl flex flex-col items-center text-teal-600 normal-case hover:bg-teal-100`}
                // onClick={onImageUpload}
              >
                <FileUploadIcon />
                <span>Click or drop here to upload</span>
                <span className="font-normal">
                  (Only JPG, JPEG, PNG files with max size of 10MB)
                </span>
              </Button>
            </label>
          </>
        )}
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

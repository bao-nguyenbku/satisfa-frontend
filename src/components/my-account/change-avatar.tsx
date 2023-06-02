import React, { useState } from 'react';
import Image from '@/components/common/image';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Button, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import { uploadFile } from '@/services/upload';

type Props = {
  multiple?: boolean;
};

type ChangeAvatar = {
    avatarList: string[];
}

const ChangeAvatar = (props: Props) => {
  const { multiple = false } = props;
  const formik = useFormikContext<ChangeAvatar>();
  const [images, setImages] = useState<ImageListType>(
    formik?.values.avatarList.map((item) => ({ dataURL: item })) || []
  );
  const maxNumber = 69;
  const onChange = (
    imageList: ImageListType,
    // addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList);
    for (const item of imageList) {
      if (item.file && item.file?.size >= 10485760) {
        toast.error(
          <span>
            File size of <strong>{item.file?.name}</strong> is larger than 10MB.
            You must upload file smaller than 10MB
          </span>
        );
        return;
      }
    }
    const urlImage = imageList.map((item) => {
      item.dataURL = URL.createObjectURL(item.file as File);
      return item;
    });
    console.log(urlImage);
    formik?.setFieldValue('avatarList', urlImage);
    setImages(urlImage as never[]);
  };

  const handleChangeAvatar = async () =>{
    console.log(images);
    if (images[0].file){
      const uploadRes = await uploadFile(images[0].file);
      console.log(uploadRes);
    }
  }
  return (
    <>
    <ImageUploading
      multiple={multiple}
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}>
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="flex gap-4">
          {imageList.map((image, index) => {
            console.log(
              '🚀 ~ file: index.tsx:85 ~ {imageList.map ~ image:',
              image,
            );
            return (
              <div key={index} className="relative">
                <div className="relative w-52 h-52 border border-teal-600 rounded-xl border-dashed">
                  <Image
                    src={image.dataURL as any}
                    alt="product-image"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="absolute top-1 right-2 z-10 flex gap-2">
                  <Tooltip title="Change image">
                    <IconButton
                      className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                      onClick={() => onImageUpdate(index)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete image">
                    <IconButton
                      className="text-white bg-gray-600/40 hover:bg-gray-600/50"
                      onClick={() => onImageRemove(index)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            );
          })}
          {!multiple && imageList.length === 0 && (
            <Button
              className={`${
                isDragging ? 'bg-teal-200' : 'bg-teal-50'
              } w-full h-36 border border-teal-600 border-dashed rounded-xl flex flex-col items-center text-teal-600 normal-case hover:bg-teal-100`}
              onClick={onImageUpload}
              {...dragProps}>
              <FileUploadIcon />
              <span>Click or drop here to upload</span>
            </Button>
          )}
        </div>
      )}
    </ImageUploading>
    <Button onClick={handleChangeAvatar} className='mt-8 bg-teal-600 text-white hover:bg-teal-700 mx-auto'>
        Save avatar
    </Button>
    </>
    
  );
};

export default ChangeAvatar;
